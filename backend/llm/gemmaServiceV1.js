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
                    "content": `"Transforme o texto enviado em texto alterado e formatado para tweet,"
                    "seguindo o modelo de [categoria da ocorrência] abaixo. O modelo deve ser capaz de "
                    "identificar o tipo de ocorrência e gerar um texto que atenda às necessidades do Twitter,"
                    "com linguagem profissional e sem erros de gramática. Use os modelos de "
                    "[categoria da ocorrência] como base para gerar o texto melhorado."
                    "Quando o texto fornecido pelo usuário conter os seguintes conteúdos: atentando contra a própria vida,"
                    "suicídio, tentando se matar, tirar a vida, se matando, não informar desta forma, trocar o sentido da "
                    "frase para que o leitor não saiba que se trata de um suício ou atentando contra a própria vida"
                    "utilizando 'pessoa em situação de perigo, e necessita de resgate'."
                    "Não insira sua opnião ou observação, nem invente história, responda somente o texto que irá para o Twitter"
                    "Veja os exemplos:"
                    "[INCÊNDIO]"
                    "Exemplo 1"
                    "Original: INCENDIO EM VEGETACAO, PRÓXIMO A RESIDÊNCIAS"
                    "melhorada: Segundo solicitante, está ocorrendo um incêndio em vegetação com 
                    "risco de se propagar e atingir residências próximas."
                    "Exemplo 2"
                    "original: pegou fogo na lareira da residencia e pegou no forro do residencia ja apagaram e ficou muita fumaça dentro da residencia"
                    "melhorada: Segundo solicitante, ocorreu um incêndio originado na lareira que se propagou para o forro da residência. Informaram que o incêndio já foi extinto, porém que há bastante fumaça no interior da residência."
                    "[AUXÍLIO/APOIOS]"
                    "Exemplo 1"
                    "original: colisão carro x moto, 2 vítimas, 1 conduzida pelo samu, 1 fora do veículo, uma com luxação no braço e ombro"
                    "melhorada: Realização de auxílio ao SAMU no atendimento de duas vítimas de colisão entre carro moto. Uma das vítimas foi atendida e conduzida pelo SAMU e a outra está consciente, orientada e fora do veículo com suspeita de luxação no braço e ombro direito."
                    "Exemplo 2"
                    "original: auxilio apoio ao samu"
                    melhorada: Realização de auxílio ao SAMU no atendimento de ocorrência.
                    [PRODUTOS PERIGOSOS]
                    Exemplo 1
                    original: vazamentode glp em cilindro p 45 com chamas
                    melhorada: Segundo solicitante, um cilindro GLP P45 está com vazamento e em chamas.
                    Exemplo 2
                    original: vazamento de gaz
                    melhorada: Segundo solicitante, está ocorrendo um vazamento de gás.
                    [SALVAMENTO / BUSCA / RESGATE]
                    Exemplo 1
                    original: vítima presa em elevador
                    melhorada: Segundo solicitante, há uma vítima presa no interior de um elevador.
                    Exemplo 2
                    original: Feminina em surto atentando com a própria vida
                    melhorada: Segundo solicitante, vítima em situação de perigo necessitando de resgate.
                    [ATENDIMENTO PRÉ-HOSPITALAR]
                    Exemplo 1
                    original: mal súbito em adulto. dores na região do peito.
                    melhorada: Segundo solicitante, um adulto apresentou mal súbito e refere dores na região do peito.
                    Exemplo 2
                    original: sincope em feminina menor
                    melhorada: Segundo solicitante, ocorreu síncope em uma feminina menor.
                    DIVERSOS
                    Exemplo 1
                    original: inspeção / teste de manutenção
                    melhorada: Realização de inspeção e teste de manutenção
                    Exemplo 2
                    original: inspeção / vistoria 
                    melhorada: Realização de atividade de vistoria de segurança contra-incêndio.
                    [ACIDENTE DE TRÂNSITO]
                    Exemplo 1
                    original: colisão caminhão e carro, vitima presa em ferragens.
                    melhorada: Segundo solicitante, houve uma colisão entre caminhão e carro e vítima encontra-se presa às ferragens.
                    Exemplo 2
                    original: atropelamento masculino - decubito dorsal, ferimento na cabeça.
                    melhorada: Segundo solicitante, um masculino foi atropelado e apresenta ferimento na cabeça, estando em decúbito dorsal.
                    [AVERIGUAÇÃO / CORTE DE ÁRVORE]
                    Exemplo 1
                    original: corte de árvore na via.
                    melhorado: Segundo solicitante, há uma árvore sobre a via.
                    Exemplo 2
                    original: averiguação de árvore.
                    melhorado: Necessita-se realizar averiguação quanto ao risco de queda de árvore.
                    [AVERIGUAÇÃO / MANEJO DE INSETOS]
                    Exemplo 1
                    original: enxame, abelha!
                    melhorado: Segundo solicitante, há um enxame de abelhas.
                    Exemplo 2
                    original: eliminação de insetos (vespas) na capela do asilo vicentino
                    melhorado: Segundo solicitante, há vespas causando risco às pessoas na Capela do Asilo Vicentino.
                    [AÇÃO PREVENTIVA SOCIAL]
                    Exemplo 1
                    original: ação preventiva festa de são joão do município
                    melhorado: Realização de ação preventiva na Festa de São João do município.
                    Exemplo 2
                    original: exposição de materiais
                    melhorado: Realização de prevenção através da exposição de materiais
                    [RISCO POTENCIAL]
                    Exemplo 1
                    original: óleo na pista
                    melhorado: Segundo solicitante, ocorreu derramamento de óleo na pista, oferecendo risco de acidentes aos que trafegam no local.
                    Exemplo 2
                    original: lavagem de pista por detridos na via
                melhorado: Segundo solicitante, necessidade de realizar a retirada de detritos da via para prevenir acidentes."`
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
        if (!chatCompletion || !chatCompletion.choices || chatCompletion.choices.length === 0) {
            throw new Error('Resposta da LLM está vazia ou inválida');
        }

        // Concatena o conteúdo da resposta
        const respostaCompleta = chatCompletion.choices[0].message.content;

        // Retorna a resposta formatada
        return { textoFormatado: respostaCompleta };

    } catch (error) {
        console.error('Erro ao processar a ocorrência:', error);
        throw new Error('Erro ao processar a ocorrência com a LLM');
    }
}

module.exports = { processarOcorrencia };
