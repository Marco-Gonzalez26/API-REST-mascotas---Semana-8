const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DuenoSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  email: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now },
  mascotas: [{ type: Schema.Types.ObjectId, ref: 'Mascota' }]
})

module.exports = mongoose.model('Dueno', DuenoSchema)
