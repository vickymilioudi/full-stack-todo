import React, { useState } from 'react';
import { useUserStore } from "../store/user";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useUserStore((state) => state.login);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="bg-white w-11/12 max-w-md mx-auto mt-16 p-8 rounded-xl shadow-md">
      {/* Title */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">Login</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-orange-600 text-white py-3 rounded-full text-lg hover:bg-orange-700 transition"
        >
          Login
        </button>
        {error && (
        <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      </form>
    </div>
  );
};

export default Login;