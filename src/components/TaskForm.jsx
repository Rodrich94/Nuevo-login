import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [criticidad, setCriticidad] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      title,
      criticidad,
      date: new Date().toLocaleString(),
    };
    addTask(newTask);
    setTitle('');
    setCriticidad(1);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        required
      />
      <select value={criticidad} onChange={(e) => setCriticidad(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map(level => (
          <option key={level} value={level}>
            {level} {level === 1 ? 'Estrella' : 'Estrellas'}
          </option>
        ))}
      </select>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;
