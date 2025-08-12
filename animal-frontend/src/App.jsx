import React, { useState } from 'react';
import AnimalList from './components/AnimalList';
import AnimalForm from './components/AnimalForm';
import AnimalDetail from './components/AnimalDetail';
import styles from './App.module.css';

import { deleteAnimal } from './api/animal'; // Importe a função de exclusão

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleDelete = async (id) => {
    await deleteAnimal(id);
    setSelectedId(null); // Fecha detalhes
    setRefresh(!refresh);
  };

  return (
    <div className={styles.appContainer}>
      <AnimalForm onCreated={() => setRefresh(!refresh)} />
      <AnimalList
        onSelect={setSelectedId}
        onRefresh={refresh}
        onDelete={handleDelete} // Passe a função para AnimalList
      />
      {selectedId && (
        <AnimalDetail
          id={selectedId}
          onUpdated={() => setRefresh(!refresh)}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
