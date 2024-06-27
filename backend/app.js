// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rotasOcorrencia = require('./rotas/ocorrencia');
const manipuladorErros = require('./utils/manipuladorErros');

const app = express();
const PORTA = process.env.PORTA || 3000;

// Configura middleware CORS
app.use(cors());

// Configura middleware para processar JSON no corpo das requisições
app.use(bodyParser.json());

// Define as rotas para 'ocorrencias'
app.use('/ocorrencias', rotasOcorrencia);

// Configura o middleware de manipulação de erros
app.use(manipuladorErros);

// Inicia o servidor na porta especificada
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
