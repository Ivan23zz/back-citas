const express = require("express");
const Paciente = require("../models/paciente");
const Cita = require("../models/cita")
const router = express.Router();

// Crear paciente
router.post("/create/paciente", async (req, res) => {
try {
const paciente = new Paciente(req.body);
await paciente.save();
res.status(201).send(paciente);
} catch (error) {
res.status(400).send(error);
}
});

// Obtener todos los pacientes
router.get("/pacientes", async (req, res) => {
try {
const pacientes = await Paciente.find({});
res.send(pacientes);
} catch (error) {
res.status(500).send(error);
}
});

// Obtener paciente por ID
router.get("/pacientes/:id", async (req, res) => {
try {
const paciente = await Paciente.findById(req.params.id);
if (!paciente) {
return res.status(404).send();
}
res.send(paciente);
} catch (error) {
res.status(500).send(error);
}
});

// Actualizar paciente por ID
router.patch("/pacientes/:id", async (req, res) => {
const actualizaciones = Object.keys(req.body);
const actualizacionesPermitidas = 
[
    "CI", 
    "nombre", 
    "apellido", 
    "telefono", 
    "direccion", 
    "edad"
];
const esOperacionValida = actualizaciones.every((actualizacion) => actualizacionesPermitidas.includes(actualizacion));
if (!esOperacionValida) {
return res.status(400).send({ error: "Actualización no permitida" });
}
try {
const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
if (!paciente) {
return res.status(404).send();
}
res.send(paciente);
} catch (error) {
res.status(400).send(error);
}
});

// Eliminar paciente por ID
router.delete("/pacientes/delete/:id", async (req, res) => {
try {
const paciente = await Paciente.findByIdAndDelete(req.params.id);
if (!paciente) {
return res.status(404).send();
}
res.send(paciente);
} catch (error) {
res.status(500).send(error);
}
});

module.exports = router;