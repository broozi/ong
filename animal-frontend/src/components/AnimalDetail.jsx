import React, { useEffect, useState } from 'react';
import { getAnimal, updateAnimal } from '../api/animal';
import './AnimalDetail.css';

export default function AnimalDetail({ id, onUpdated, onClose }) {
  const [animal, setAnimal] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    desc_animal: '',
    especie: '',
    raca: '',
    cor: '',
    status_idstatus: ''
  });

  useEffect(() => {
    if (id) {
      getAnimal(id).then(res => {
        setAnimal(res.data);
        setForm(res.data);
      });
    }
  }, [id]);

  if (!animal) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    await updateAnimal(id, form);
    const updated = await getAnimal(id);
    setAnimal(updated.data);
    setForm(updated.data);
    setEdit(false);
    onUpdated();
  };

  return (
    <div className="animal-detail">
      <h3>Detalhes do Animal</h3>
      
      {!edit ? (
        <>
          <p><span>Descrição:</span> {animal.desc_animal}</p>
          <p><span>Espécie:</span> {animal.especie}</p>
          <p><span>Raça:</span> {animal.raca}</p>
          <p><span>Cor:</span> {animal.cor}</p>
          <p><span>Status:</span> {animal.descricao_status}</p>
          <div className="animal-detail-actions">
            <button className="btn-edit" onClick={() => setEdit(true)}>Editar</button>
            <button className="btn-edit" onClick={onClose}>Fechar</button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Descrição</label>
            <input name="desc_animal" value={form.desc_animal} onChange={handleChange} />
          </div>
          <div>
            <label>Espécie</label>
            <input name="especie" value={form.especie} onChange={handleChange} />
          </div>
          <div>
            <label>Raça</label>
            <input name="raca" value={form.raca} onChange={handleChange} />
          </div>
          <div>
            <label>Cor</label>
            <input name="cor" value={form.cor} onChange={handleChange} />
          </div>
          <div>
            <label>Status</label>
            <input name="status_idstatus" value={form.status_idstatus} onChange={handleChange} />
          </div>
          <div className="animal-detail-actions">
            <button type="submit" className="btn-save">Salvar</button>
            <button type="button" className="btn-cancel" onClick={() => setEdit(false)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}
