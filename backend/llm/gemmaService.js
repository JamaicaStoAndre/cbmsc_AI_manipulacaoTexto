const Groq = require('groq-sdk');
require('dotenv').config();

const apiKey = process.env.GROQ_API_KEY;
console.log("API Key carregada:", apiKey);
if (!apiKey) {
    throw new Error("A variável de ambiente GROQ_API_KEY está ausente ou vazia.");
}
const groq = new Groq({ apiKey });

async function processarOcorrencia(dadosOcorrencia) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": `
Transforme o texto enviado em um tweet, seguindo os exemplos fornecidos abaixo. Se o texto mencionar suicídio ou atos contra a própria vida, altere para 'pessoa em situação de perigo e necessita de resgate'. Responda apenas com o texto para o Twitter.

Exemplos:

[INCÊNDIO]
Original: INCENDIO EM VEGETACAO, PRÓXIMO A RESIDÊNCIAS
Melhorada: Segundo solicitante, está ocorrendo um incêndio em vegetação com risco de se propagar e atingir residências próximas.

Original: pegou fogo na lareira da residencia e pegou no forro do residencia ja apagaram e ficou muita fumaça dentro da residencia
Melhorada: Segundo solicitante, ocorreu um incêndio originado na lareira que se propagou para o forro da residência. Informaram que o incêndio já foi extinto, porém que há bastante fumaça no interior da residência.

[AUXÍLIO/APOIOS]
Original: colisão carro x moto, 2 vítimas, 1 conduzida pelo samu, 1 fora do veículo, uma com luxação no braço e ombro
Melhorada: Realização de auxílio ao SAMU no atendimento de duas vítimas de colisão entre carro e moto. Uma das vítimas foi atendida e conduzida pelo SAMU e a outra está consciente, orientada e fora do veículo com suspeita de luxação no braço e ombro direito.

Original: auxilio apoio ao samu
Melhorada: Realização de auxílio ao SAMU no atendimento de ocorrência.

[PRODUTOS PERIGOSOS]
Original: vazamentode glp em cilindro p 45 com chamas
Melhorada: Segundo solicitante, um cilindro GLP P45 está com vazamento e em chamas.

Original: vazamento de gaz
Melhorada: Segundo solicitante, está ocorrendo um vazamento de gás.

[SALVAMENTO / BUSCA / RESGATE]
Original: vítima presa em elevador
Melhorada: Segundo solicitante, há uma vítima presa no interior de um elevador.

Original: Feminina em surto atentando com a própria vida
Melhorada: Segundo solicitante, vítima em situação de perigo necessitando de resgate.

[ATENDIMENTO PRÉ-HOSPITALAR]
Original: mal súbito em adulto. dores na região do peito.
Melhorada: Segundo solicitante, um adulto apresentou mal súbito e refere dores na região do peito.

Original: sincope em feminina menor
Melhorada: Segundo solicitante, ocorreu síncope em uma feminina menor.

[DIVERSOS]
Original: inspeção / teste de manutenção
Melhorada: Realização de inspeção e teste de manutenção.

Original: inspeção / vistoria 
Melhorada: Realização de atividade de vistoria de segurança contra-incêndio.

[ACIDENTE DE TRÂNSITO]
Original: colisão caminhão e carro, vitima presa em ferragens.
Melhorada: Segundo solicitante, houve uma colisão entre caminhão e carro e vítima encontra-se presa às ferragens.

Original: atropelamento masculino - decubito dorsal, ferimento na cabeça.
Melhorada: Segundo solicitante, um masculino foi atropelado e apresenta ferimento na cabeça, estando em decúbito dorsal.

[AVERIGUAÇÃO / CORTE DE ÁRVORE]
Original: corte de árvore na via.
Melhorada: Segundo solicitante, há uma árvore sobre a via.

Original: averiguação de árvore.
Melhorada: Necessita-se realizar averiguação quanto ao risco de queda de árvore.

[AVERIGUAÇÃO / MANEJO DE INSETOS]
Original: enxame, abelha!
Melhorada: Segundo solicitante, há um enxame de abelhas.

Original: eliminação de insetos (vespas) na capela do asilo vicentino
Melhorada: Segundo solicitante, há vespas causando risco às pessoas na Capela do Asilo Vicentino.

[AÇÃO PREVENTIVA SOCIAL]
Original: ação preventiva festa de são joão do município
Melhorada: Realização de ação preventiva na Festa de São João do município.

Original: exposição de materiais
Melhorada: Realização de prevenção através da exposição de materiais.

[RISCO POTENCIAL]
Original: óleo na pista
Melhorada: Segundo solicitante, ocorreu derramamento de óleo na pista, oferecendo risco de acidentes aos que trafegam no local.

Original: lavagem de pista por detridos na via
Melhorada: Segundo solicitante, necessidade de realizar a retirada de detritos da via para prevenir acidentes.
                    `
                },
                {
                    "role": "user",
                    "content": dadosOcorrencia.descricao
                }
            ],
            "model": "llama3-8b-8192",
            "temperature": 1,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": false,
            "stop": null
        });

        // Verifique se a resposta é válida
        if (!chatCompletion || !chatCompletion.choices || !chatCompletion.choices.length) {
            throw new Error('Resposta da LLM está vazia ou inválida');
        }

        // Concatena o conteúdo da resposta
        const respostaCompleta = chatCompletion.choices[0].message.content.trim();

        // Retorna a resposta formatada
        return { textoFormatado: respostaCompleta };

    } catch (error) {
        console.error('Erro ao processar a ocorrência:', error);
        throw new Error('Erro ao processar a ocorrência com a LLM');
    }
}

module.exports = { processarOcorrencia };
