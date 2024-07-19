import React, { useEffect, useState } from 'react';
import periphaLogo from '../assets/peripha.png';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import axios from 'axios';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    if(localStorage.getItem("token")) {
      await axios.get(`http://localhost:8080/self`, {
          headers: {
              authorization : localStorage.getItem("token")
      }}).then((res) => {
          //console.log("success")
          localStorage.setItem("user", JSON.stringify(res.data));
          setIsLoggedIn(true);
      }).catch((err) => {
          console.log(err.response)
          setIsLoggedIn(false);
      })
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    else {
      setIsLoggedIn(false);
    }
    console.log(localStorage.getItem("user"))
    setUser(JSON.parse(localStorage.getItem("user")))
    
  }

  useEffect(()=> {
    checkLogin();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-cyan-900 fixed w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="http://localhost:5173/home" className="flex items-center space-x-3">
          <img src={periphaLogo} className="w-12" alt="Peripha Logo" />
          <span className="self-center text-2xl font-semibold text-white">Peripha</span>
        </a>
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex justify-center flex-grow px-20">
          <input
            type="text"
            placeholder="Search..."
            className="bg-cyan-950 px-4 py-2 rounded-md focus:outline-none w-full text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="flex items-center space-x-3">
          {/* User Indicator */}
          {isLoggedIn ? (
            <Dropdown profilePicture={user.profilePicture} username={user.username}/>
          ) : (
            <a href="http://localhost:5173/login">
              <span className="text-white cursor-pointer hover:underline">Login</span>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;