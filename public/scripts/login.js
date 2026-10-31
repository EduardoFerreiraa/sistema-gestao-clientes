const API_URL = "http://localhost:3000";

const formLogin = document.querySelector("#form");
const emailInput = document.querySelector("#emailInput");
const senhaInput = document.querySelector("#senhaInput");

const erroEmail = document.querySelector("#erro-email");
const erroSenha = document.querySelector("#erro-senha");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  let formularioValido = true;

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
  } else {
    erroSenha.textContent = "";
    senhaInput.classList.remove("erro-input");
  }

  if (!formularioValido) {
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!resposta.ok) {
      return alert("E-mail ou senha incorretas.");
    }

    const dados = await resposta.json();

    localStorage.setItem("token", dados.token);
    localStorage.setItem("usuarioNome", dados.usuario.nome);
    window.location.href = "index.html";
  } catch (erro) {
    console.log(erro);
    alert("Erro ao conectar ao servidor.");
  }
});
