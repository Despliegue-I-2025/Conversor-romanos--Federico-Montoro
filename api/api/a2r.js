const { romanToArabic } = require('../index.js');

module.exports = (req, res) => {
  const arabic = parseInt(req.query.arabic);
  if (!arabic) return res.status(400).json({ error: "Parámetro arábico requerido." });

  const result = arabicToRoman(arabic);
  if (!result) return res.status(400).json({ error: "Número arábico inválido (1-3999)." });

  return res.status(200).json({ roman: result });
};
