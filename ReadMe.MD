# module/validate - V8 module

Validate input data quickly and consistently before it moves deeper into your workflow. This module keeps checks simple and predictable so you can catch common issues early without cluttering your step code.

It is designed to fit neatly into the hgi-v8 module ecosystem. Learn more at https://instago.ai.

## Technical reference

### Exports
- `requireKeys(obj, keys)` -> `{ ok, error? }`
- `isEmail(str)` -> `boolean`
- `isISODate(str)` -> `boolean` (YYYY-MM-DD, valid date)
- `isCurrency(str)` -> `boolean` (e.g., `123`, `123.45`, `123,45`)
- `isIban(str)` -> `boolean` (IBAN mod-97 check)

### Usage
```js
const validate = require('validate@latest');

const required = validate.requireKeys({ a: 1 }, ['a']);
const isEmail = validate.isEmail('user@example.com');
```

### Configuration
No configuration or env keys are required.

### Examples
```js
const validate = require('validate@latest');

validate.requireKeys({ a: 1 }, ['a']); // { ok: true }
validate.isEmail('user@example.com');  // true
validate.isISODate('2025-01-31');      // true
validate.isCurrency('12.50');          // true
validate.isIban('DE44500105175407324931'); // true
```
