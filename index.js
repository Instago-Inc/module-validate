// Lightweight validators and required keys helper
// API:
// - requireKeys(obj, keys[]) -> { ok, error? }
// - isEmail(str) -> boolean
// - isISODate(str) -> boolean (YYYY-MM-DD and valid date)
// - isCurrency(str) -> boolean (e.g., 123 or 123.45 or 123,45)
// - isIban(str) -> boolean (IBAN mod-97 check)

(function(){
  function requireKeys(obj, keys){
    if (!obj || typeof obj !== 'object') return { ok:false, error:'requireKeys: obj must be an object' };
    if (!Array.isArray(keys) || !keys.length) return { ok:false, error:'requireKeys: keys[] required' };
    for (const k of keys){ if (!(k in obj)) return { ok:false, error:'missing key: ' + k }; }
    return { ok:true };
  }

  function isEmail(s){
    s = '' + (s || '');
    // Simple pragmatic regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
  }

  function isISODate(s){
    s = '' + (s || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    const d = new Date(s + 'T00:00:00Z');
    if (isNaN(d.getTime())) return false;
    // Normalize back to ensure parts match (e.g., invalid 2025-02-30 rejected)
    const [Y,M,D] = s.split('-');
    return d.getUTCFullYear()===+Y && (d.getUTCMonth()+1)===+M && d.getUTCDate()===+D;
  }

  function isCurrency(s){
    s = ('' + (s || '')).trim();
    return /^-?\d+(?:[\.,]\d{1,2})?$/.test(s);
  }

  function isIban(s){
    s = ('' + (s || '')).toUpperCase().replace(/\s+/g,'');
    if (s.length < 15 || s.length > 34) return false;
    // Move first 4 chars to end
    const re = s.slice(4) + s.slice(0,4);
    // Replace letters with numbers A=10..Z=35 and compute mod 97 iteratively
    let remainder = 0;
    for (let i=0;i<re.length;i++){
      const ch = re.charCodeAt(i);
      let val;
      if (ch>=48 && ch<=57) val = ch - 48; // 0-9
      else if (ch>=65 && ch<=90) val = ch - 55; // A=10
      else return false;
      // Append digit(s) to remainder in base 10 and mod 97 stepwise
      if (val >= 10){
        remainder = (remainder * 100 + val) % 97;
      } else {
        remainder = (remainder * 10 + val) % 97;
      }
    }
    return remainder === 1;
  }

  module.exports = { requireKeys, isEmail, isISODate, isCurrency, isIban };
})();

