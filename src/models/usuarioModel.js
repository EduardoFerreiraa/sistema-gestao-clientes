const pool = require("../db");

const criarUsuario = async (dadosUsuario) => {
  const { nome, email, senha } = dadosUsuario;

  const query =
    "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email";

  const resposta = await pool.query(query, [nome, email, senha]);
  return resposta.rows[0];
};

const buscarPorEmail = async (email) => {
  const query = "SELECT * FROM usuarios WHERE email = $1";
  const resposta = await pool.query(query, [email]);

  return resposta.rows[0];
};

module.exports = { criarUsuario, buscarPorEmail };
