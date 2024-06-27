const express = require('express');
const router = express.Router();
const aiServico = require('../servicos/aiServico');

// Define a rota POST para '/ocorrencias'
router.post('/', async (req, res, next) => {
    try {
        const dadosOcorrencia = req.body;
        console.log("JSON recebido:", dadosOcorrencia);

        if (!dadosOcorrencia.descricao) {
            console.error('Descrição é obrigatória');
            return res.status(400).json({ erro: 'Descrição é obrigatória' });
        }

        const respostaAI = await aiServico.processarOcorrencia(dadosOcorrencia);
        console.log("Resposta AI:", respostaAI);
        res.status(200).json(respostaAI);
    } catch (erro) {
        console.error('Erro ao processar a ocorrência:', erro);
        res.status(500).json({ erro: 'Erro ao processar a ocorrência' });
    }
});

module.exports = router;
