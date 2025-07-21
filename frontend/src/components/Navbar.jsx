import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Todo Buddy
        </Link>
        <nav>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">{user.email}</span>
              <button
              onClick={handleClick}
              className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
              Log Out
              </button>
            </div>
          )}
          {!user && (
            <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            <Link to="/" className="text-sm text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">Sign Up</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;