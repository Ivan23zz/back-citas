const mongoose = require("mongoose");
const paciente = require('./paciente')

const citaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true
  },
  cancelado: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Cita", citaSchema);