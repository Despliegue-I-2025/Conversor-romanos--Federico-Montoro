// /api/r2a.js
import cors from "cors";

const ROMAN_VALUES = {
  M: 1000, D: 500, C: 100, L: 50,
  X: 10, V: 5, I: 1
};

const handler = (req, res) => {
  cors()(req, res, () => {
    const roman = req.query.roman;

    if (!roman || typeof roman !== "string") {
      return res.status(400).json({ error: "Parámetro roman requerido." });
    }

    const upper = roman.toUpperCase();
    let total = 0;
    let i = 0;

    while (i < upper.length) {
      const current = ROMAN_VALUES[upper[i]];
      const next = ROMAN_VALUES[upper[i + 1]];

      if (!current) {
        return res.status(400).json({ error: "Número romano inválido." });
      }

      if (next && next > current) {
        total += next - current;
        i += 2;
      } else {
        total += current;
        i++;
      }
    }

    if (total < 1 || total > 3999) {
      return res.status(400).json({ error: "Número romano inválido (1-3999)." });
    }

    return res.status(200).json({ arabic: total });
  });
};

export default handler;

