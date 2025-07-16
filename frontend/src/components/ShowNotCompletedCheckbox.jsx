import React from 'react';

const ShowNotCompletedCheckbox = ({ showNotCompleted, setShowNotCompleted }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={showNotCompleted}
        onChange={() => setShowNotCompleted(!showNotCompleted)}
        className="w-4 h-4 accent-gray-700"
      />
      <span className="text-sm font-medium text-gray-700">In progress</span>
    </div>
  );
};

export default ShowNotCompletedCheckbox;