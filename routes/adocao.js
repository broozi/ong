import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { dataAdoacao, Dt_devolucao, motivo_devolucao, Animal_idAnimal, Adotante_pessoa_idPessoa } = req.body;
    const result = await pool.query(
      `INSERT INTO adocao (dataAdoacao, Dt_devolucao, motivo_devolucao, Animal_idAnimal, Adotante_pessoa_idPessoa)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [dataAdoacao, Dt_devolucao, motivo_devolucao, Animal_idAnimal, Adotante_pessoa_idPessoa]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar adoção' });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM adocao ORDER BY idAdoacao');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar adoções' });
  }
});

// READ by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM adocao WHERE idAdoacao = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Adoção não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar adoção' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { dataAdoacao, Dt_devolucao, motivo_devolucao, Animal_idAnimal, Adotante_pessoa_idPessoa } = req.body;
    const result = await pool.query(
      `UPDATE adocao SET dataAdoacao = $1, Dt_devolucao = $2, motivo_devolucao = $3, Animal_idAnimal = $4, Adotante_pessoa_idPessoa = $5
       WHERE idAdoacao = $6 RETURNING *`,
      [dataAdoacao, Dt_devolucao, motivo_devolucao, Animal_idAnimal, Adotante_pessoa_idPessoa, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Adoção não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar adoção' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM adocao WHERE idAdoacao = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Adoção não encontrada' });
    res.json({ message: 'Adoção deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar adoção' });
  }
});

export default router;
