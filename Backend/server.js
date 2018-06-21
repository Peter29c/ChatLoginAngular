// DEPENDENCIAS
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

// require('./sockets')(io);

// ASIGNACIÓN DEL PUERTO DEL SISTEMA OPERATIVO Ó EL QUE SE INDICA
const port = process.env.PORT || 9000;

const api = require('./routes/api');

// ASIGNACIÓN DE LOS MÉTODOS DE EXPRESS A UNA CONSTANTE APP
const app = express();

const server = http.createServer(app);

// CONEXIÓN DE WEBSOCKETS
const io = socketio.listen(server);

// io.on('connection', (socket) => {
//   console.log('Nuevo usuario conectado');
// });

require('./sockets')(io);

app.use(cors());

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// RUTAS
app.get('/', (req, res) => {
  res.send('Hola desde el Servidor')
});
app.use('/api', api);

// INICIANDO EL SERVIDOR
server.listen(port, () => {
  console.log(`Chat corriendo en http://localhost:${port}`);
});
