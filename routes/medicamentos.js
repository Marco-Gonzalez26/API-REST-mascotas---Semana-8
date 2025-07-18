const express = require('express')
const router = express.Router()
const Medicamento = require('../mongo_models/Medicamento')
const Mascota = require('../mongo_models/Mascota')

// GET - Listar medicamentos
router.get('/', async (req, res) => {
  try {
    const medicamentos = await Medicamento.find()
      .populate('dueno')
      .populate('tratamiento')
    res.status(200).json(medicamentos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET - Listar medicamento por id
router.get('/:id', async (req, res) => {
  try {
    const medicamento = await Medicamento.findOne({
      _id: req.params.id
    }).populate('dueno')
    res.status(200).json(medicamento)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST - Crear medicamento
router.post('/', async (req, res) => {
  try {
    const {
      nombre,
      dosis,
      precio,
      tipo,
      contraindicaciones,
      descripcion,
      fechaRegistro
    } = req.body
    const medicamento = new Medicamento({
      nombre,
      dosis,
      precio,
      tipo,
      contraindicaciones,
      descripcion,
      fechaRegistro
    })

    try {
      const nuevoMedicamento = await medicamento.save()
      res.status(201).json(nuevoMedicamento)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT - Actualizar medicamento
router.put('/:id', async (req, res) => {
  try {
    const {
      nombre,
      dosis,
      precio,
      tipo,
      contraindicaciones,
      descripcion,
      fechaRegistro
    } = req.body
    const medicamento = await Medicamento.findOne({ _id: req.params.id })
    if (!medicamento) {
      return res.status(404).json({ error: 'Medicamento no encontrado' })
    }
    medicamento.nombre = nombre
    medicamento.dosis = dosis
    medicamento.precio = precio
    medicamento.tipo = tipo
    medicamento.contraindicaciones = contraindicaciones
    medicamento.descripcion = descripcion
    medicamento.fechaRegistro = fechaRegistro

    try {
      const medicamentoActualizado = await medicamento.save()
      res.status(200).json(medicamentoActualizado)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE - Eliminar medicamento
router.delete('/:id', async (req, res) => {
  try {
    const medicamento = await Medicamento.findOne({ _id: req.params.id })
    if (!medicamento) {
      return res.status(404).json({ error: 'Medicamento no encontrado' })
    }
    try {
      await medicamento.deleteOne()
      res.status(200).json({ message: 'Medicamento eliminado' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
