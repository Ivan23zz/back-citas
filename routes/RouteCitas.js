const express = require("express");
const router = express.Router();
const  Cita  = require("../models/cita");
const Paciente = require("../models/paciente")
// Ruta para obtener todas las citas
router.get("/citas", async (req, res) => {
  try {
    const citas = await Cita.find().populate("paciente");
    res.send(citas);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



// Ruta para obtener una cita por ID
router.get("/citas/:id", async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id).populate("paciente");
    if (!cita) {
      return res.status(404).send("La cita no se ha encontrado");
    }
    res.send(cita);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta para crear una cita
router.post("/citas/create", async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.body.paciente);
    if (!paciente) {
      return res.status(400).send("El paciente no existe");
    }
    const cita = new Cita({
      titulo: req.body.titulo,
      fecha: req.body.fecha,
      hora: req.body.hora,
      paciente: paciente._id
    });
    await cita.save();
    res.send(cita);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta para actualizar una cita por ID
router.put("/citas/actualizar/:id", async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(
      req.params.id,
      {
        titulo: req.body.titulo,
        fecha: req.body.fecha,
        hora: req.body.hora
      },
      { new: true }
    );
    if (!cita) {
      return res.status(404).send("La cita no se ha encontrado");
    }
    res.send(cita);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta para eliminar una cita por ID
router.delete("/citas/eliminarCita/:id", async (req, res) => {
  try {
    const cita = await Cita.findByIdAndRemove(req.params.id);
    if (!cita) {
      return res.status(404).send("La cita no se ha encontrado");
    }
    res.send(cita);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;