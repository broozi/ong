import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { Logradouro, Numero, Complemento, Bairro, Cidade_idCidade } = req.body;
    const result = await pool.query(
      `INSERT INTO endereco (Logradouro, Numero, Complemento, Bairro, Cidade_idCidade)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [Logradouro, Numero, Complemento, Bairro, Cidade_idCidade]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar endereco' });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM endereco ORDER BY idEndereco');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar endereços' });
  }
});

// READ by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM endereco WHERE idEndereco = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Endereço não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar endereço' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Logradouro, Numero, Complemento, Bairro, Cidade_idCidade } = req.body;
    const result = await pool.query(
      `UPDATE endereco SET Logradouro = $1, Numero = $2, Complemento = $3, Bairro = $4, Cidade_idCidade = $5
       WHERE idEndereco = $6 RETURNING *`,
      [Logradouro, Numero, Complemento, Bairro, Cidade_idCidade, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Endereço não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar endereço' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM endereco WHERE idEndereco = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Endereço não encontrado' });
    res.json({ message: 'Endereço deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar endereço' });
  }
});

export default router;
