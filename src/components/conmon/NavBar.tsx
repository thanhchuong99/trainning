import { useState } from "react";
import { Link } from "react-router-dom";
import HdwebsoftLogo from "../../assets/HdwebsoftLogo.svg";
const NavBar = () => {
  const navBarContent = ["Home", "Todo"];
  const [isOpenMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!isOpenMenu);
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
              {navBarContent.map((item, index) => (
                <Link
                  key={index}
                  to={item}
                  className="py-4 px-6 text-black text-20 hover:text-primary-blue hover:border-b-4 hover:border-primary-blue font-semibold "
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            <Link
              to="login"
              className="py-2 px-2 text-20 font-medium text-gray-500 rounded hover:bg-primary-blue hover:text-white transition duration-300"
            >
              Log In
            </Link>
            <Link
              to=""
              className="py-2 px-2 text-20 font-medium text-white bg-primary-blue rounded hover:bg-secondary-white transition duration-300"
            >
              Sign Up
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
            {navBarContent.map((item, index) => (
              <li key={index}>
                <Link
                  to={item}
                  className="block text-18 px-4 py-4 hover:text-primary-blue hover:bg-white  text-white bg-primary-blue font-semibold transition-all duration-600 "
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
