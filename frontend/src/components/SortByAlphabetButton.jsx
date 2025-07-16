const SortByAlphabetButton = ({ onSort }) => {
  return (
    <button
      onClick={onSort}
      className='bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600'
    >
      Sort A-Z
    </button>
  );
};

export default SortByAlphabetButton;