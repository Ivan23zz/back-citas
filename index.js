const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./database/mongodb').connect();

const app = express();


// Configuración de middleware
app.use(bodyParser.json());
app.use(cors());

// Importar rutas
const pacientesRouter = require('./routes/RoutePacientes');
const citasRouter = require('./routes/RouteCitas');

// Configurar rutas
app.use('/api', pacientesRouter);
app.use('/api', citasRouter);

// Escuchar puerto
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

