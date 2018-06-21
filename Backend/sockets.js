// IMPORTAR EL MODELO DE MENSAJES
const oldmessage = require('./models/oldmessage');

module.exports = function (io) {

  let users = [];

  // QUEDAR ESCUCHANDO CUANDO HAY NUEVA CONEXIÓN DE SOCKETS
  io.on('connection', async (socket) => {

    // CUANDO LA HAYA MOSTRAR MENSAJE
    console.log('Nuevo usuario conectado');

    // ENVIAR LOS MENSAJES ANTERIORES AL USUARIO
    let oldmessages = await oldmessage.find({}).sort( {createdAt: -1} ).limit(5);
    socket.emit('load old msgs', oldmessages);
    // console.log(oldmessages);

    // RECIBIR NUEVOS MENSAJES DE LOS CLIENTES
    socket.on('new message', async (message) => {
      // ASIGNAR A UNA VARIABLE DEL MODELO LOS MENSAJES QUE LLEGAN
      var newMsg = new oldmessage({
        email: message.email,
        message: message.message
      });
      // EJECUTAR EL MÉTODO ASINCRONAMENTE PARA GUARDARLO EN LA BD
      await newMsg.save();
      // console.log(message);
      // RETRANSMITIR LOS MENSAJES A TODOS LOS USUARIOS
      io.emit('new message', message);
    });

    // RECIBIR LOS NUEVOS USUARIOS
    socket.on('new user', (user) => {
      // SI EL USUARIO NO ESTÁ EN EL ARREGLO, LO AGREGA
      if (!users.includes(user)) {
        socket.user = user;
        // console.log(socket.user);
        users.push(socket.user);
      }
      // console.log(users);
      // RETRANSMITIR EL ARREGLO DE USUARIOS A TODOS LOS USUARIOS
      updateUserlist();
    });

    // ACTUALIZAR LA LISTA DE USUARIOS CUANDO UNO SE DESCONECTA
    socket.on('disconnect', (data) => {
      // users.pop(socket.user);
      console.log(socket.user + ' se ha desconectado');
      users.splice(users.indexOf(socket.user), 1);
      // console.log(users);
      updateUserlist();
    });

    // MANDAR A LOS USUARIO LA LISTA DE USUARIO CONECTADOS
    function updateUserlist() {
      io.sockets.emit('userlist', users);
    }

  });

}
