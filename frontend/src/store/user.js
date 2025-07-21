import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,
    error: null,
    isLoading: false,
    isAuthChecked: false,

    // Signup function
    signup: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
        const res = await fetch("/api/user/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            set({ isLoading: false, error: data.error || "Signup failed" });
            return { success: false, message: data.error || "Signup failed" };
        }

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(data));

        set({ user: data, isLoading: false, error: null });
        return { success: true, message: "Signup successful" };
        } catch (err) {
        set({ isLoading: false, error: err.message });
        return { success: false, message: err.message };
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
        const res = await fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            set({ isLoading: false, error: data.error || "Login failed" });
            return { success: false, message: data.error || "Login failed" };
        }

        localStorage.setItem("user", JSON.stringify(data));
        set({ user: data, isLoading: false, error: null });

        return { success: true };
        } catch (err) {
        set({ isLoading: false, error: err.message });
        return { success: false, message: err.message };
        }
    },

    logout: () => {
        // * Remove the User from Storage
        localStorage.removeItem("user");
        set({ user: null });
    },

    loadUserFromStorage: () => {
    const storedUser = localStorage.getItem("user");
    set({ user: storedUser ? JSON.parse(storedUser) : null, isAuthChecked: true });
  },
}));