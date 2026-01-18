const t = require('utest@latest');
const v = require('validate@latest');

t.test('requireKeys', () => {
  t.expect(v.requireKeys({ a: 1 }, ['a']).ok).toBe(true);
  t.expect(v.requireKeys({ a: 1 }, ['b']).ok).toBe(false);
});

t.test('isEmail', () => {
  t.expect(v.isEmail('a@b.com')).toBe(true);
  t.expect(v.isEmail('bad@host')).toBe(false);
});

t.test('isISODate', () => {
  t.expect(v.isISODate('2024-01-02')).toBe(true);
  t.expect(v.isISODate('2024-13-40')).toBe(false);
});

t.test('isCurrency', () => {
  t.expect(v.isCurrency('123')).toBe(true);
  t.expect(v.isCurrency('123.45')).toBe(true);
  t.expect(v.isCurrency('123,45')).toBe(true);
  t.expect(v.isCurrency('12.345')).toBe(false);
});

t.test('isIban', () => {
  t.expect(v.isIban('PL61109010140000071219812874')).toBe(true);
  t.expect(v.isIban('PL00INVALID0000')).toBe(false);
});

module.exports = { run: async (opts) => { await t.run(Object.assign({ quiet: true }, opts)); t.reset(); } };
