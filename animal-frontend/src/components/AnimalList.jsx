import React, { useEffect, useState } from 'react';
import { getAnimals } from '../api/animal';
import './AnimalList.css';

export default function AnimalList({ onSelect, onRefresh, onDelete }) {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    getAnimals().then(res => setAnimals(res.data));
  }, [onRefresh]);

  return (
    <div className="animal-list">
      <h2>Animais</h2>
      <table className="animal-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Espécie</th>
            <th>Raça</th>
            <th>Cor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <tr key={animal.idanimal}>
              <td>{animal.desc_animal}</td>
              <td>{animal.especie}</td>
              <td>{animal.raca}</td>
              <td>{animal.cor}</td>
              <td>
                <div className="action-buttons">
                  <button className="btn-detail" onClick={() => onSelect(animal.idanimal)}>Detalhes</button>
                  <button className="btn-delete" onClick={() => onDelete(animal.idanimal)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
