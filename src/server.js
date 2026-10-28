const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// importando rotas
const clienteRoutes = require("./routes/clienteRoutes");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://127.0.0.1:5500",
  }),
);
app.use(express.json());

app.use("/clientes", clienteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
