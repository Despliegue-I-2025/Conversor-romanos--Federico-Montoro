// /api/a2r.js
import cors from "cors";

const handler = (req, res) => {
  cors()(req, res, () => {
    const arabic = parseInt(req.query.arabic, 10);

    if (!arabic || arabic < 1 || arabic > 3999) {
      return res.status(400).json({ error: "Número arábico inválido (1-3999)." });
    }

    const rules = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'],
      [1, 'I']
    ];

    let result = '';
    let n = arabic;

    for (const [value, symbol] of rules) {
      while (n >= value) {
        result += symbol;
        n -= value;
      }
    }

    return res.status(200).json({ roman: result });
  });
};

export default handler;

