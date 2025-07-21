import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// * Import Pages & Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

import { useUserStore } from "./store/user";

const App = () => {
  const user = useUserStore((state) => state.user);
  const isAuthChecked = useUserStore((state) => state.isAuthChecked);
  const loadUserFromStorage = useUserStore((state) => state.loadUserFromStorage);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  if (!isAuthChecked) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="bg-stone-100 min-h-screen">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={!user ? <Signup /> : <Navigate to="/todo" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/todo" />} />
          <Route path="/todo" element={user ? <Todo /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
