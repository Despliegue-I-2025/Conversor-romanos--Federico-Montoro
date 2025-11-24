const { romanToArabic } = require('../index.js');

module.exports = (req, res) => {
  const roman = req.query.roman;
  if (!roman) return res.status(400).json({ error: "Parámetro romano requerido." });

  const result = romanToArabic(roman);
  if (result === null) return res.status(400).json({ error: "Numero romano inválido." });

  return res.status(200).json({ arabic: result });
};
