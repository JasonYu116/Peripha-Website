import React from 'react';

const UserCard = ({ user }) => {
  return (
    <a href={"http://localhost:5173/user/" + user.username}>
    <button
      className="text-white w-60 h-72 bg-cyan-800 hover:bg-cyan-900 text-lg rounded-md shadow-lg shadow-cyan-700 ml-8 mb-8 flex flex-col justify-center items-center"
      
    >
      <div className="flex items-center justify-center">
        <img src={user.profilePicture} className="h-40 w-auto rounded-full mb-4" alt="User" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-xl text-balanced mb-2">{user.displayName}</h1>
        <h1 className="text-sm text-balanced">@{user.username}</h1>
      </div>
    </button>
    </a>
  );
};

export default UserCard;