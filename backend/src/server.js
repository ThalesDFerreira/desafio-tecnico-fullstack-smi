require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;

const routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(port, () => console.log(`Api rodando na porta ${port}`));