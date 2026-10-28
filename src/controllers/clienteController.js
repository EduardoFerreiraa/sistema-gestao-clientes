const clienteModel = require("../models/clienteModel");

const listar = async (req, res) => {
  try {
    const clientes = await clienteModel.listarTodos();
    return res.json(clientes);
  } catch (erro) {
    console.error("ERRO NO BANCO: ", erro.message);
    return res.status(500).json({
      erro: "Erro interno ao listar clientes.",
      detalhe: erro.message || erro.detail || erro.code || "Erro desconhecido",
    });
  }
};

const cadastrar = async (req, res) => {
  try {
    let { cpf_cnpj, status } = req.body;

    if (cpf_cnpj) cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
    const statusValido = ["Ativo", "Pendente", "Inativo"].includes(status)
      ? status
      : "Ativo";

    const dadosClientes = { ...req.body, cpf_cnpj, status: statusValido };
    const novoCliente = await clienteModel.criar(dadosClientes);

    return res.status(201).json(novoCliente);
  } catch (erro) {
    console.error("ERRO NO BANCO: ", erro.message);
    return res.status(500).json({
      erro: "Erro interno ao cadastrar.",
      detalhe: erro.message || erro.detail || erro.code || "Erro desconhecido",
    });
  }
};

const editar = async (req, res) => {
  try {
    let { cpf_cnpj, status } = req.body;
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido.",
      });
    }

    if (cpf_cnpj) cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
    const statusValido = ["Ativo", "Pendente", "Inativo"].includes(status)
      ? status
      : "Ativo";

    const dadosClientes = { ...req.body, cpf_cnpj, status: statusValido };
    const clienteAtualizado = await clienteModel.atualizar(id, dadosClientes);

    if (!clienteAtualizado)
      return res.status(404).json({
        erro: "Cliente não encontrado!",
      });

    return res.status(200).json(clienteAtualizado);
  } catch (erro) {
    console.error("ERRO NO BANCO: ", erro.message);
    return res.status(500).json({
      erro: "Erro ao editar cliente",
      detalhe: erro.message || erro.detail || erro.code || "Erro desconhecido",
    });
  }
};

const deletar = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido",
      });
    }

    const deletou = await clienteModel.deletar(id);
    if (!deletou) {
      return res.status(404).json({
        erro: "Cliente não encontrado!",
      });
    }

    res.status(204).send();
  } catch (erro) {
    console.error("ERRO NO BANCO: ", erro.message);
    return res.status(500).json({
      erro: "Erro interno ao deletar cliente",
      detalhe: erro.message || erro.detail || erro.code || "Erro desconhecido",
    });
  }
};

module.exports = { listar, cadastrar, editar, deletar };
