import React, { useState } from 'react';
import Modal from 'react-modal';

// Make sure to bind modal to app element
Modal.setAppElement('#root');

const EditProfileModal = ({ editProfile, isOpen, closeModal, user }) => {
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    profilePicture: user.profilePicture,
    bio: user.bio,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    editProfile(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Product Modal"
      className="Modal bg-black/70 fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out"
      overlayClassName="Overlay transition-opacity duration-300 ease-in-out"
    >
      <div className="bg-cyan-900 p-6 rounded-lg w-2/4 relative text-white">
        <button onClick={closeModal} className="absolute top-2 right-2 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-xl mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {['displayName', 'profilePicture', 'bio'].map((field) => (
            <div className="mb-4" key={field}>
              <label htmlFor={field} className="block mb-2 capitalize">{field}:</label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-black"
                aria-label={field}
              />
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;