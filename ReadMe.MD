# @instago/validate

Small set of validators for common data checks.

- Version: 1.0.0
- Entry: index.js
- Exports: `{ requireKeys, isEmail, isISODate, isCurrency, isIban }`
- Dependencies: none

## Example
```js
const v = require('validate@1.0.0');

v.requireKeys({ a: 1 }, ['a']);        // { ok: true }
v.isEmail('user@example.com');         // true
v.isISODate('2025-01-31');             // true
```
