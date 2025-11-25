// Convierte número arábigo a romano
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

export default function handler(req, res) {
  const { arabic } = req.query;
  const num = parseInt(arabic);

  if (!arabic || isNaN(num)) {
    return res.status(400).json({ error: "Parámetro arábico inválido." });
  }

  const roman = arabicToRoman(num);
  if (!roman) {
    return res.status(400).json({ error: "Número fuera de rango (1-3999)." });
  }

  return res.status(200).json({ roman });
}
