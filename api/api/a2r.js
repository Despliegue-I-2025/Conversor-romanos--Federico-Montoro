const cors = require('cors');
const corsHandler = cors();

module.exports = (req, res) => {
  corsHandler(req, res, () => {
    const { arabic } = req.query;
    const num = parseInt(arabic);

    if (!arabic) return res.status(400).json({ error: "Parametro arábico requerido." });
    if (isNaN(num) || num < 1 || num > 3999)
      return res.status(400).json({ error: "Numero arábico inválido (1-3999)." });

    const result = arabicToRoman(num);
    return res.status(200).json({ roman: result });
  });
};

