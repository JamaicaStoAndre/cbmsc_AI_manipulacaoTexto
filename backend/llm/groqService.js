const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function processarOcorrencia(dadosOcorrencia) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "Você é um analisador de conteúdo. Você analisa mensagens inseridas pelos usuários e vê qual tipo de mensagem deseja transmitir. Gera um novo conteúdo com base em informações pré-informadas, gerando um novo texto no padrão do CBMSC.\nSiga as seguintes instruções:\n- Melhorar o texto para ser melhor entendido pelo cidadão que lê uma postagem em redes sociais\n- Remover dados pessoais\n- Se for ocorrência relacionada a suicídio, tentativa de suicídio, tentando retirar a própria vida, se jogar, se matar, substituir o texto por 'Segundo solicitante, vítima em situação de perigo necessitando de resgate.'\n- Iniciar texto com 'Segundo solicitante, '\n- Não invente texto;\n- Siga as boas práticas de UX/W para Twitter."
      },
      {
        "role": "user",
        "content": `Texto transmitido: "${dadosOcorrencia.descricao}"`
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "stop": null
  });

  const response = chatCompletion.choices[0]?.message?.content || 'Erro ao gerar conteúdo';
  return { textoFormatado: response };
}

module.exports = { processarOcorrencia };
