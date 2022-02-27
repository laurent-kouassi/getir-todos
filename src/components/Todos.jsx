import React from 'react';
 
export const Todos = ({ todo, onCheckboxClick, onDeleteClick}) => {
  return (
    <li>
      <input type="checkbox" checked={!!todo.completed} onClick ={() => onCheckboxClick(todo)} readOnly/>
      <span>{todo.title}</span>
      <button onClick ={() => onDeleteClick(todo)}>&times;</button>
    </li>
  );
};