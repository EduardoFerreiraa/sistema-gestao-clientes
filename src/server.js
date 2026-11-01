const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// importando rotas
const clienteRoutes = require("./routes/clienteRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
  }),
);
app.use(express.json());

app.use("/clientes", clienteRoutes);
app.use("/usuarios", usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
