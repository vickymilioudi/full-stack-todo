import {create} from "zustand";
import { useUserStore } from "./user"; 

export const useTodoStore = create((set) => ({
	todos: [],
	setTodos: (todos) => set({ todos }),

	createTodo: async (newTodo) => {
		const user = useUserStore.getState().user;
		if (!newTodo.name) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${user.token}`
			},
			body: JSON.stringify(newTodo),
		});
		const data = await res.json();
		set((state) => ({ todos: [...state.todos, data.data] }));
		return { success: true, message: "Todo created successfully" };
	},
	
  	fetchTodos: async () => {
		const user = useUserStore.getState().user;
   		if (!user || !user.token) return;
		const res = await fetch("/api/todos", {
			headers: {
				"Authorization": `Bearer ${user.token}`,
			}
		});
		const data = await res.json();
		set({ todos: data.data });
	},

  deleteTodo: async (pid) => {
		const user = useUserStore.getState().user;
		const res = await fetch(`/api/todos/${pid}`, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${user.token}`,
			}
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ todos: state.todos.filter((todo) => todo._id !== pid) }));
		return { success: true, message: data.message };
	},

  toggleTodo: async (pid) => {
  const user = useUserStore.getState().user;

  const res = await fetch(`/api/todos/${pid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`,
    }
  });

  const data = await res.json();
  if (!data.success) return { success: false, message: data.message };

  const newIsComplete = data.data.isComplete;
  set((state) => ({
    todos: state.todos.map((todo) =>
      todo._id === pid ? { ...todo, isComplete: newIsComplete } : todo
    ),
  }));

  return { success: true, message: data.message };
},


  sortTodosAlphabetically: () => set(state => ({
    todos: [...state.todos].sort((a, b) => a.name.localeCompare(b.name))
  })),
  sortTodosByDate: () => set(state => ({
    todos: [...state.todos].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    })),
}));