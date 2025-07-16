import {create} from "zustand";

export const useTodoStore = create((set) => ({
	todos: [],
	setTodos: (todos) => set({ todos }),

	createTodo: async (newTodo) => {
		if (!newTodo.name) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTodo),
		});
		const data = await res.json();
		set((state) => ({ todos: [...state.todos, data.data] }));
		return { success: true, message: "Product created successfully" };
	},

  fetchTodos: async () => {
		const res = await fetch("/api/todos");
		const data = await res.json();
		set({ todos: data.data });
	},

  deleteTodo: async (pid) => {
		const res = await fetch(`/api/todos/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ todos: state.todos.filter((todo) => todo._id !== pid) }));
		return { success: true, message: data.message };
	},

  toggleTodo: async (pid) => {
    const res = await fetch(`/api/todos/${pid}`, {
      method: "PUT",
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({ todos: state.todos.map((todo) => todo._id === pid ? { ...todo, isComplete: !todo.isComplete } : todo), }));

    return { success: true, message: data.message };
  },
  sortTodosAlphabetically: () => set(state => ({
    todos: [...state.todos].sort((a, b) => a.name.localeCompare(b.name))
  })),
  sortTodosByDate: () => set(state => ({
    todos: [...state.todos].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    })),
}));