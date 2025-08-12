import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE cargo
router.post('/', async (req, res) => {
  try {
    const { descricao_cargo } = req.body;
    console.log(req.body);
    const result = await pool.query(
      'INSERT INTO cargo (descricao_cargo) VALUES ($1) RETURNING *',
      [descricao_cargo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar cargo' });
  }
});

// READ all cargos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cargo ORDER BY idCargo');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar cargos' });
  }
});

// READ one cargo by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM cargo WHERE idCargo = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cargo não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar cargo' });
  }
});

// UPDATE cargo by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Descricao_Cargo } = req.body;
    const result = await pool.query(
      'UPDATE cargo SET Descricao_Cargo = $1 WHERE idCargo = $2 RETURNING *',
      [Descricao_Cargo, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cargo não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar cargo' });
  }
});

// DELETE cargo by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM cargo WHERE idCargo = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cargo não encontrado' });
    }
    res.json({ message: 'Cargo deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar cargo' });
  }
});

export default router;
