const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// app.use(express.json()); // si no lo necesitás, podés dejarlo comentado

// Mapa de valores romanos
const ROMAN_MAP = {
  I: 1, V: 5, X: 10, L: 50,
  C: 100, D: 500, M: 1000,
};

// Regex para validar romanos 1..3999
const ROMAN_VALID_RE =
  /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

// Conversión de arábigo a romano
function arabicToRoman(num) {
  if (num < 1 || num > 3999) return null;

  const values = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const symbols = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];

  let result = '';
  let n = num;

  for (let i = 0; i < values.length; i++) {
    while (n >= values[i]) {
      n -= values[i];
      result += symbols[i];
    }
  }
  return result;
}

// Conversión de romano a arábigo
function romanToArabic(roman) {
  if (!ROMAN_VALID_RE.test(roman)) return null;

  let value = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = ROMAN_MAP[roman[i]];
    const next = ROMAN_MAP[roman[i + 1]];

    if (next && next > current) {
      value += next - current;
      i++;
    } else {
      value += current;
    }
  }
  return value;
}

// GET /a2r?arabic=123 -> { "roman": "CXXIII" }
app.get('/a2r', (req, res) => {
  const arabic = parseInt(req.query.arabic, 10);
  const roman = arabicToRoman(arabic);

  if (!roman) {
    return res
      .status(400)
      .json({ error: 'Invalid or missing arabic parameter' });
  }

  return res.json({ roman });
});

// GET /r2a?roman=CXXIII -> { "arabic": 123 }
app.get('/r2a', (req, res) => {
  const roman = (req.query.roman || '').toUpperCase();
  const arabic = romanToArabic(roman);

  if (!arabic) {
    return res
      .status(400)
      .json({ error: 'Invalid or missing roman parameter' });
  }

  return res.json({ arabic });
});

// Solo levantar servidor si se ejecuta con `node index.js`
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}

// Exportar app para que Jest / supertest puedan usarla
module.exports = app;
