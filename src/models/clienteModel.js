const pool = require("../db");

const listarTodos = async (filtros = {}) => {
  let query = "SELECT * FROM clientes";
  let values = [];

  if (filtros.busca && filtros.status) {
    query += " WHERE (nome ILIKE $1 OR email ILIKE $1) AND status = $2";
    values = [`%${filtros.busca}%`, filtros.status];
  } else if (filtros.busca) {
    query += " WHERE nome ILIKE $1 OR email ILIKE $1";
    values = [`%${filtros.busca}%`];
  } else if (filtros.status) {
    query += " WHERE status = $1";
    values = [filtros.status];
  }

  query += " ORDER BY id ASC";

  const resultado = await pool.query(query, values);
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
