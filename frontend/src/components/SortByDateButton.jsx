const SortByDateButton = ({onSort}) => {
  return (
    <button
      onClick={onSort}
      className='bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600'>
      Sort by Date
    </button>
  );
};

export default SortByDateButton;