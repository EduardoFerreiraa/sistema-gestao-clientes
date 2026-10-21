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

app.get("/clientes", async (req, res) => {
  const resposta = await pool.query("SELECT * FROM clientes");
  return res.json(resposta.rows);
});

app.listen(PORT, () => {
  console.log("Servidor rodando...");
});
