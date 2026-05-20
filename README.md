# request-promise-modern

Promise-first migration helper for `request-promise`.

`request-promise` is deprecated because it depends on deprecated `request`. This package wraps native `fetch` with familiar promise-returning helpers and `resolveWithFullResponse` behavior.

## Install

```sh
npm install request-promise-modern
```

## Usage

```ts
import rp from "request-promise-modern";

const body = await rp("https://example.com");
const data = await rp.json("https://api.example.com/data");
const response = await rp({ uri: "https://example.com", resolveWithFullResponse: true });
```

## API

- `requestPromise(optionsOrUrl)`
- `requestPromise.get(optionsOrUrl)`
- `requestPromise.post(optionsOrUrl)`
- `requestPromise.text(optionsOrUrl)`
- `requestPromise.json(optionsOrUrl)`

## Migration Position

`request-promise-modern` is an independent alternative or migration helper for projects moving away from `request-promise`. It is not affiliated with the original package maintainers or project.

For release context, see the local [migration guide](./MIGRATION.md), [examples](./EXAMPLES.md), [compatibility notes](./COMPATIBILITY.md), [source metadata](./SOURCE_METADATA.md), and [adoption plan](./ADOPTION.md).

