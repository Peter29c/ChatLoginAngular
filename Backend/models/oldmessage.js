const mongoose = require('mongoose');

// IMPORTAR LA PROPIEDAD ESQUEMA DE LA BIBLIOTECA MONGOOSE
const { Schema } = mongoose;

const oldmessageSchema = new Schema({
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// EXPORTAR EL ESQUEMA
module.exports = mongoose.model('oldmessage', oldmessageSchema);
