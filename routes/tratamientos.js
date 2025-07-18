const express = require('express')
const router = express.Router()
const Tratamiento = require('../mongo_models/Tratamiento')
const Mascota = require('../mongo_models/Mascota')
const Medicamento = require('../mongo_models/Medicamento')

// GET - Listar tratamientos
router.get('/', async (req, res) => {
  try {
    const tratamientos = await Tratamiento.find()
      .populate('mascota')
      .populate('medicamento')
    res.status(200).json(tratamientos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET - Listar tratamiento por id
router.get('/:id', async (req, res) => {
  try {
    const tratamiento = await Tratamiento.findOne({
      _id: req.params.id
    }).populate('mascota')
    res.status(200).json(tratamiento)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST - Crear tratamiento
router.post('/', async (req, res) => {
  try {
    const { nombre, medicamento, fechaInicio, fechaFin, mascota } = req.body
    const tratamiento = new Tratamiento({
      nombre,
      medicamento,
      fechaInicio,
      fechaFin,
      mascota
    })

    try {
      const nuevoTratamiento = await tratamiento.save()
      res.status(201).json(nuevoTratamiento)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT - Actualizar tratamiento
router.put('/:id', async (req, res) => {
  try {
    const { nombre, medicamento, fechaInicio, fechaFin, mascota } = req.body
    const tratamiento = await Tratamiento.findOne({ _id: req.params.id })
    if (!tratamiento) {
      return res.status(404).json({ error: 'Tratamiento no encontrado' })
    }
    tratamiento.nombre = nombre
    tratamiento.medicamento = medicamento
    tratamiento.fechaInicio = fechaInicio
    tratamiento.fechaFin = fechaFin
    tratamiento.mascota = mascota

    try {
      const tratamientoActualizado = await tratamiento.save()
      res.status(200).json(tratamientoActualizado)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
// PUT - Cambiar estado de un tratamiento
router.put('/:id/estado', async (req, res) => {
  try {
    const tratamiento = await Tratamiento.findOne({ _id: req.params.id })
    if (!tratamiento) {
      return res.status(404).json({ error: 'Tratamiento no encontrado' })
    }
    tratamiento.estado = req.body.estado

    try {
      const tratamientoActualizado = await tratamiento.save()
      res.status(200).json(tratamientoActualizado)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE - Eliminar tratamiento
router.delete('/:id', async (req, res) => {
  try {
    const tratamiento = await Tratamiento.findOne({ _id: req.params.id })
    if (!tratamiento) {
      return res.status(404).json({ error: 'Tratamiento no encontrado' })
    }
    try {
      await tratamiento.remove()
      res.status(200).json({ message: 'Tratamiento eliminado' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
