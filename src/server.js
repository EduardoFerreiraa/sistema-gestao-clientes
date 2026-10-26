const cors = require("cors");
const express = require("express");
const app = express();
const pool = require("./db");
const PORT = 3000;

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);

app.use(express.json());

app.post("/clientes", async (req, res) => {
  try {
    let {
      nome,
      email,
      telefone,
      cpf_cnpj,
      empresa,
      cidade,
      status,
      observacoes,
    } = req.body;

    if (cpf_cnpj) {
      cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
    }

    const statusValido = ["Ativo", "Pendente", "Inativo"].includes(status)
      ? status
      : "Ativo";

    const resposta = await pool.query(
      `INSERT INTO clientes (nome, email, telefone, cpf_cnpj, empresa, cidade, status, observacoes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id, nome, email, telefone, cpf_cnpj, empresa, cidade, status, observacoes`,
      [
        nome,
        email,
        telefone,
        cpf_cnpj,
        empresa,
        cidade,
        statusValido,
        observacoes,
      ],
    );

    return res.status(201).json(resposta.rows[0]);
  } catch (erro) {
    console.log("ERRO NO BANCO DE DADOS: ", erro.message);

    return res.status(500).json({
      erro: "Erro interno ao cadastrar cliente.",
      detalhe: erro.message,
    });
  }
});

app.get("/clientes", async (req, res) => {
  const resposta = await pool.query("SELECT * FROM clientes");
  return res.json(resposta.rows);
});

app.put("/clientes/:id", async (req, res) => {
  try {
    let {
      nome,
      email,
      telefone,
      cpf_cnpj,
      empresa,
      cidade,
      status,
      observacoes,
    } = req.body;

    nome = (nome || "").trim();
    email = (email || "").trim();
    telefone = (telefone || "").trim();
    cpf_cnpj = (cpf_cnpj || "").trim();
    empresa = (empresa || "").trim();
    cidade = (cidade || "").trim();
    status = (status || "").trim();
    observacoes = (observacoes || "").trim();

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido",
      });
    }

    if (cpf_cnpj) {
      cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
    }

    const statusValido = ["Ativo", "Pendente", "Inativo"].includes(status)
      ? status
      : "Ativo";

    const resposta = await pool.query(
      `UPDATE clientes
    SET nome = $1, email = $2, telefone = $3, cpf_cnpj = $4, empresa = $5, cidade = $6, status = $7, observacoes = $8
    WHERE id = $9
    RETURNING *`,
      [
        nome,
        email,
        telefone,
        cpf_cnpj,
        empresa,
        cidade,
        statusValido,
        observacoes,
        id,
      ],
    );

    if (resposta.rowCount === 0) {
      return res.status(404).json({
        erro: "Cliente não encontrado!",
      });
    }

    res.status(200).json(resposta.rows[0]);
  } catch (erro) {
    console.log("ERRO NO BANCO DE DADOS: ", erro.message);

    res.status(500).json({
      erro: "Erro interno ao atualizar cliente",
      detalhe: erro.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando...");
});
