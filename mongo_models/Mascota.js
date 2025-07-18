const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MascotaSchema = new Schema({
  nombre: { type: String, required: true },
  color: { type: String, required: true },
  raza: { type: String, required: true },
  especie: { type: String, required: true },
  peso: { type: Number, required: true },
  edad: { type: Number, required: true },
  sexo: { type: String, required: true },

  fechaRegistro: { type: Date, default: Date.now },

  dueno: { type: Schema.Types.ObjectId, ref: 'Dueno' },
  tratamientos: [{ type: Schema.Types.ObjectId, ref: 'Tratamiento' }]
})

module.exports = mongoose.model('Mascota', MascotaSchema)
