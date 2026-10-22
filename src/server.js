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
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const cpf_cnpj = req.body.cpf_cnpj;
  const empresa = req.body.empresa;
  const cidade = req.body.cidade;
  const status = req.body.status;
  const observacoes = req.body.observacoes;

  const resposta = await pool.query(
    `INSERT INTO clientes (nome, email, telefone, cpf_cnpj, empresa, cidade, status, observacoes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id, nome, email, telefone, cpf_cnpj, empresa, cidade, status, observacoes`,
    [nome, email, telefone, cpf_cnpj, empresa, cidade, status, observacoes],
  );

  return res.status(201).json(resposta.rows[0]);
});

app.get("/clientes", async (req, res) => {
  const resposta = await pool.query("SELECT * FROM clientes");
  return res.json(resposta.rows);
});

app.listen(PORT, () => {
  console.log("Servidor rodando...");
});
