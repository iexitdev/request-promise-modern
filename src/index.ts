export interface RequestPromiseOptions {
  uri?: string;
  url?: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | Record<string, unknown>;
  json?: boolean | Record<string, unknown>;
  qs?: Record<string, string | number | boolean | null | undefined>;
  resolveWithFullResponse?: boolean;
}

export type RequestPromiseInput = string | URL | RequestPromiseOptions;

export interface FullResponse<T = string> {
  statusCode: number;
  headers: Headers;
  body: T;
  response: Response;
}

export interface RequestPromiseClient {
  <T = string>(input: RequestPromiseInput): Promise<T | FullResponse<T>>;
  get<T = string>(input: RequestPromiseInput): Promise<T | FullResponse<T>>;
  post<T = string>(input: RequestPromiseInput): Promise<T | FullResponse<T>>;
  text(input: RequestPromiseInput): Promise<string>;
  json<T = unknown>(input: RequestPromiseInput): Promise<T>;
}

export async function requestPromise<T = string>(
  input: RequestPromiseInput
): Promise<T | FullResponse<T>> {
  const { url, init, wantsJson, full } = toFetch(input);
  const response = await fetch(url, init);
  const body = (wantsJson ? await response.json() : await response.text()) as T;

  if (full) {
    return {
      statusCode: response.status,
      headers: response.headers,
      body,
      response
    };
  }

  return body;
}

export function get<T = string>(input: RequestPromiseInput): Promise<T | FullResponse<T>> {
  return requestPromise<T>(withMethod(input, "GET"));
}

export function post<T = string>(input: RequestPromiseInput): Promise<T | FullResponse<T>> {
  return requestPromise<T>(withMethod(input, "POST"));
}

export async function text(input: RequestPromiseInput): Promise<string> {
  return requestPromise<string>({ ...toOptions(input), json: false, resolveWithFullResponse: false }) as Promise<string>;
}

export async function json<T = unknown>(input: RequestPromiseInput): Promise<T> {
  return requestPromise<T>({ ...toOptions(input), json: true, resolveWithFullResponse: false }) as Promise<T>;
}

function toFetch(input: RequestPromiseInput): {
  url: string;
  init: RequestInit;
  wantsJson: boolean;
  full: boolean;
} {
  const options = toOptions(input);
  const url = options.url ?? options.uri;

  if (!url) {
    throw new TypeError("request-promise url or uri is required");
  }

  const headers = new Headers(options.headers);
  let body = options.body;

  if (options.json && typeof options.json === "object") {
    body = JSON.stringify(options.json);
    headers.set("content-type", headers.get("content-type") ?? "application/json");
  } else if (options.json === true && body && typeof body === "object" && !(body instanceof ArrayBuffer)) {
    body = JSON.stringify(body);
    headers.set("content-type", headers.get("content-type") ?? "application/json");
  }

  const init: RequestInit = { headers };

  if (options.method !== undefined) {
    init.method = options.method;
  }

  if (body !== undefined) {
    init.body = body as BodyInit;
  }

  return {
    url: applyQuery(url, options.qs),
    init,
    wantsJson: options.json === true,
    full: options.resolveWithFullResponse === true
  };
}

function toOptions(input: RequestPromiseInput): RequestPromiseOptions {
  if (typeof input === "string" || input instanceof URL) {
    return { uri: String(input) };
  }

  return input;
}

function applyQuery(url: string, query?: RequestPromiseOptions["qs"]): string {
  if (!query) {
    return url;
  }

  const parsed = new URL(url);

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) {
      parsed.searchParams.set(key, String(value));
    }
  }

  return parsed.href;
}

function withMethod(input: RequestPromiseInput, method: string): RequestPromiseInput {
  return { ...toOptions(input), method: toOptions(input).method ?? method };
}

const client = requestPromise as RequestPromiseClient;
client.get = get;
client.post = post;
client.text = text;
client.json = json;

export default client;
