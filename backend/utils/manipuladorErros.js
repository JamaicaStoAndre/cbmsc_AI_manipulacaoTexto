// Função para lidar com erros
function manipuladorErros(err, req, res, next) {
    console.error(err.message); // Loga o erro no console
    res.status(500).json({ erro: err.message }); // Retorna uma resposta de erro ao cliente
}

module.exports = manipuladorErros;
