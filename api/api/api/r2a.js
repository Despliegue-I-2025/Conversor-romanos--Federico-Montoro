const cors = require('cors');
const corsHandler = cors();

module.exports = (req, res) => {
  corsHandler(req, res, () => {
    const { roman } = req.query;
    if (!roman) return res.status(400).json({ error: "Parametro romano requerido." });

    const result = romanToArabic(roman);
    if (result === null)
      return res.status(400).json({ error: "Numero romano inválido." });

    return res.status(200).json({ arabic: result });
  });
};
