const API_URL = "http://localhost:3000";

const formCadastro = document.querySelector("#form");
const nomeInput = document.querySelector("#nomeInput");
const emailInput = document.querySelector("#emailInput");
const senhaInput = document.querySelector("#senhaInput");
const confirmarSenhaInput = document.querySelector("#confirmarSenhaInput");

/* IDs para lançar no front erros do formulário */
const erroNome = document.querySelector("#erro-nome");
const erroEmail = document.querySelector("#erro-email");
const erroSenha = document.querySelector("#erro-senha");
const erroConfirmarSenha = document.querySelector("#erro-confirmarSenha");

formCadastro.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();
  const confirmarSenha = confirmarSenhaInput.value.trim();

  let formularioValido = true;

  if (!nome) {
    erroNome.textContent = "Nome é obrigatório.";
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

  if (!senha) {
    erroSenha.textContent = "Senha é obrigatória.";
    senhaInput.classList.add("erro-input");
    formularioValido = false;
  } else if (senha.length < 8) {
    erroSenha.textContent = "A senha deve ter no mínimo 8 caracteres.";
    senhaInput.classList.add("erro-input");
    formularioValido = false;
  } else {
    erroSenha.textContent = "";
    senhaInput.classList.remove("erro-input");
  }

  if (!confirmarSenha) {
    erroConfirmarSenha.textContent = "Confirme a sua senha.";
    confirmarSenhaInput.classList.add("erro-input");
    formularioValido = false;
  } else if (senha !== confirmarSenha) {
    erroConfirmarSenha.textContent = "As senhas não coincidem!";
    confirmarSenhaInput.classList.add("erro-input");
    formularioValido = false;
  } else {
    erroConfirmarSenha.textContent = "";
    confirmarSenhaInput.classList.remove("erro-input");
  }

  if (!formularioValido) {
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/usuarios/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      return alert(erro.erro);
    }

    alert("Conta criada com sucesso. Faça login.");
    window.location.href = "login.html";
  } catch (erro) {
    console.error(erro);
    alert("Erro ao conectar com o servidor.");
  }
});
