const mongoose = require("mongoose");
const pacienteSchema = new mongoose.Schema({
  CI: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Paciente", pacienteSchema);