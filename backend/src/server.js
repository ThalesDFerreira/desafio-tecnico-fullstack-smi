require('dotenv').config();
const { createTable } = require('./db/configDB');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;

const routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(cors());

// Cria-se a tabela no banco de dados caso não exista.
createTable();

//rotas
app.use(routes);

// server rodando
app.listen(port, () => console.log(`Api rodando na porta ${port}`));
