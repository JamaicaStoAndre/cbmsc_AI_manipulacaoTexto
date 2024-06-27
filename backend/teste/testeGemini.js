const { GoogleGenerativeAI } = require("@google/generative-ai");

// Acessa sua chave de API como uma variável de ambiente (ver "Configurar sua chave de API" acima)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // Os modelos Gemini 1.5 são versáteis e funcionam com prompts apenas de texto e multimodais
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
