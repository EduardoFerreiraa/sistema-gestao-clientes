const nomeInput = document.querySelector("#nomeInput");
const emailInput = document.querySelector("#emailInput");
const telefoneInput = document.querySelector("#telefoneInput");
const cpfInput = document.querySelector("#cpfInput");
const empresaInput = document.querySelector("#empresaInput");
const cidadeInput = document.querySelector("#cidadeInput");
const observacoesInput = document.querySelector("#observacoesInput");

const erroNome = document.querySelector("#erro-nome");
const erroEmail = document.querySelector("#erro-email");
const erroTelefone = document.querySelector("#erro-telefone");
const erroCpf = document.querySelector("#erro-cpf");
const erroCidade = document.querySelector("#erro-cidade");

const formulario = document.querySelector("#formulario");
const listaClientes = document.querySelector("#lista-clientes");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const telefone = telefoneInput.value.trim();
  const cpf = cpfInput.value.trim();
  const empresa = empresaInput.value.trim();
  const cidade = cidadeInput.value.trim();
  const observacoes = observacoesInput.value.trim();

  const temNumero = /\d/.test(nome);
  const formularioValido = true;

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

  if (!cpf) {
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
    nome,
    email,
    telefone,
    cpf,
    empresa,
    cidade,
    observacoes,
  };

  console.log(cliente);

  const resposta = await fetch("http://localhost:3000/clientes", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!resposta.ok) {
    return alert("Erro interno no servidor");
  }
});
