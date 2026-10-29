const API_URL = "http://localhost:3000";

const nomeInput = document.querySelector("#nomeInput");
const emailInput = document.querySelector("#emailInput");
const telefoneInput = document.querySelector("#telefoneInput");
const cpfInput = document.querySelector("#cpfInput");
const empresaInput = document.querySelector("#empresaInput");
const cidadeInput = document.querySelector("#cidadeInput");
const statusInput = document.querySelector("#statusInput");
const observacoesInput = document.querySelector("#observacoesInput");
const tabelaClientes = document.querySelector("#lista-clientes");

const inputBusca = document.querySelector("#filter-search");
const selectStatus = document.querySelector("#status");

const btnNovoCliente = document.querySelector("#btn-novo");
const btnCancelarForm = document.querySelector("#btn-cancelar");
const layoutForm = document.querySelector(".layout-cliente");
const tituloForm = document.querySelector("#titulo-form");

const erroNome = document.querySelector("#erro-nome");
const erroEmail = document.querySelector("#erro-email");
const erroTelefone = document.querySelector("#erro-telefone");
const erroCpf = document.querySelector("#erro-cpf");
const erroCidade = document.querySelector("#erro-cidade");

const formulario = document.querySelector("#formulario");
const listaClientes = document.querySelector("#lista-clientes");

let clienteEditandoId = null;

function limparFormulario() {
  const campos = [
    { input: nomeInput, erro: erroNome },
    { input: emailInput, erro: erroEmail },
    { input: telefoneInput, erro: erroTelefone },
    { input: cpfInput, erro: erroCpf },
    { input: cidadeInput, erro: erroCidade },
    { input: empresaInput, erro: null },
    { input: observacoesInput, erro: null },
  ];

  campos.forEach((campo) => {
    campo.input.value = "";
    campo.input.classList.remove("erro-input");

    if (campo.erro) {
      campo.erro.textContent = "";
    }
  });
}

function formularioAbrindo() {
  btnNovoCliente.addEventListener("click", () => {
    clienteEditandoId = null;
    limparFormulario();

    layoutForm.classList.add("layout-aberto");
    tituloForm.textContent = "Novo cliente";
  });
}

function formularioFechando() {
  btnCancelarForm.addEventListener("click", () => {
    layoutForm.classList.remove("layout-aberto");
    limparFormulario();
  });
}

formularioAbrindo();
formularioFechando();

function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

async function listarClientes() {
  const termo = inputBusca ? inputBusca.value.trim() : "";
  const statusFiltro = selectStatus ? selectStatus.value : "";

  let url = `${API_URL}/clientes?`;

  if (termo) url += `busca=${encodeURIComponent(termo)}&`;
  if (statusFiltro && statusFiltro !== "Todos")
    url += `status=${statusFiltro}&`;

  const resposta = await fetch(url);
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

    btnEditar.addEventListener("click", async () => {
      clienteEditandoId = cliente.id;

      nomeInput.value = cliente.nome;
      emailInput.value = cliente.email;
      telefoneInput.value = cliente.telefone;
      cpfInput.value = cliente.cpf_cnpj;
      empresaInput.value = cliente.empresa || "";
      cidadeInput.value = cliente.cidade;
      statusInput.value = cliente.status;
      observacoesInput.value = cliente.observacoes || "";

      layoutForm.classList.add("layout-aberto");
      tituloForm.textContent = "Editar cliente";
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.classList.add("btn-excluir");
    btnExcluir.type = "button";
    btnExcluir.textContent = "Excluir";

    btnExcluir.addEventListener("click", async () => {
      if (confirm("Tem certeza que deseja excluir este cliente?")) {
        const resposta = await fetch(`${API_URL}/clientes/${cliente.id}`, {
          method: "DELETE",
        });

        if (!resposta.ok) {
          const erroServidor = await resposta.json();

          console.error("Erro detalhado:", erroServidor);
          alert(
            `Erro ao deletar: ${erroServidor.detalhe || erroServidor.erro || "Erro desconhecido"}`,
          );
          return;
        }

        listarClientes();
      }
    });

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

if (inputBusca) {
  inputBusca.addEventListener(
    "input",
    debounce(() => {
      listarClientes();
    }, 400),
  );
}

if (selectStatus) {
  selectStatus.addEventListener(
    "change",
    debounce(() => {
      listarClientes();
    }, 400),
  );
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

  const url =
    clienteEditandoId === null
      ? `${API_URL}/clientes`
      : `${API_URL}/clientes/${clienteEditandoId}`;

  const metodo = clienteEditandoId === null ? "POST" : "PUT";

  const resposta = await fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!resposta.ok) {
    const erroServidor = await resposta.json();

    console.error("Erro detalhado:", erroServidor);
    alert(
      `Erro ao cadastrar: ${erroServidor.detalhe || erroServidor.erro || "Erro desconhecido"}`,
    );
    return;
  }

  const dados = await resposta.json();
  console.log(dados);

  limparFormulario();
  clienteEditandoId = null;
  layoutForm.classList.remove("layout-aberto");
  listarClientes();
});
