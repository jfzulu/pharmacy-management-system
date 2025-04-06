const db = require('../db/connection');

// Obtener todas las notas
exports.getNotas = (req, res) => {
    db.query('SELECT * FROM notas ORDER BY fecha_creacion DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// Crear una nota
exports.createNota = (req, res) => {
    const { titulo, descripcion, color } = req.body;
    const query = 'INSERT INTO notas (titulo, descripcion, color) VALUES (?, ?, ?)';
    db.query(query, [titulo, descripcion, color], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: result.insertId, titulo, descripcion, color });
    });
};

// Eliminar nota
exports.deleteNota = (req, res) => {
    db.query('DELETE FROM notas WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
};

// Actualizar estado "realizada"
exports.updateNota = (req, res) => {
    const { realizada } = req.body;
    db.query('UPDATE notas SET realizada = ? WHERE id = ?', [realizada, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(200);
    });
};
