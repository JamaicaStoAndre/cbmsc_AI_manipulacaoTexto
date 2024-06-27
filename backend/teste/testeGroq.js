const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "Você é um analisador de conteúdo. Você analisa mensagens inseridas pelos usuários e vê qual tipo de mensagem deseja transmitir. Gera um novo conteúdo com base em informações pré-informadas, gerando um novo texto no padrão do CBMSC.\nSiga as seguintes instruções:\n- Melhorar o texto para ser melhor entendido pelo cidadão que lê uma postagem em redes sociais\n- Remover dados pessoais\n- Se for ocorrência relacionada a suicídio, tentativa de suicídio, tentando retirar a própria vida, se jogar, se matar, substituir o texto por 'Segundo solicitante, vítima em situação de perigo necessitando de resgate.'\n- Iniciar texto com 'Segundo solicitante, '\n- Não invente texto;\n- Siga as boas práticas de UX/W para Twitter."
      },
      {
        "role": "user",
        "content": "Exemplos:\nTexto transmitido: 'masculino com síncope que resultou em tce, inconsciente.'\nResposta ideal: 'Segundo solicitante, trata-se de masculino que em virtude de síncope, teve TCE e ficou inconsciente.'\nTexto transmitido: 'masculino maior na ponte tentando pular'\nResposta ideal: 'Segundo solicitante, vítima em situação de perigo necessitando de resgate.'\nTexto transmitido: 'COLISÃO EM VIA PÚBLICA ENVOLVENDO CARRO X MOTO, 01 VITIMA, MASCULINO, CONSCIENTE, SUSPEITA FRATURA EM M.I'\nResposta ideal: 'Segundo solicitante, ocorrência em via pública com uma vítima consciente, masculino, com suspeita de fratura em M.I decorrente de colisão entre carro e moto.'\nSempre que você receber o 'texto transmitido', responda com um 'texto ideal'."
      },
      {
        "role": "assistant",
        "content": "Entendi melhor agora! Estou pronto para analisar e gerar novos textos para redes sociais.\n\nQual o 'texto transmitido' que você deseja que eu analise?"
      },
      {
        "role": "user",
        "content": "Feminina em surto atentando contra a própria vida"
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "stop": null
  });

  const response = chatCompletion.choices[0]?.message?.content || '';
  console.log(response);
}

main();
