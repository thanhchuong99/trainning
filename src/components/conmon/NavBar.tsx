import { useState } from "react";
import { Link } from "react-router-dom";
import HdwebsoftLogo from "../../assets/HdwebsoftLogo.svg";
import { authActions } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../redux/store";
const NavBar = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!isOpenMenu);
  };
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <img
                  src={HdwebsoftLogo}
                  alt="Logo"
                  className="h-[50px] w-[200px] mr-8"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="todo"
                className="py-4 px-6 text-black text-20 hover:text-primary-blue hover:border-b-4 hover:border-primary-blue font-semibold "
              >
                TodoApp
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            <Link
              to="login"
              onClick={handleLogout}
              className="py-2 px-2 text-20 font-medium text-gray-500 rounded hover:bg-primary-blue hover:text-white transition duration-300"
            >
              Log Out
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={handleOpenMenu}
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-primary-blue "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpenMenu && (
        <div className="">
          <ul className="">
            <li>
              <Link
                to="todo"
                className="block text-18 px-4 py-4 hover:text-primary-blue hover:bg-white  text-white bg-primary-blue font-semibold transition-all duration-600 "
              >
                Todo
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
