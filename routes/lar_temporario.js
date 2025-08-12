import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { Tutor_pessoa_idTutor, Capacidade, Endereco_idEndereco } = req.body;
    const result = await pool.query(
      `INSERT INTO lar_temporario (Tutor_pessoa_idTutor, Capacidade, Endereco_idEndereco)
       VALUES ($1, $2, $3) RETURNING *`,
      [Tutor_pessoa_idTutor, Capacidade, Endereco_idEndereco]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar lar temporário' });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM lar_temporario ORDER BY idLar_temporario');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar lares temporários' });
  }
});

// READ by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM lar_temporario WHERE idLar_temporario = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lar temporário não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar lar temporário' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Tutor_pessoa_idTutor, Capacidade, Endereco_idEndereco } = req.body;
    const result = await pool.query(
      `UPDATE lar_temporario SET Tutor_pessoa_idTutor = $1, Capacidade = $2, Endereco_idEndereco = $3
       WHERE idLar_temporario = $4 RETURNING *`,
      [Tutor_pessoa_idTutor, Capacidade, Endereco_idEndereco, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lar temporário não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar lar temporário' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM lar_temporario WHERE idLar_temporario = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lar temporário não encontrado' });
    res.json({ message: 'Lar temporário deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar lar temporário' });
  }
});

export default router;
