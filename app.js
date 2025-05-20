const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] - ${req.method} ${req.url}`);
  next();
});


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


app.use((err, req, res, next) => {
  console.error(` Error detectado: ${err.message}`);
  res.status(err.status || 500).json({ mensaje: 'Algo salió mal. Intenta nuevamente.' });
});


app.use((req, res) => {
  res.status(404).json({ mensaje: 'Oops! Parece que esta ruta no existe.' });
});


const connectDB = require('./config/db.js');
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(` Servidor activo en el puerto ${PORT}. ¡Listo para recibir solicitudes!`));
  })
  .catch(err => {
    console.error(` Error al iniciar el servidor: ${err.message}`);
    process.exit(1);
  });

module.exports = app;
