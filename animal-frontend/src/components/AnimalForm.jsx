import React, { useState } from 'react';
import { createAnimal } from '../api/animal';
import './AnimalForm.css';

export default function AnimalForm({ onCreated }) {
  const [form, setForm] = useState({
    desc_animal: '',
    especie: '',
    raca: '',
    cor: '',
    status_idstatus: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await createAnimal(form);
    onCreated();
    setForm({
      desc_animal: '',
      especie: '',
      raca: '',
      cor: '',
      status_idstatus: ''
    });
  };

  return (
    <form className="animal-form" onSubmit={handleSubmit}>

      <div className="animal-form-fields">
        <div>
          <label>Descrição</label>
          <input
            name="desc_animal"
            placeholder="Ex: Luna"
            value={form.desc_animal}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Espécie</label>
          <input
            name="especie"
            placeholder="Ex: Gato"
            value={form.especie}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Raça</label>
          <input
            name="raca"
            placeholder="Ex: Siamês"
            value={form.raca}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Cor</label>
          <input
            name="cor"
            placeholder="Ex: Branco"
            value={form.cor}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Status</label>
          <input
            name="status_idstatus"
            placeholder="Ex: 1"
            value={form.status_idstatus}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="animal-form-actions">
        <button type="submit" className="btn-salvar">Adicionar Animal</button>
      </div>
    </form>
  );
}
