<h1 align="center">:hammer_and_wrench: Controle de Ferramentas :hammer_and_wrench:</h1>

## :pencil: Descrição / Description
<p align="left">Aplicação de Controlo de Ferramentas (Almoxarifado) para realização de empréstimos e devolução de ferramentas</p>
<p align="left"> O projeto é uma aplicação FullStack. Foi utilizado NodeJS com Express para o Backend, Sequelize ORM para o mapeamento do banco de dados MySQL, com JWT para autenticação de login do usuário e criptografia Bycrpt. No Frontend foi utilizado React com Vite para o interface e consumido a API via Axios</p>

## :factory: Requisitos
<p align="left">Git <br>
Node.js (versão 18+) <br>
MySQL <br><p>

#### Configurar o Banco de Dados
##### Na pasta `config` no arquivo `config.json`
```
{
  "development": {
    "username": "SEU_USUARIO",
    "password": "SUA_SENHA",
    "database": "SEU_DATABASE",
    "host": "SEU_HOST",
    "dialect": "mysql"
  }
}
```
  
## :gear: Como configurar
```
# Clonar Repositório
$ git clone https://github.com/jvmelo0/tools-control-nodejs-react.git

# Acessar pasta do projeto
$ cd tools-control-react

# Acessar pasta do backend
$ cd nodejs-mysql-api

# Instalar dependências
$ npm install

# Rodar Migrations do Sequelize
$ npx sequelize-cli db:create
$ npx sequelize-cli db:migrate

# Iniciar a API
$ npm start

# Em um novo terminal acessar a pasta do frontend
$ cd frontend

# Instalar dependências
$ npm install

# Iniciar o servidor do Vite/React
$ npm run dev
```

## :door: Endpoints
### Rotas Fronted
http://localhost:5173/
|Rota|Descrição|
|---|---|
|/login|Tela de Login|
|/main|Menu Principal|
|/usuarios/cadastrar|Cadastro de Usuários|
|/usuarios/listar|Lista de Usuários|
|/categorias/cadastrar|Cadastro de Categorias|
|/categorias/listar|Lista de Categorias|
|/categorias/editar/:id|Editar Categoria|
|/ferramentas/cadastrar|Cadastro de Ferramentas|
|/ferramentas/listar|Lista de Ferramentas|
|/ferramentas/editar/:id|Editar Ferramenta|
|/movimentos/emprestar|Emprestar Ferramenta|
|/movimentos/devolver|Devolver Ferramenta|
|/movimentos/listar|Lista de Movimentos|

### Rotas Backend
http://localhost:3000/
|Rota Usuário|Método|Descrição|
|---|---|---|
|user/|POST|Cadastrar Usuário|
|user/login|POST|Login de Usuário|
|user/|GET|Listar Usuários|
|user/:id|GET|Listar Usuário por ID|
|user/:id|PUT|Editar Usuário|
|user/:id|DELETE|Deletar Usuário por ID|

|Rota Categoria|Método|Descrição|
|---|---|---|
|category/|POST|Cadastrar Categoria|
|category/|GET|Listar Categorias|
|category/:id|GET|Listar Categoria por ID|
|category/:id|PUT|Editar Categoria|
|category/:id|DELETE|Deletar Categoria por ID|

|Rota Ferramenta|Método|Descrição|
|---|---|---|
|tool/|POST|Cadastrar Ferramenta|
|tool/|GET|Listar Ferramentas|
|tool/:id|GET|Listar Ferramentas por ID|
|tool/nome/:description|GET|Listar Ferramentas por Descrição|
|tool/categoria/:category|GET|Listar Ferramentas por Categoria|
|tool/disponibilidade/:available|GET|Listar Ferramentas por Disponibilidade|
|tool/:id|PUT|Editar Ferramenta|
|tool/:id|DELETE|Deletar Ferramenta por ID|

|Rota Movimento|Método|Descrição|
|---|---|---|
|/record/|POST|Emprestar Ferramenta|
|/record/return|POST|Devolver Ferramenta|
|/record/|GET|Listar Movimentos|
|/record/movimento/:movementType|GET|Listar Movimentos por Tipo|

## :computer: Dependências / Dependencies
* bcryptjs ^3.0.3 <br>
* body-parser ^2.3.0 <br>
* cors ^2.8.6 <br>
* express: ^5.2.1 <br>
* fastest-validator: ^1.19.1 <br>
* jsonwebtoken: ^9.0.3 <br>
* mysql2: ^3.24.3 <br>
* nodemon: ^3.1.14 <br>
* sequelize: ^6.37.8 <br>
* sequelize-cli: ^6.6.5 <br>
* @fortawesome/free-brands-svg-icons: ^7.3.1 <br>
* @fortawesome/free-regular-svg-icons: ^7.3.1 <br>
* @fortawesome/free-solid-svg-icons: ^7.3.1 <br>
* @fortawesome/react-fontawesome: ^3.5.0 <br>
* axios: ^1.20.0 <br>
* react: ^19.2.8 <br>
* react-dom: ^19.2.8 <br>
* react-router-dom: ^7.18.3 <br>
* @eslint/js: ^10.0.1 <br>
* @types/react: ^19.2.18 <br>
* @types/react-dom: ^19.2.7 <br>
* @vitejs/plugin-react: ^6.1.1 <br>
* eslint: ^10.10.0 <br>
* eslint-plugin-react-hooks: ^7.1.1 <br>
* eslint-plugin-react-refresh: ^0.5.6 <br>
* globals: ^17.12.0 <br>
* vite: ^8.3.0 <br>

## :bust_in_silhouette:	 Colaboradores / Collaborators
<p align="left"> João Vitor Melo </p>
