# Digital Store — Backend

API REST em Node.js, Express, MySQL e Sequelize, organizada conforme o roteiro do projeto da disciplina.

## 1. Requisitos
- Node.js 18 ou superior
- MySQL 8 ou compatível

## 2. Instalação
No terminal, dentro desta pasta:

```bash
npm install
```

Crie um banco no MySQL:

```sql
CREATE DATABASE digital_store;
```

Copie `.env.example` para `.env` e ajuste usuário/senha do MySQL e `JWT_SECRET`.

No Windows, pode copiar pelo Explorador de Arquivos ou executar:

```bash
copy .env.example .env
```

## 3. Criar as tabelas
```bash
npm run migrate
```

## 4. Iniciar
```bash
npm run dev
```
A API ficará em `http://localhost:3001`.

## 5. Endpoints
| Método | Rota | Acesso |
|---|---|---|
| POST | `/v1/user` | Público (cadastro inicial) |
| POST | `/v1/user/token` | Público (login) |
| GET | `/v1/user/:id` | Público |
| PUT/DELETE | `/v1/user/:id` | JWT |
| GET | `/v1/category/search` | Público |
| GET | `/v1/category/:id` | Público |
| POST/PUT/DELETE | `/v1/category` e `/:id` | JWT |
| GET | `/v1/product/search` | Público |
| GET | `/v1/product/:id` | Público |
| POST/PUT/DELETE | `/v1/product` e `/:id` | JWT |

As rotas protegidas recebem `Authorization: Bearer SEU_TOKEN`.

### Criar usuário
`POST /v1/user`
```json
{"firstname":"André","surname":"Pires","email":"andre@email.com","password":"123456","confirmPassword":"123456"}
```
### Fazer login
`POST /v1/user/token`
```json
{"email":"andre@email.com","password":"123456"}
```
Resposta: `{ "token": "..." }`.

### Criar categoria (com token)
`POST /v1/category`
```json
{"name":"Tênis","slug":"tenis","use_in_menu":true}
```

### Criar produto (com token)
`POST /v1/product`
```json
{"enabled":true,"name":"Tênis casual","slug":"tenis-casual","stock":10,"description":"Tênis para uso diário","price":199.9,"price_with_discount":179.9,"category_ids":[1],"images":[],"options":[{"title":"Tamanho","shape":"square","type":"text","values":["38","39","40"]}]}
```

### Consultas e filtros
- `/v1/category/search?limit=12&page=1&use_in_menu=true`
- `/v1/product/search?limit=12&page=1&match=tenis`
- `/v1/product/search?category_ids=1,2&price-range=100-300`
- `/v1/product/search?fields=name,images,price`

Imagens podem ser enviadas como Data URL base64 (`data:image/png;base64,...`) e são salvas em `uploads/`. Imagens por URL também podem ser informadas no campo `content`.

## 6. Testes
```bash
npm test
```

## Observações importantes
- O cadastro e o login de usuário são públicos para permitir criar a primeira conta e obter o primeiro JWT. As operações administrativas de criação/edição/exclusão de categorias e produtos exigem token.
- O backend não altera o site publicado automaticamente. Para conectar o frontend hospedado no Netlify, será necessário publicar esta API em um serviço de backend e configurar no frontend a URL pública da API (ou executar ambos localmente durante o desenvolvimento).
- A estrutura e os campos seguem o README do repositório oficial indicado no PDF. Ajustes específicos de integração dependem de como o frontend atual faz as chamadas HTTP.
