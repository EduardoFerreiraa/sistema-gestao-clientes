const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/clientes", (req, res) => {
  res.status(200).json({
    ok: "Sistema de Gestão de Clientes",
  });

  res.send();
});

app.listen(PORT, () => {
  console.log("Servidor rodando...");
});
