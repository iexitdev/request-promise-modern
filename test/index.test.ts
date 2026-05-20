import { afterEach, describe, expect, it, vi } from "vitest";
import rp from "../src/index.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("request-promise-modern", () => {
  it("returns response body text by default", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("ok", { status: 200 })));

    await expect(rp("https://example.com")).resolves.toBe("ok");
  });

  it("supports json helpers", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response('{"ok":true}', { status: 200 })));

    await expect(rp.json("https://example.com")).resolves.toEqual({ ok: true });
  });

  it("supports resolveWithFullResponse", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("body", { status: 202 })));

    await expect(rp({ uri: "https://example.com", resolveWithFullResponse: true })).resolves.toMatchObject({
      statusCode: 202,
      body: "body"
    });
  });

  it("supports post with json bodies and query strings", async () => {
    const fetchMock = vi.fn(async () => new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await rp.post({ uri: "https://example.com/api", qs: { q: "x" }, json: { ok: true } });

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://example.com/api?q=x");
    expect(init.method).toBe("POST");
    expect(init.body).toBe('{"ok":true}');
  });
});
