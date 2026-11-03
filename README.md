# 💼 Sistema de Gestão de Clientes

🌐 **Acesse o projeto online**: [gestao-clientes-app-three.vercel.app](https://gestao-clientes-app-three.vercel.app)

Um sistema web Full Stack desenvolvido para o cadastro, listagem, edição e exclusão de clientes. O projeto foi construído com o objetivo de praticar a integração entre Frontend e Backend, utilizando arquitetura desacoplada (API REST).

## Release: v2.2.0

- Criação das telas de Login e Cadastro de usuários.
- Integração do Frontend com a API de autenticação.
- Armazenamento seguro do Token JWT no `localStorage`.
- Proteção de todas as rotas do sistema no Backend com o `AuthMiddleware`.
- Logo e ícones criados, status criado com: Total de clientes, Ativos, Pendentes e Inativos (frontend).
- Design do sistema melhorado.
- Implementado Dark Mode, menu colapsável e melhorias de UI/UX
- Novos ícones
- Refatoração CSS

## Arquitetura e Refatoração

- Backend refatorado para o padrão MVC (Model, Controller, Routes).
- CRUD completo de clientes (Frontend e Backend).
- Código do `server.js` mais limpo e organizado.

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

**Frontend:**

- HTML5
- CSS3 (com animações e design responsivo)
- JavaScript (ES6+, manipulação de DOM e Fetch API)

**Backend:**

- Node.js
- Express.js
- PostgreSQL (Banco de dados relacional)
- pg (Driver de conexão)

**Ferramentas:**

- Git e GitHub
- VS Code
- Insomnia / Postman (para testes de API)

## ⚙️ Funcionalidades

- [x] Cadastro de novos clientes (Create)
- [x] Listagem de clientes com renderização dinâmica (Read)
- [x] Edição de dados de clientes existentes (Update)
- [x] Exclusão de clientes (Delete)
- [x] Interface com painel lateral (slide-over) animado para cadastro/edição
- [x] Validação de formulários no frontend
- [x] Consumo de API REST via `fetch`

## 🖼️ Preview do Projeto

### Cadastro
- Crie uma nova conta se você não tiver.
<img width="1919" height="993" alt="image" src="https://github.com/user-attachments/assets/179e9873-bc58-4935-a07c-93301d3887f1" />

### Login
- Faça o Login se você já tem uma conta.
<img width="1919" height="993" alt="image" src="https://github.com/user-attachments/assets/665a3397-f792-49ef-a9cc-4bd836a94118" />

### Sistema de Gestão de Clientes
- Quando você fizer o login, você será direcionado direto para essa tela.
<img width="1919" height="993" alt="image" src="https://github.com/user-attachments/assets/b48e00e4-220b-40c0-8473-7504c268c7a5" />

### Clicando em "+ Novo cliente"
- Quando você clicar em "Novo cliente", irá aparecer o formulário para preencher os dados do seu cliente.
<img width="1919" height="993" alt="image" src="https://github.com/user-attachments/assets/8a0c9c65-ef21-4f15-87ea-c123fe3f902a" />


## 🔧 Como rodar o projeto localmente

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### Passo a passo

1. Clone este repositório:

```bash
git clone https://github.com/EduardoFerreiraa/sistema-gestao-clientes.git
```

---

2. Acesse a pasta do projeto no terminal:

```bash
cd sistema-gestao-clientes
```

---

3. Instale as dependências do backend:

```bash
npm install
```

---

4. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione as suas credenciais do banco de dados (baseado no arquivo `.env.example`, se houver):

```env
PORT=3000
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=nome_do_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
```

---

5. Crie a tabela no banco de dados PostgresSQL:
   (Aqui você pode colocar o código SQL que você usou para criar a tabela, ex:)

```sql
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  cpf_cnpj VARCHAR(20),
  empresa VARCHAR(100),
  cidade VARCHAR(100),
  status VARCHAR(20),
  observacoes TEXT
);
```

---

6. Inicie o servidor backend:

```bash
node server.js
```

---

7. Abra o Frontend:
   Abra o arquivo `index.html` no seu navegador (recomendado usar a extensão Live Server no VS Code).
