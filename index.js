const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Mapa valores romanos
const ROMAN_MAP = {
  I: 1, V: 5, X: 10, L: 50,
  C: 100, D: 500, M: 1000
};

// Regex para validar romanos 1..3999
const ROMAN_VALID_RE = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

// ================= ENDPOINTS =================

// Romano → Arábigo
app.get('/r2a', (req, res) => {
  const roman = req.query.roman;
  if (!roman) return res.status(400).json({ error: 'Parametro roman requerido.' });

  const result = romanToArabic(roman.toUpperCase());
  if (result === null) return res.status(400).json({ error: 'Numero romano invalido.' });

  res.json({ arabic: result });
});

// Arábigo → Romano
app.get('/a2r', (req, res) => {
  const arabic = parseInt(req.query.arabic, 10);
  if (isNaN(arabic)) return res.status(400).json({ error: 'Parametro arabic requerido.' });

  const result = arabicToRoman(arabic);
  if (result === null) return res.status(400).json({ error: 'Numero arabico invalido (1-3999).' });

  res.json({ roman: result });
});

// ============= CONVERSION LOGIC =============

function romanToArabic(roman) {
  if (!ROMAN_VALID_RE.test(roman)) return null;

  let total = 0;
  let i = 0;
  while (i < roman.length) {
    const val = ROMAN_MAP[roman[i]];
    const nextVal = ROMAN_MAP[roman[i + 1]];
    if (nextVal && nextVal > val) {
      total += nextVal - val;
      i += 2;
    } else {
      total += val;
      i++;
    }
  }
  return total;
}

function arabicToRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null;

  const rules = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'],
    [1, 'I']
  ];

  let result = '';
  for (const [value, symbol] of rules) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }
  return result;
}

// Servidor
if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor escuchando en ${PORT}`));
}

module.exports = { app, romanToArabic, arabicToRoman };
