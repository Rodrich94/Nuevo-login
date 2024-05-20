import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Task = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [criticidad, setCriticidad] = useState(task.criticidad);

  const handleUpdate = () => {
    updateTask({ ...task, title, criticidad });
    setIsEditing(false);
  };

  return (
    <div className="task">
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <select value={criticidad} onChange={(e) => setCriticidad(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(level => (
              <option key={level} value={level}>
                {level} {level === 1 ? 'Estrella' : 'Estrellas'}
              </option>
            ))}
          </select>
          <button onClick={handleUpdate}>Guardar</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>Fecha de creación: {task.date}</p>
          <p>Criticidad: {[...Array(task.criticidad)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} />
          ))}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        </>
      )}
    </div>
  );
};

export default Task;
