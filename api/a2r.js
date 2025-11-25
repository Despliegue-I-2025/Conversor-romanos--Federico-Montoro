// api/a2r.js

function toRoman(num) {
  const romanMap = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];

  let result = '';
  for (const [value, numeral] of romanMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

module.exports = (req, res) => {
  // 🔓 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // El evaluador manda ?arabic=123
  const arabicParam = req.query.arabic;
  const value = parseInt(arabicParam, 10);

  if (!arabicParam || Number.isNaN(value) || value <= 0 || value > 3999) {
    return res.status(400).json({ error: 'invalid or missing arabic parameter' });
  }

  const roman = toRoman(value);

  // El evaluador espera { "roman": "CXXIII" }
  return res.status(200).json({ roman });
};

