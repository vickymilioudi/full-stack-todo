import React from 'react';
import ToggleButton from './ToggleButton';
import DeleteButton from './DeleteButton';

const TodoItem = ({ todo, deleteTodo, toggleTodo }) => {
  const formattedDate = new Date(todo.createdAt).toLocaleDateString();

  return (
    <div className='flex items-center my-3 gap-2'>
      <div className="flex flex-1 items-center">
        <ToggleButton isComplete={todo.isComplete} onToggle={() => toggleTodo(todo._id)}/>
        <p className={`ml-4 text-[17px] ${todo.isComplete ? 'line-through text-slate-400' : 'text-slate-700'}`}> {todo.name}</p>
      </div>
      <DeleteButton handleDeleteTodo={() => deleteTodo(todo._id)} />
      <div className='text-sm text-gray-500'>{formattedDate}</div>
    </div>
  );
};

export default TodoItem;