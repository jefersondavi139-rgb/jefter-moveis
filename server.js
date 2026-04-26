const express = require('express');
const path = require('path');
const app = express();

// Serve o arquivo index.html da pasta raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Adicione aqui as outras rotas (como /api/items, etc.) 
// que você vai usar para salvar os dados.

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
