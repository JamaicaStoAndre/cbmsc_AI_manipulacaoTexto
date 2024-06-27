# Sistema de Atendimento de Emergências

## Descrição

Este projeto é um sistema de atendimento de emergências que permite o registro e a formatação de ocorrências em formato de tweets. Utiliza um backend em Node.js para processar as ocorrências com a ajuda de modelos de linguagem (LLMs).

## Estrutura de Arquivos

# Sistema de Atendimento de Emergências

## Descrição

Este projeto é um sistema de atendimento de emergências que permite o registro e a formatação de ocorrências em formato de tweets. Utiliza um backend em Node.js para processar as ocorrências com a ajuda de modelos de linguagem (LLMs).

## Estrutura de Arquivos

```plaintext
cobomAi/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── backend/
│   ├── app.js
│   ├── rotas/
│   │   └── ocorrencia.js
│   ├── servicos/
│   │   └── aiServico.js
│   ├── llm/
│   │   ├── groqService.js
│   │   └── gemmaService.js
│   └── utils/
│       └── manipuladorErros.js
├── .env
├── .gitignore
└── README.md 
```



## Funcionalidade dos Arquivos

### Frontend

**script.js**: Gerencia a interação do usuário com o formulário e envia os dados para o backend. Captura os dados do formulário de ocorrência, envia uma requisição POST ao backend, e exibe a resposta formatada.

### Backend

- **app.js**: Configura o servidor Express, middleware e rotas. Inicia o servidor na porta especificada e define middlewares para lidar com CORS e parsing de JSON.

- **rotas/ocorrencia.js**: Define a rota para a criação de ocorrências. Recebe os dados do frontend, verifica se a descrição está presente, chama o serviço de AI para processar a ocorrência e retorna a resposta ao frontend.

- **servicos/aiServico.js**: Processa a ocorrência usando uma LLM. Importa e usa o serviço LLM configurado (groqService ou gemmaService) para gerar uma resposta formatada.

- **llm/groqService.js**: Usa a API do Groq para processar a ocorrência e retornar a resposta formatada. Define a função `processarOcorrencia` que envia os dados para a API Groq e retorna a resposta.

- **llm/gemmaService.js**: Usa a API do Gemma para processar a ocorrência e retornar a resposta formatada. Similar ao groqService, define a função `processarOcorrencia`.

- **utils/manipuladorErros.js**: Middleware para tratamento de erros. Captura erros e envia respostas JSON com mensagens de erro.

## Requisitos

Crie um arquivo `requirements.txt` para listar as dependências necessárias:

```text
express
body-parser
cors
dotenv
groq-sdk
```

### Clone o repositório:

git clone <URL_DO_REPOSITORIO>

## Navegue até o diretório clonado
cd cobomAi

- Instale as dependências do backend:
- cd backend
- npm install
- Configure as variáveis de ambiente:

### Crie um arquivo .env na pasta backend com o seguinte conteúdo:

- .env: com o seguinte código:

GROQ_API_KEY=sua_chave_de_api_sem_aspas

PORTA=3000

### Inicie o servidor backend:

node app.js

### Teste a aplicação

### API Groq
 - Acesse https://console.groq.com/keys
 - faça seu cadastro e crie uma chave api
 - altere a chave api no arquivo **.env**
