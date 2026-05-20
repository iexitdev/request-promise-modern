# Adoption Plan

Post-publish discovery plan for `request-promise-modern`.

This package is an independent alternative or migration helper for `request-promise`; do not imply affiliation with the original project.

## First Search

[Search GitHub package.json dependencies for request-promise](https://github.com/search?q=%22request-promise%22%20path%3Apackage.json&type=code)

## Useful Proof Point

Promise-first fetch-backed request helper with common response shaping.

## Pull Request Copy

```md
This removes `request-promise`, which is deprecated, unsupported, or on a stale release line, and replaces the affected call site with `request-promise-modern`.

`request-promise-modern` is an independent TypeScript migration package with zero runtime dependencies. It is not affiliated with the original project.

Validation:
- [ ] npm install
- [ ] npm test
```
