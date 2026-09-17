<h1 align="center">:hammer_and_wrench: Controle de Ferramentas :hammer_and_wrench:</h1>

## :pencil: Descrição / Description
<p align="left">Aplicação de Controlo de Ferramentas (Almoxarifado) para realização de empréstimos e devolução de ferramentas</p>

## Requisitos
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

## Endpoints

## :computer: Tecnologia / Technology
<img align="right" width="45" height="50" alt="C_Programming_Language svg" src="https://github.com/user-attachments/assets/28b26c7a-2244-4183-8980-62c0a1056eed" />

<p align="left"> A tecnologia usada para o desenvolvimento desse projeto foi a linguagem C. </p>

## :bust_in_silhouette:	 Colaboradores / Collaborators
<p align="left"> João Vitor Melo </p>
