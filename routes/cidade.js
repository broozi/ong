import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { Nome, UF } = req.body;
    const result = await pool.query(
      'INSERT INTO cidade (Nome, UF) VALUES ($1, $2) RETURNING *',
      [Nome, UF]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar cidade' });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cidade ORDER BY idCidade');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar cidades' });
  }
});

// READ by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM cidade WHERE idCidade = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Cidade não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar cidade' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Nome, UF } = req.body;
    const result = await pool.query(
      'UPDATE cidade SET Nome = $1, UF = $2 WHERE idCidade = $3 RETURNING *',
      [Nome, UF, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Cidade não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar cidade' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM cidade WHERE idCidade = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Cidade não encontrada' });
    res.json({ message: 'Cidade deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar cidade' });
  }
});

export default router;
