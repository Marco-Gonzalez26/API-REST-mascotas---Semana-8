require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log('No se pudo conectar a la base de datos' + err))


app.get('/api', (req, res) =>
  res.send(
    'Bienvenido a la API de Mascotas, Dueños y Tratamientos, hecha por Marco, Emily y Dayana con MongoDB'
  )
)

app.use('/api/mascotas', require('./routes/mascotas'))
app.use('/api/duenos', require('./routes/duenos'))
app.use('/api/tratamientos', require('./routes/tratamientos'))
app.use('/api/medicamentos', require('./routes/medicamentos'))
app.use('/api/citas', require('./routes/citas'))

app.listen(PORT, () => console.log(`Escuchando en el puerto:  ${PORT}`))
