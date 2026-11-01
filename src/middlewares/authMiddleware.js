const jwt = require("jsonwebtoken");

const autenticar = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      erro: "Token não fornecido.",
    });
  }

  const token = authHeader.split("")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!verify) {
      return res.status(401).json({
        erro: "Token inválido",
      });
    }

    req.usuario = decoded;
    next();
  } catch (erro) {
    console.error("ERRO DE AUTENTICAÇÃO: ", erro.message);
    return res.status(401).json({
      erro: "Token inválido ou expirado",
      detalhe: erro.message,
    });
  }
};

module.exports = { autenticar };
