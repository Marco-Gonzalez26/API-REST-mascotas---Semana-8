const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicamentoSchema = new Schema({
  nombre: { type: String, required: true },
  dosis: { type: Number, required: true },
  precio: { type: Number, required: true },
  fechaRegistro: { type: Date, default: Date.now },
  tipo: {
    type: String,
    enum: [
      'antibiotico',
      'analgesico',
      'antiinflamatorio',
      'antiparasitario',
      'otros'
    ]
  },
  contraindicaciones: String,
  descripcion: String,
  precio: { type: Number, required: true }
})

module.exports = mongoose.model('Medicamento', MedicamentoSchema)
