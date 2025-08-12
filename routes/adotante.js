import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { pessoa_idPessoa } = req.body;
    const result = await pool.query(
      'INSERT INTO adotante (pessoa_idPessoa) VALUES ($1) RETURNING *',
      [pessoa_idPessoa]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar adotante' });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM adotante ORDER BY idAdotante');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar adotantes' });
  }
});

// READ by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM adotante WHERE idAdotante = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Adotante não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar adotante' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { pessoa_idPessoa } = req.body;
    const result = await pool.query(
      'UPDATE adotante SET pessoa_idPessoa = $1 WHERE idAdotante = $2 RETURNING *',
      [pessoa_idPessoa, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Adotante não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar adotante' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM adotante WHERE idAdotante = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Adotante não encontrado' });
    res.json({ message: 'Adotante deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar adotante' });
  }
});

export default router;
