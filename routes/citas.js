const express = require('express')
const router = express.Router()
const Cita = require('../mongo_models/Cita')
const Mascota = require('../mongo_models/Mascota')

// GET - Listar citas
router.get('/', async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('dueno')
      .populate('mascota')
      .populate('tratamiento')
    res.status(200).json(citas)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET - Listar cita por id
router.get('/:id', async (req, res) => {
  try {
    const cita = await Cita.findOne({ _id: req.params.id }).populate('dueno')
    res.status(200).json(cita)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST - Crear cita
router.post('/', async (req, res) => {
  try {
    const { fecha, motivo, dueno, mascota, tratamiento } = req.body
    const cita = new Cita({
      fecha,
      motivo,
      dueno,
      mascota,
      tratamiento
    })

    try {
      const nuevaCita = await cita.save()
      res.status(201).json(nuevaCita)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT - Actualizar cita
router.put('/:id', async (req, res) => {
  try {
    const { fecha, motivo, dueno, mascota, tratamiento } = req.body
    const cita = await Cita.findOne({ _id: req.params.id })
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' })
    }
    cita.fecha = fecha
    cita.motivo = motivo
    cita.dueno = dueno
    cita.mascota = mascota
    cita.tratamiento = tratamiento

    try {
      const citaActualizada = await cita.save()
      res.status(200).json(citaActualizada)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE - Eliminar cita
router.delete('/:id', async (req, res) => {
  try {
    const cita = await Cita.findOne({ _id: req.params.id })
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' })
    }
    try {
      await cita.deleteOne()
      res.status(200).json({ message: 'Cita eliminada' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
