import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () =>{
    onLogout();
    navigate('/');
    closeDropdown();
  }

  return (
    <nav className="fixed top-0 right-4 m-4">
      <div
        className={`w-10 text-center rounded-[12px] p-2 bg-gray-800 text-white cursor-pointer`}
        onClick={toggleDropdown}
      >
        ☰
      </div>
      {isDropdownOpen && (
        <div className="absolute top-10 right-8 bg-white shadow-md rounded">
          {isLoggedIn ? (
            <>
              <Link to="/" onClick={closeDropdown} className="block p-2 text-center hover:text-white hover:bg-slate-700">
                HOME
              </Link>
              <Link to="/create" onClick={closeDropdown} className="block p-2 text-center  hover:text-white hover:bg-slate-700">
                CREATE SURVEY
              </Link>
              <Link to="/mySurvey" onClick={closeDropdown} className="block p-2 text-center hover:text-white hover:bg-slate-700">
                MY PROFILE
              </Link>
              <button onClick={handleLogout} className="block p-2">
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/" onClick={closeDropdown} className="block p-2 text-center hover:text-white hover:bg-slate-700">
                HOME
              </Link>
              <Link to="/login" onClick={closeDropdown} className="block p-2 text-center hover:text-white hover:bg-slate-700">
                LOGIN
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
