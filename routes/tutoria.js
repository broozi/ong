import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { Lar_idLar_temporario, Tutor_pessoa_idTutor, Animal_idAnimal, Data_retirada, Data_fim, Observacao } = req.body;
    const result = await pool.query(
      `INSERT INTO tutoria (Lar_idLar_temporario, Tutor_pessoa_idTutor, Animal_idAnimal, Data_retirada, Data_fim, Observacao)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [Lar_idLar_temporario, Tutor_pessoa_idTutor, Animal_idAnimal, Data_retirada, Data_fim, Observacao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar tutoria' });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tutoria');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar tutorias' });
  }
});

// READ by composite key (all 3 parts)
router.get('/:Lar_id/:Tutor_id/:Animal_id', async (req, res) => {
  try {
    const { Lar_id, Tutor_id, Animal_id } = req.params;
    const result = await pool.query(
      `SELECT * FROM tutoria WHERE Lar_idLar_temporario = $1 AND Tutor_pessoa_idTutor = $2 AND Animal_idAnimal = $3`,
      [Lar_id, Tutor_id, Animal_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Tutoria não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar tutoria' });
  }
});

// UPDATE by composite key
router.put('/:Lar_id/:Tutor_id/:Animal_id', async (req, res) => {
  try {
    const { Lar_id, Tutor_id, Animal_id } = req.params;
    const { Data_retirada, Data_fim, Observacao } = req.body;
    const result = await pool.query(
      `UPDATE tutoria SET Data_retirada = $1, Data_fim = $2, Observacao = $3
       WHERE Lar_idLar_temporario = $4 AND Tutor_pessoa_idTutor = $5 AND Animal_idAnimal = $6 RETURNING *`,
      [Data_retirada, Data_fim, Observacao, Lar_id, Tutor_id, Animal_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Tutoria não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar tutoria' });
  }
});

// DELETE by composite key
router.delete('/:Lar_id/:Tutor_id/:Animal_id', async (req, res) => {
  try {
    const { Lar_id, Tutor_id, Animal_id } = req.params;
    const result = await pool.query(
      `DELETE FROM tutoria WHERE Lar_idLar_temporario = $1 AND Tutor_pessoa_idTutor = $2 AND Animal_idAnimal = $3 RETURNING *`,
      [Lar_id, Tutor_id, Animal_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Tutoria não encontrada' });
    res.json({ message: 'Tutoria deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar tutoria' });
  }
});

export default router;
