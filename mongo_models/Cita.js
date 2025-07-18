const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitaSchema = new Schema({
  fecha: { type: Date, required: true },
  motivo: { type: String, required: true },
  dueno: { type: Schema.Types.ObjectId, ref: 'Dueno' },
  mascota: { type: Schema.Types.ObjectId, ref: 'Mascota' },
  tratamiento: {
    type: Schema.Types.ObjectId,
    ref: 'Tratamiento',
    required: false
  },
  estado: {
    type: String,
    enum: ['programada', 'realizada', 'cancelada'],
    default: 'programada'
  },
  observaciones: { type: String }
})

module.exports = mongoose.model('Cita', CitaSchema)
