const mongoose = require('mongoose');

// IMPORTAR LA PROPIEDAD ESQUEMA DE LA BIBLIOTECA MONGOOSE
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String
});

// EXPORTAR EL ESQUEMA
module.exports = mongoose.model('user', userSchema);
