const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Crear servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use( express.static('public'));

// Lectura y parseo del Body
app.use( express.json() );

// Rutas de usuarios
app.use('/api/auth', require('./routes/auth'));

// CRUD: Eventos 
app.use('/api/events', require('./routes/events'));
 
// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT } `);
});


