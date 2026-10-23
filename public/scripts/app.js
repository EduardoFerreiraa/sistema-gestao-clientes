const nomeInput = document.querySelector("#nomeInput");
const emailInput = document.querySelector("#emailInput");
const telefoneInput = document.querySelector("#telefoneInput");
const cpfInput = document.querySelector("#cpfInput");
const empresaInput = document.querySelector("#empresaInput");
const cidadeInput = document.querySelector("#cidadeInput");
const statusInput = document.querySelector("#statusInput");
const observacoesInput = document.querySelector("#observacoesInput");
const tabelaClientes = document.querySelector("#lista-clientes");

const erroNome = document.querySelector("#erro-nome");
const erroEmail = document.querySelector("#erro-email");
const erroTelefone = document.querySelector("#erro-telefone");
const erroCpf = document.querySelector("#erro-cpf");
const erroCidade = document.querySelector("#erro-cidade");

const formulario = document.querySelector("#formulario");
const listaClientes = document.querySelector("#lista-clientes");

async function listarClientes() {
  const resposta = await fetch("http://localhost:3000/clientes");
  const clientes = await resposta.json();
  tabelaClientes.innerHTML = "";

  clientes.forEach((cliente) => {
    const linha = document.createElement("tr");

    const celulaId = document.createElement("td");
    celulaId.textContent = cliente.id;

    const celulaNome = document.createElement("td");
    celulaNome.classList.add("cliente-nome");
    celulaNome.textContent = cliente.nome;

    const celulaEmail = document.createElement("td");
    celulaEmail.textContent = cliente.email;

    const celulaTelefone = document.createElement("td");
    celulaTelefone.textContent = cliente.telefone;

    const celulaCpf = document.createElement("td");
    celulaCpf.textContent = cliente.cpf_cnpj;

    const celulaEmpresa = document.createElement("td");
    celulaEmpresa.textContent = cliente.empresa;

    const celulaCidade = document.createElement("td");
    celulaCidade.textContent = cliente.cidade;

    const celulaStatus = document.createElement("td");
    celulaStatus.textContent = cliente.status;

    const celulaObservacoes = document.createElement("td");
    celulaObservacoes.textContent = cliente.observacoes;

    const celulaAcoes = document.createElement("td");
    celulaAcoes.classList.add("acoes");

    const btnEditar = document.createElement("button");
    btnEditar.classList.add("btn-editar");
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";

    const btnExcluir = document.createElement("button");
    btnExcluir.classList.add("btn-excluir");
    btnExcluir.type = "button";
    btnExcluir.textContent = "Excluir";

    celulaAcoes.append(btnEditar, btnExcluir);

    linha.append(
      celulaNome,
      celulaEmail,
      celulaTelefone,
      celulaCpf,
      celulaEmpresa,
      celulaCidade,
      celulaStatus,
      celulaObservacoes,
      celulaAcoes,
    );

    tabelaClientes.appendChild(linha);
  });
}

listarClientes();

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const telefone = telefoneInput.value.trim();
  const cpf_cnpj = cpfInput.value.trim();
  const empresa = empresaInput.value.trim();
  const cidade = cidadeInput.value.trim();
  const status = statusInput.value;
  const observacoes = observacoesInput.value.trim();

  const temNumero = /\d/.test(nome);
  let formularioValido = true;

  if (!nome) {
    erroNome.textContent = "Nome é obrigatório.";
    nomeInput.classList.add("erro-input");
    formularioValido = false;
  } else if (temNumero) {
    erroNome.textContent = "O nome não deve conter números.";
    nomeInput.classList.add("erro-input");
    formularioValido = false;
  } else {
    erroNome.textContent = "";
    nomeInput.classList.remove("erro-input");
  }

  if (!email) {
    erroEmail.textContent = "Email é obrigatório.";
    emailInput.classList.add("erro-input");
    formularioValido = false;
  } else {
    erroEmail.textContent = "";
    emailInput.classList.remove("erro-input");
  }

  if (!telefone) {
    erroTelefone.textContent = "Telefone é obrigatório.";
    telefoneInput.classList.add("erro-input");
    formularioValido = false;
  } else {
    erroTelefone.textContent = "";
    telefoneInput.classList.remove("erro-input");
  }

  if (!cpf_cnpj) {
    erroCpf.textContent = "CPF / CNPJ é obrigatório.";
    cpfInput.classList.add("erro-input");
    formularioValido = false;
  } else {
    erroCpf.textContent = "";
    cpfInput.classList.remove("erro-input");
  }

  if (!cidade) {
    erroCidade.textContent = "Cidade é obrigatório.";
    cidadeInput.classList.add("erro-input");
    formularioValido = false;
  } else {
    erroCidade.textContent = "";
    cidadeInput.classList.remove("erro-input");
  }

  if (!formularioValido) {
    return;
  }

  const cliente = {
    nome: nome,
    email: email,
    telefone: telefone,
    cpf_cnpj: cpf_cnpj,
    empresa: empresa,
    cidade: cidade,
    status: status,
    observacoes: observacoes,
  };

  console.log(cliente);

  const resposta = await fetch("http://localhost:3000/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!resposta.ok) {
    return alert("Erro interno no servidor");
  }

  const dados = await resposta.json();
  console.log(dados);

  formulario.reset();
  listarClientes();
});
