# Examples

`request-promise-modern` is an independent package. It is not affiliated with `request-promise` or its maintainers.

## `request-promise` to `request-promise-modern`

```ts
import requestPromise, { json } from "request-promise-modern";

const text = await requestPromise("https://example.com");
const data = await json<{ ok: boolean }>("https://example.com/data.json");
```
