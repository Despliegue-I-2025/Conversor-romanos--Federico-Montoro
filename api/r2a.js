// Mapa de valores romanos
const romanValues = {
  I: 1, V: 5, X: 10, L: 50,
  C: 100, D: 500, M: 1000
};

// Convierte número romano a arábigo
function romanToArabic(roman) {
  if (!roman || typeof roman !== "string") return null;

  roman = roman.toUpperCase();
  let total = 0;
  let i = 0;

  while (i < roman.length) {
    const val = romanValues[roman[i]];
    const next = romanValues[roman[i + 1]];
    if (!val) return null;

    if (next && next > val) {
      total += next - val;
      i += 2;
    } else {
      total += val;
      i++;
    }
  }

  return total;
}

export default function handler(req, res) {
  const { roman } = req.query;
  const result = romanToArabic(roman);

  if (!result) {
    return res.status(400).json({ error: "Número romano inválido." });
  }

  return res.status(200).json({ arabic: result });
}
