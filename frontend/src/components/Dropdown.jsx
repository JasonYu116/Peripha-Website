import React, { useState } from 'react';
import axios from 'axios';

const Dropdown = ({profilePicture, username}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout =()=> {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(user)
    //console.log(localStorage.getItem("token"))
    axios.post(`http://localhost:8080/user/${user.username}/logout`, {}, {
        headers: {
            authorization : localStorage.getItem("token")
    }}).then((res)=> {
        localStorage.removeItem("user"); 
        localStorage.removeItem("token"); 
        alert("Logged out Successfully");
        location.href = `http://localhost:5173/home`;
    }).catch((err) => {
        console.log(err.response);
        alert("failed to logout")
    });
    
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-center w-10 h-10 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <img
            src={profilePicture} // Replace with the URL of your profile image
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <a
              href={`http://localhost:5173/user/${username}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Profile
            </a>
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick = {handleLogout}
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;