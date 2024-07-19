import React, { useState } from 'react';
import Modal from 'react-modal';


// Make sure to bind modal to app element
Modal.setAppElement('#root');

const ReviewModal = ({ productName, isOpen, closeModal, productId, submitReview }) => {
    const [formData, setFormData] = useState({
        reviewType: "short",
        reviewContent: "",
        rating: 0
    });

    const handleReview = (e) =>{
        e.preventDefault();
        console.log(formData);
        submitReview(formData);
    }
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Product Modal"
      className="Modal bg-black/70 absolute top-0 left-0 h-screen flex flex-col justify-center items-center w-full"
      overlayClassName="Overlay transition-opacity duration-300 ease-in-out"
      onClick={closeModal}
    >
        <div className="bg-cyan-900 p-6 text-white rounded-lg w-3/4 h-3/4 relative">
            <div>
                <button onClick={closeModal} className="float-right text-white hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                </button>
            </div>
            <div className='flex justify-center relative'>
                <h1 className="text-3xl mb-4 w-64 text-center">Thoughts?</h1>
            </div>
            <form onSubmit = {handleReview}>
            <div className="mb-10" >
              <label htmlFor="reviewType" className="block text-white mb-2 capitalize">Review Type:</label>
              <select
                id="reviewType"
                name="reviewType"
                value={formData["reviewType"]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-black"
                aria-label="reviewType"
              >
                <option value="short">Short</option>
                <option value="long">Long</option>
              </select>

            </div>
            <div className="mb-10" key="reviewContent">
              <label htmlFor="reviewContent" className="block text-white mb-2 capitalize">Review Content:</label>
              <input
                type="text"
                id="reviewContent"
                name="reviewContent"
                value={formData["reviewContent"]}
                onChange={handleChange}
                style={{ height: '100px' }}
                className="w-full border rounded-lg px-3 py-2 text-black"
                aria-label="reviewContent"
              />
            </div>
            <div className="mb-5" key="rating">
              <label htmlFor="rating" className="block text-white mb-2 capitalize">Rating: {formData["rating"]}</label>
              <input
                type="range"
                id="rating"
                name="rating"
                value={formData["rating"]}
                onChange={handleChange}
                min = "0"
                max ="5"
                step = "0.5"
                className="w-full h-full border rounded-lg px-3 py-2 text-black"
                aria-label="rating"
              />
            </div>
            <button type="submit" className="bg-blue-500 mt-10 text-white px-4 py-2 rounded-lg hover:bg-blue-600 align-bottom">Submit</button>
            </form>
            
        </div>
    </Modal>
  );
};

export default ReviewModal;