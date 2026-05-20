# Migration Guide

`request-promise-modern` is an independent alternative or migration helper for projects moving away from `request-promise`. It is not affiliated with the original package maintainers or project.

## First Command

```sh
npm install request-promise-modern
```

## Migration Target

- Source package: `request-promise`
- Replacement package: `request-promise-modern`
- Source signal: npm deprecation notice follows the deprecated request package
- Migration direction: Promise-first fetch-backed request helper with common response shaping.

## Compatibility Posture

- Preserved: Promise-returning request calls, `get`, `post`, text/json helpers, and `resolveWithFullResponse` behavior.
- Improved: Native fetch backing, typed full-response shape, and no dependency on deprecated `request`.
- Intentional difference: It focuses on promise migrations and does not recreate the full Bluebird/request-promise extension surface.

## Review Checklist

- Replace the old dependency at one migration boundary first.
- Run the package or application test suite after the swap.
- Keep attribution accurate: this package is independent and is not an official successor to `request-promise`.
