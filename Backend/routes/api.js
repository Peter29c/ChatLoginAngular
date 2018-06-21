const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// CONEXIÓN CON LA BASE DE DATOS
const db = "mongodb://localhost/chat-login-angular-database";
mongoose.connect(db)
  .then(db => console.log('Base de datos conectada'))
  .catch(err => console.log('Error:' + err));

// VERIFICAR EL TOKEN
function verifyToken(req, res, next) {
  if (!req.headers.authorization) { // SI NO EXISTE LA LLAVE DE AUTORIZACIÓN
    return res.status(401).send('Unauthorized request');
    // console.log('No hay autorización');
  }
  else { // SI EXISTE
    let token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    if (token === 'null') { // SI ES NULL
      return res.status(401).send('Unauthorized request');
      // console.log('Token nulo');
    }
    //SI EXISTE Y NO ES NULL
    let payload = jwt.verify(token, 'secretKey');
    // console.log(payload);
    if (!payload) {
      return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
  }
}

// RUTAS

// PRINCIPAL DE LA API
router.get('/', (req, res) => {
  res.send('Desde la ruta API');
});

// REGISTRO
router.post('/register', (req, res) => {
  let userData = req.body;

  // ENCRIPTAR LA CONTRASEÑA QUE LLEGA Y GUARDARLA
  var hashedPassword = bcrypt.hashSync(userData.password, 8);

  let user = new User({
    email: userData.email,
    password: hashedPassword
  });

  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      if (user) { // SI EL USUARIO YA EXISTE EN LA BASE DE DATOS
        res.status(401).send('Ese usuario ya existe.');
      }
      else { // SI NO EXISTE, LO GUARDA
        user.save((err, registeredUser) => {
          if (err) {
            console.log(err);
          }
          else {
            // CREACIÓN DEL TOKEN PARA EL USUARIO QUE SE GUARDÓ
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey');
            let email = userData.email;
            res.status(200).send({token, email});
            // res.status(200).send(registeredUser);
          }
        });
      }
    }
  });
//   console.log(req.body);
//   res.status(200).send({message: 'Usuario recibido'});
});

// LOGIN
router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      if (!user) { // SI EL USUARIO NO EXISTE
        res.status(401).send('Ese usuario no existe.');
      }
      else { // SI EXISTE

        // ENCRIPTAR LA CONTRASEÑA Y COMPARARLA CON LA GUARDADA EN BASE DE DATOS
        var passwordIsValid = bcrypt.compareSync(userData.password, user.password);
        // console.log(passwordIsValid);

        if ( !passwordIsValid ) { // CONTRASEÑA NO COINCIDE
          res.status(401).send('Contraseña equivocada');
        }
        else { // CONTRASEÑA COINCIDE
          // CREACIÓN DEL TOKEN PARA EL USUARIO QUE SE AUTENTIFICA
          let payload = { subject: user._id };
          let token = jwt.sign(payload, 'secretKey');
          let email = userData.email;
          res.status(200).send(
            {
              token:token,
              email:email
            }
          );
          // res.status(200).send(user);
        }
      }
    }
  });
});

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ];

  res.json(events);
});

router.get('/chat', verifyToken, (req, res) => {
  let msgs = [
    {
      "name": "Peter",
      "msg": "ola ke ase?"
    },
    {
      "name": "Peter",
      "msg": "Pruebas o ke ase?"
    },
    {
      "name": "Cech",
      "msg": "Simon"
    }
  ];

  res.json(msgs);
});

router.get('/special', verifyToken, (req, res) => {
  let special = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ];

  res.json(special);
});

module.exports = router;
