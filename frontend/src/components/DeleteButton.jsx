import delete_icon from '../assets/delete.png'

const DeleteButton = ({handleDeleteTodo}) => {
  return (
    <img 
      src={delete_icon} 
      alt="delete"
      onClick={handleDeleteTodo}
      className="w-3.5 cursor-pointer"
    />
  )
}

export default DeleteButton