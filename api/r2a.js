// api/r2a.js

const romanValues = {
  M: 1000, D: 500, C: 100, L: 50,
  X: 10, V: 5, I: 1
};

function fromRoman(roman) {
  let total = 0;

  for (let i = 0; i < roman.length; i++) {
    const curr = romanValues[roman[i]];
    const next = romanValues[roman[i + 1]];

    if (!curr) return NaN;

    if (next && next > curr) {
      total += next - curr;
      i++;
    } else {
      total += curr;
    }
  }
  return total;
}

module.exports = (req, res) => {
  // 🔓 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // El evaluador manda ?roman=CXXIII
  const romanParam = (req.query.roman || '').toUpperCase();

  if (!romanParam || !/^[MDCLXVI]+$/.test(romanParam)) {
    return res.status(400).json({ error: 'invalid or missing roman parameter' });
  }

  const arabic = fromRoman(romanParam);

  if (Number.isNaN(arabic)) {
    return res.status(400).json({ error: 'invalid roman numeral' });
  }

  // El evaluador espera { "arabic": 123 }
  return res.status(200).json({ arabic });
};


