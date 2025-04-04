require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const platformRoutes = require('./routes/platformRoutes');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000', 'https://backend-games-cr0i.onrender.com'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({
    message: "Bienvenido al API de Games",
    endpoints: {
      platforms: "/api/platforms",
      games: "/api/games",
      health: "/api/health"
    }
  });
});

app.get('/', (req, res) => {
  res.send('¡Backend de Games funcionando!');
});

// Health check
app.get('/', (req, res) => {
  res.redirect('/api/health');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));