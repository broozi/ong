import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { Descricao_status } = req.body;
    const result = await pool.query(
      'INSERT INTO status (Descricao_status) VALUES ($1) RETURNING *',
      [Descricao_status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar status' });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM status ORDER BY idStatus');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar status' });
  }
});

// READ by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM status WHERE idStatus = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Status não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar status' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Descricao_status } = req.body;
    const result = await pool.query(
      'UPDATE status SET Descricao_status = $1 WHERE idStatus = $2 RETURNING *',
      [Descricao_status, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Status não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM status WHERE idStatus = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Status não encontrado' });
    res.json({ message: 'Status deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar status' });
  }
});

export default router;
