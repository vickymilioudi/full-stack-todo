import { useEffect, useState,  } from "react";
import axios from "axios";

import todo_icon from '../assets/todo_icon.png'

import { useTodoStore } from "../store/todo";
import TodoItem from './TodoItem';
import SortByAlphabetButton from './SortByAlphabetButton'
import SortByDateButton from './SortByDateButton'
import ShowNotCompletedCheckbox from './ShowNotCompletedCheckbox';

const Todo = () => {
    const [newTodo, setNewTodo] = useState({
        name: "",
        isCompeted: false,
    });
    
    const {createTodo} = useTodoStore()
    const handleAddTodo = async () => {
        const {success, message} = await createTodo(newTodo)
        console.log("Success:", success)
        console.log("Message:", message)
        setNewTodo({name:""});
    };

    const {fetchTodos, todos} = useTodoStore();
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);
    console.log("todos:", todos);

    const {deleteTodo} = useTodoStore();
    const handleDeleteTodo = async (pid) => {
        const { success, message } = await deleteTodo(pid);
        console.log("Success:", success)
        console.log("Message:", message)
    };

    const { toggleTodo } = useTodoStore();
    const handleToggleTodo = async (id) => {
        const { success, message } = await toggleTodo(id);
        console.log("Success:", success);
        console.log("Message:", message);
    };

    const [showNotCompleted, setShowNotCompleted] = useState(false);
    const [searchText, setSearchText] = useState('');
    const filteredTodos = todos
        .filter(todo => todo.name.toLowerCase().includes(searchText.toLowerCase()))
        .filter(todo => (showNotCompleted ? !todo.isComplete : true)
    );

    const { sortTodosAlphabetically } = useTodoStore();
    const sortAlphabetically = () => {
        sortTodosAlphabetically();
    };

    const { sortTodosByDate } = useTodoStore();
    const sortByDate = () => {
        sortTodosByDate();
    };

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      
        {/* ------------ title ------------ */}
        <div className='flex items-center my-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>

        {/* ------------ search bar ------------ */}
        <div className="mb-2">
            <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search tasks..."
            className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition placeholder:text-slate-500 text-sm"
            />
        </div>

        {/* ------------ input field ------------ */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input 
                type="text" 
                placeholder='Todo Name'
                name="name"
                value={newTodo.name}
                onChange={(e) => setNewTodo({ ...newTodo, name:e.target.value})}
                className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' />
            <button 
                onClick={handleAddTodo}
                className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add Todo</button>
        </div>

        <div className='flex items-center justify-center gap-3 mb-4'>
            {/* ------------ progress checkbox ------------ */}
            <div className="flex items-center gap-2">
            <ShowNotCompletedCheckbox
                showNotCompleted={showNotCompleted}
                setShowNotCompleted={setShowNotCompleted}/>
            </div>
            {/* ------------ sorting buttons ------------ */}
            <SortByAlphabetButton onSort={sortAlphabetically} />
            <SortByDateButton onSort={sortByDate} />
        </div>

        {/* ------------ todo list ------------ */}
      <div>
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} deleteTodo={handleDeleteTodo} toggleTodo={handleToggleTodo} /> 
        })}
      </div>
    </div>
  )
}

export default Todo