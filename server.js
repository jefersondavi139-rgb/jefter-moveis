const express = require('express');
const path = require('path');
const app = express();

// Middleware necessário para ler JSON enviado pelo site
app.use(express.json({limit: '10mb'})); 

// Banco de dados temporário na memória
let database = { items: [] };

// Rota para carregar o site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para buscar todos os itens
app.get('/api/items', (req, res) => {
    res.json(database.items);
});

// Rota para adicionar um item
app.post('/api/add', (req, res) => {
    const newItem = req.body;
    newItem.id = Date.now(); // Cria um ID único
    database.items.push(newItem);
    res.status(201).json({ message: "Produto cadastrado com sucesso!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
