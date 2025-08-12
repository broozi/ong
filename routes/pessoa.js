import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { nome, Data_Nascimento, CPF, Sexo, Telefone_celular, Endereco_idEndereco, Cargo_idCargo } = req.body;
    const result = await pool.query(
      `INSERT INTO pessoa (nome, Data_Nascimento, CPF, Sexo, Telefone_celular, Endereco_idEndereco, Cargo_idCargo)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nome, Data_Nascimento, CPF, Sexo, Telefone_celular, Endereco_idEndereco, Cargo_idCargo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(400).json({ error: 'CPF já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar pessoa' });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pessoa ORDER BY idPessoa');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pessoas' });
  }
});

// READ by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM pessoa WHERE idPessoa = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pessoa não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pessoa' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, Data_Nascimento, CPF, Sexo, Telefone_celular, Endereco_idEndereco, Cargo_idCargo } = req.body;
    const result = await pool.query(
      `UPDATE pessoa SET nome = $1, Data_Nascimento = $2, CPF = $3, Sexo = $4, Telefone_celular = $5, Endereco_idEndereco = $6, Cargo_idCargo = $7
       WHERE idPessoa = $8 RETURNING *`,
      [nome, Data_Nascimento, CPF, Sexo, Telefone_celular, Endereco_idEndereco, Cargo_idCargo, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pessoa não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(400).json({ error: 'CPF já existe' });
    }
    res.status(500).json({ error: 'Erro ao atualizar pessoa' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM pessoa WHERE idPessoa = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pessoa não encontrada' });
    res.json({ message: 'Pessoa deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar pessoa' });
  }
});

export default router;
