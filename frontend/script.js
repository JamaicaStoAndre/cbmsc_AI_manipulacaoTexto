document.getElementById('form-ocorrencia').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o envio do formulário de forma padrão

    // Coleta os dados do formulário
    const dadosOcorrencia = {
        telefone: document.getElementById('telefone').value,
        solicitante: document.getElementById('solicitante').value,
        ocorrencia: document.getElementById('ocorrencia').value,
        relacionadoDesastre: document.getElementById('relacionado-desastre').checked,
        descricao: document.getElementById('descricao').value
    };

    try {
        // Envia os dados para o backend
        const resposta = await fetch('http://localhost:3000/ocorrencias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosOcorrencia)
        });

        // Verifica se a resposta é bem-sucedida
        if (!resposta.ok) {
            throw new Error(`Erro ao enviar a ocorrência: ${resposta.statusText}`);
        }

        // Converte a resposta para JSON
        const dadosResposta = await resposta.json();
        console.log("Resposta recebida:", dadosResposta);

        // Exibe a resposta no frontend
        if (dadosResposta.textoFormatado) {
            document.getElementById('resposta').innerText = dadosResposta.textoFormatado;
        } else if (dadosResposta.erro) {
            document.getElementById('resposta').innerText = dadosResposta.erro;
        } else {
            document.getElementById('resposta').innerText = 'Erro desconhecido ao processar a ocorrência';
        }
    } catch (erro) {
        console.error('Erro:', erro);
        document.getElementById('resposta').innerText = `Erro ao processar a ocorrência: ${erro.message}`;
    }
});
