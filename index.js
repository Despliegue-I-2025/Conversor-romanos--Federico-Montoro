// index.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Mapa de valores romanos
const ROMAN_MAP = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

// Regex para validar números romanos 1..3999 (forma canónica)
const ROMAN_VALID_RE =
  /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

// ---------- Conversores básicos ----------

// Arábigo → Romano
function arabicToRoman(num) {
  const values = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];

  let result = '';
  let n = num;

  for (const [value, numeral] of values) {
    while (n >= value) {
      result += numeral;
      n -= value;
    }
  }

  return result;
}

// Romano → Arábigo
function romanToArabic(roman) {
  let total = 0;
  const chars = roman.split('');

  for (let i = 0; i < chars.length; i++) {
    const current = ROMAN_MAP[chars[i]];
    const next = ROMAN_MAP[chars[i + 1]];

    if (!current) {
      return NaN;
    }

    if (next && next > current) {
      total += next - current;
      i++;
    } else {
      total += current;
    }
  }

  return total;
}

// ---------- Endpoints ----------

// GET /a2r?arabic=123 -> { "roman": "CXXIII" }
app.get('/a2r', (req, res) => {
  const arabicParam = req.query.arabic;
  const value = parseInt(arabicParam, 10);

  if (!arabicParam || Number.isNaN(value) || value <= 0 || value > 3999) {
    return res.status(400).json({ error: 'invalid or missing arabic parameter' });
  }

  const roman = arabicToRoman(value);
  return res.status(200).json({ roman });
});

// GET /r2a?roman=CXXIII -> { "arabic": 123 }
app.get('/r2a', (req, res) => {
  const romanParam = (req.query.roman || '').toUpperCase();

  if (!romanParam || !ROMAN_VALID_RE.test(romanParam)) {
    return res.status(400).json({ error: 'invalid or missing roman parameter' });
  }

  const arabic = romanToArabic(romanParam);

  if (Number.isNaN(arabic)) {
    return res.status(400).json({ error: 'invalid roman numeral' });
  }

  return res.status(200).json({ arabic });
});

// ---------- Arranque del servidor (para uso local) ----------

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}

// Para que Jest u otros módulos puedan importar la app
module.exports = app;
