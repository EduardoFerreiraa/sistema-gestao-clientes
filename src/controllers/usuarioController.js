const usuarioModel = require("../models/usuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: "Nome, email e senha são obrigatórios.",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await usuarioModel.criarUsuario({
      nome,
      email,
      senha: senhaHash,
    });

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (erro) {
    console.log("ERRO NO BANCO DE DADOS: ", erro.message);
    return res.status(500).json({
      erro: "Erro interno ao registrar um usuário.",
      detalhe: erro.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha são obrigatórios.",
      });
    }

    const usuario = await usuarioModel.buscarPorEmail(email);

    if (!usuario) {
      return res.status(401).json({
        erro: "Credenciais inválidas.",
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Credenciais inválidas.",
      });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token: token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (erro) {
    console.error("ERRO NO BANCO DE DADOS: ", erro.message);

    return res.status(500).json({
      erro: "Erro interno no login.",
      detalhe: erro.message,
    });
  }
};

module.exports = { registrar, login };
