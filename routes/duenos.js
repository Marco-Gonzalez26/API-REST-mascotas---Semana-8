const express = require('express')
const router = express.Router()
const Dueno = require('../mongo_models/Dueno')
const Mascota = require('../mongo_models/Mascota')

// GET - Listar dueños
router.get('/', async (req, res) => {
  try {
    const duenos = await Dueno.find().populate('mascotas')
    res.status(200).json(duenos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET - Listar dueño por id
router.get('/:id', async (req, res) => {
  try {
    const dueno = await Dueno.findOne({ _id: req.params.id }).populate(
      'mascotas'
    )
    res.status(200).json(dueno)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST - Crear dueño
router.post('/', async (req, res) => {
  try {
    const { nombre, apellido, telefono, direccion, email } = req.body
    const mascotas = req.body.mascotas
    const dueno = new Dueno({
      nombre,
      apellido,
      telefono,
      direccion,
      email,
      mascotas
    })

    try {
      const duenoNuevo = await dueno.save()
      res.status(201).json(duenoNuevo)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT - Actualizar dueño
router.put('/:id', async (req, res) => {
  try {
    const { nombre, apellido, telefono, direccion, email } = req.body
    const dueno = await Dueno.findOne({ _id: req.params.id })
    if (!dueno) {
      return res.status(404).json({ error: 'Dueño no encontrado' })
    }
    dueno.nombre = nombre
    dueno.apellido = apellido
    dueno.telefono = telefono
    dueno.direccion = direccion
    dueno.email = email

    try {
      const duenoActualizado = await dueno.save()
      res.status(200).json(duenoActualizado)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE - Eliminar dueño
router.delete('/:id', async (req, res) => {
  try {
    const dueno = await Dueno.findOne({ _id: req.params.id })
    if (!dueno) {
      return res.status(404).json({ error: 'Dueño no encontrado' })
    }
    try {
      await dueno.remove()
      res.status(200).json({ message: 'Dueño eliminado' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
