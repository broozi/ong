import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { pessoa_idTutor, Disponibilidade } = req.body;
    const result = await pool.query(
      'INSERT INTO tutor (pessoa_idTutor, Disponibilidade) VALUES ($1, $2) RETURNING *',
      [pessoa_idTutor, Disponibilidade]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar tutor' });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tutor ORDER BY pessoa_idTutor');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar tutores' });
  }
});

// READ by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tutor WHERE pessoa_idTutor = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Tutor não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar tutor' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Disponibilidade } = req.body;
    const result = await pool.query(
      'UPDATE tutor SET Disponibilidade = $1 WHERE pessoa_idTutor = $2 RETURNING *',
      [Disponibilidade, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Tutor não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar tutor' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tutor WHERE pessoa_idTutor = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Tutor não encontrado' });
    res.json({ message: 'Tutor deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar tutor' });
  }
});

export default router;
