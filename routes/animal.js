import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Listar todos
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM animal ORDER BY idanimal');
  res.json(result.rows);
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  const result = await pool.query(
    `SELECT a.*, s.descricao_status AS descricao_status
     FROM animal a
     JOIN status s ON a.status_idstatus = s.idstatus
     WHERE a.idanimal = $1`,
    [req.params.id]
  );
  res.json(result.rows[0]);
});

// Criar
router.post('/', async (req, res) => {
  try {
    const { desc_animal, especie, raca, cor, status_idstatus } = req.body;
    const result = await pool.query(
      'INSERT INTO animal (desc_animal, especie, raca, cor, status_idstatus) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [desc_animal, especie, raca, cor, status_idstatus]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar animal:', err); // <-- Adicione este log
    res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
  }
});

// Atualizar
router.put('/:id', async (req, res) => {
  const { desc_animal, especie, raca, cor, status_idstatus } = req.body;
  const result = await pool.query(
    'UPDATE animal SET desc_animal=$1, especie=$2, raca=$3, cor=$4, status_idstatus=$5 WHERE idanimal=$6 RETURNING *',
    [desc_animal, especie, raca, cor, status_idstatus, req.params.id]
  );
  res.json(result.rows[0]);
});

// Deletar
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM animal WHERE idanimal=$1', [req.params.id]);
  res.sendStatus(204);
});

export default router;
