import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

import cargoRoutes from './routes/cargo.js';
import cidadeRoutes from './routes/cidade.js';
import enderecoRoutes from './routes/endereco.js';
import pessoaRoutes from './routes/pessoa.js';
import statusRoutes from './routes/status.js';
import animalRoutes from './routes/animal.js';
import adotanteRoutes from './routes/adotante.js';
import tutorRoutes from './routes/tutor.js';
import larTemporarioRoutes from './routes/lar_temporario.js';
import adocaoRoutes from './routes/adocao.js';
import tutoriaRoutes from './routes/tutoria.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/cargos', cargoRoutes);
app.use('/cidades', cidadeRoutes);
app.use('/enderecos', enderecoRoutes);
app.use('/pessoas', pessoaRoutes);
app.use('/status', statusRoutes);
app.use('/animais', animalRoutes);
app.use('/adotantes', adotanteRoutes);
app.use('/tutores', tutorRoutes);
app.use('/lares-temporarios', larTemporarioRoutes);
app.use('/adocoes', adocaoRoutes);
app.use('/tutorias', tutoriaRoutes);

// Rota teste
app.get('/', (req, res) => {
  res.send('API da ONG de Animais está rodando 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
