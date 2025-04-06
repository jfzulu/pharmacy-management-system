require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión con variables de entorno
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get('/', (req, res) => {
    res.send('API Droguería funcionando con .env ✅');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


app.post('/notas', (req, res) => {
    const { titulo, descripcion, color } = req.body;
    const sql = 'INSERT INTO notas (titulo, descripcion, color) VALUES (?, ?, ?)';
    db.query(sql, [titulo, descripcion, color], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, titulo, descripcion, color });
    });
});

app.get('/notas', (req, res) => {
    db.query('SELECT * FROM notas ORDER BY fecha_creacion DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});
