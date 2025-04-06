const db = require('../db/connection');

// Obtener todos los clientes
exports.obtenerClientes = (req, res) => {
  db.query('SELECT * FROM clientes', (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
};

// Crear nuevo cliente
exports.crearCliente = (req, res) => {
  const { nombre, identificacion, correo, telefono } = req.body;
  const sql = 'INSERT INTO clientes (nombre, identificacion, correo, telefono) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, identificacion, correo, telefono], (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Cliente creado exitosamente', id: resultado.insertId });
  });
};

// Eliminar cliente
exports.eliminarCliente = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  });
};

// Actualizar cliente
exports.actualizarCliente = (req, res) => {
  const { id } = req.params;
  const { nombre, identificacion, correo, telefono } = req.body;
  const sql = 'UPDATE clientes SET nombre = ?, identificacion = ?, correo = ?, telefono = ? WHERE id = ?';
  db.query(sql, [nombre, identificacion, correo, telefono, id], (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Cliente actualizado correctamente' });
  });
};
