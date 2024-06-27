// Importa a função processarOcorrencia do serviço de LLM configurado (gemmaService neste caso)
const { processarOcorrencia } = require('../llm/gemmaService');

// Exporta a função processarOcorrencia para ser usada em outros módulos
module.exports = { processarOcorrencia };
