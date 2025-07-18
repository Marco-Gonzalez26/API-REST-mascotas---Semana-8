const express = require('express')
const router = express.Router()
const Mascota = require('../mongo_models/Mascota')
const Dueno = require('../mongo_models/Dueno')

// GET - Listar mascotas
router.get('/', async (req, res) => {
  try {
    const mascotas = await Mascota.find().populate('dueno')
    res.status(200).json(mascotas)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET - Listar mascota por id

router.get('/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findOne({ _id: req.params.id }).populate(
      'dueno'
    )
    res.status(200).json(mascota)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST - Crear mascota
router.post('/', async (req, res) => {
  try {
    const { nombre, color, raza, especie, peso, edad, sexo } = req.body
    const dueno = await Dueno.findOne({ _id: req.body.dueno })
    if (!dueno) {
      return res
        .status(404)
        .json({ error: 'Dueño no encontrado, por favor crear uno antes' })
    }
    const mascota = new Mascota({
      nombre,
      color,
      raza,
      especie,
      peso,
      edad,
      sexo,
      dueno
    })

    try {
      const nuevaMascota = await mascota.save()
      dueno.mascotas.push(nuevaMascota._id)
      await dueno.save()
      res.status(201).json(nuevaMascota)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT - Actualizar mascota
router.put('/:id', async (req, res) => {
  try {
    const { nombre, color, raza, especie, peso, edad, sexo } = req.body
    const mascota = await Mascota.findOne({ _id: req.params.id })
    if (!mascota) {
      return res.status(404).json({ error: 'Mascota no encontrada' })
    }
    mascota.nombre = nombre
    mascota.color = color
    mascota.raza = raza
    mascota.especie = especie
    mascota.peso = peso
    mascota.edad = edad
    mascota.sexo = sexo

    try {
      const mascotaActualizada = await mascota.save()
      res.status(200).json(mascotaActualizada)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE - Eliminar mascota
router.delete('/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findOne({ _id: req.params.id })
    if (!mascota) {
      return res.status(404).json({ error: 'Mascota no encontrada' })
    }
    try {
      await mascota.deleteOne()
      res.status(200).json({ message: 'Mascota eliminada' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
