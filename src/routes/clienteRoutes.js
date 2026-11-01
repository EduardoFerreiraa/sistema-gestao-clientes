const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const { autenticar } = require("../middlewares/authMiddleware");

router.use(autenticar);

router.get("/", clienteController.listar);
router.post("/", clienteController.cadastrar);
router.put("/:id", clienteController.editar);
router.delete("/:id", clienteController.deletar);

module.exports = router;
