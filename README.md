# 🧾 API de Controle de Produtos e Despensa

Esta API permite o gerenciamento de produtos alimentícios com informações de validade, além de autenticação de usuários via Firebase Authentication. Os usuários autenticados podem registrar itens em sua própria despensa.

---

## 🚀 Funcionalidades

- Cadastro e login de usuários com Firebase
- Geração e renovação de token (JWT + refresh)
- Consulta de produtos com validade e dicas de conservação
- Filtragem por nome e categoria
- Cadastro de produtos na despensa pessoal
- Proteção de rotas com autenticação

---

## 🛠️ Tecnologias

- Node.js + Express
- Firebase Admin SDK
- MongoDB + Mongoose
- JWT (bearer token)
- Dotenv
- Bcrypt (hash de senha)

---

## 🔧 Instalação

```bash
git clone https://github.com/seu-usuario/api-despensa.git
cd api-despensa
npm install
```

---

## ⚙️ Configuração

Crie um arquivo `.env` com:

```env
PORT=3000

MONGODB_URI=SEU_URI_MONGODB

FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_CLIENT_EMAIL=seu-client-email@seuprojeto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA\n-----END PRIVATE KEY-----\n"

JWT_SECRET=sua-chave-secreta
JWT_REFRESH_SECRET=sua-chave-refresh
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
```

---

## ▶️ Execução

```bash
npm start
```

---

## 🔐 Autenticação

- Após login, use o `accessToken` no header das rotas protegidas:

```
Authorization: Bearer SEU_ACCESS_TOKEN
```

- Para renovar o token:

```http
POST /usuario/refresh
{
  "refreshToken": "SEU_REFRESH_TOKEN"
}
```

---

## 📬 Endpoints principais

| Método | Rota                    | Descrição                            |
|--------|-------------------------|--------------------------------------|
| POST   | `/usuario/cadastro`     | Cadastrar novo usuário               |
| POST   | `/usuario/login`        | Login com email/senha                |
| POST   | `/usuario/refresh`      | Renovar token com refreshToken       |
| GET    | `/produtos`             | Listar produtos                      |
| GET    | `/produtos/:nome`       | Buscar produto por nome              |
| GET    | `/categorias`           | Listar categorias                    |
| POST   | `/dispensa`             | Cadastrar item na despensa (aut.)    |

---

## 📦 Importar coleção no Apidog/Postman

Use o arquivo abaixo para importar todos os endpoints com exemplos:

📎 `api-produtos-apidog.json`

---

## ✅ To-do / Melhorias futuras

- CRUD completo de produtos administráveis
- Interface web (painel)
- Expiração automática na despensa
- Upload de imagem do produto
