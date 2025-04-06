require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const notasRoutes = require('./routes/notas');
app.use('/api/notas', notasRoutes);
const clienteRoutes = require('./routes/cliente');
app.use(express.json());
app.use('/api/clientes', clienteRoutes);


// Inicio
app.get('/', (req, res) => {
    res.send('API Droguería funcionando ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
