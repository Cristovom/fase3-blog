const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// ⬇️ CORS vem antes das rotas
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.use(express.json());

// Rotas (padrão 1: seu postRoutes já contém '/posts' internamente)
app.use('/auth', authRoutes);
app.use('/', postRoutes);
app.use('/', userRoutes);

// Handler global de erro (mantenha por último)
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('✅ Conectado ao MongoDB!');
  app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
}).catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));
