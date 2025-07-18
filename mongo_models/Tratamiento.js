const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TratamientoSchema = new Schema({
  nombre: { type: String, required: true },
  medicamento: { type: Schema.Types.ObjectId, ref: 'Medicamento' },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },

  mascota: { type: Schema.Types.ObjectId, ref: 'Mascota' }
})

module.exports = mongoose.model('Tratamiento', TratamientoSchema)
