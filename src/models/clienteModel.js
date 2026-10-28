const pool = require("../db");

const listarTodos = async () => {
  const resultado = await pool.query("SELECT * FROM clientes ORDER BY id ASC");
  return resultado.rows;
};

const criar = async (cliente) => {
  const {
    nome,
    email,
    telefone,
    cpf_cnpj,
    empresa,
    cidade,
    status,
    observacoes,
  } = cliente;

  const query = `INSERT INTO clientes (nome, email, telefone, cpf_cnpj, empresa, cidade, status, observacoes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;

  const resultado = await pool.query(query, [
    nome,
    email,
    telefone,
    cpf_cnpj,
    empresa,
    cidade,
    status,
    observacoes,
  ]);

  return resultado.rows[0];
};

const atualizar = async (id, dadosClientes) => {
  const {
    nome,
    email,
    telefone,
    cpf_cnpj,
    empresa,
    cidade,
    status,
    observacoes,
  } = dadosClientes;

  const query = `UPDATE clientes 
  SET nome = $1, email = $2, telefone = $3, cpf_cnpj = $4, 
  empresa = $5, cidade = $6, status = $7, observacoes = $8
  WHERE id = $9
  RETURNING *`;

  const resultado = await pool.query(query, [
    nome,
    email,
    telefone,
    cpf_cnpj,
    empresa,
    cidade,
    status,
    observacoes,
    id,
  ]);

  return resultado.rows[0];
};

const deletar = async (id) => {
  const query = `DELETE FROM clientes 
  WHERE id = $1
  RETURNING *`;

  const resultado = await pool.query(query, [id]);

  return resultado.rowCount > 0;
};

// exportando funções
module.exports = { listarTodos, criar, atualizar, deletar };
