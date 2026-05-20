# Compatibility Notes

`request-promise-modern` is an independent migration package for projects leaving `request-promise`; it is not affiliated with the original package maintainers or project.

| Area | Notes |
| --- | --- |
| Preserved migration surface | Promise-returning request calls, `get`, `post`, text/json helpers, and `resolveWithFullResponse` behavior. |
| Improvements | Native fetch backing, typed full-response shape, and no dependency on deprecated `request`. |
| Intentional difference | It focuses on promise migrations and does not recreate the full Bluebird/request-promise extension surface. |
