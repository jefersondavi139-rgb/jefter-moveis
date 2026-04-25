const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./jefter_moveis.db');

// Cria tabela se não existir
db.run("CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, nome TEXT, preco TEXT, cat TEXT, img TEXT)");

// Rota para salvar produtos
app.post('/api/produtos', (req, res) => {
    const { nome, preco, cat, img } = req.body;
    db.run("INSERT INTO produtos (nome, preco, cat, img) VALUES (?, ?, ?, ?)", [nome, preco, cat, img], function(err) {
        if (err) return res.status(500).send(err.message);
        res.json({ id: this.lastID });
    });
});

// Rota para buscar produtos
app.get('/api/produtos', (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
