import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReviewModal from './ReviewModal';
import Review from './Review';
import axios from 'axios';

// Make sure to bind modal to app element
Modal.setAppElement('#root');


const ProductModal = ({ productName, isOpen, closeModal, productImage, productSpecs, productId, isLoggedIn  }) => {
    const [reviewModal, setReviewModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const toggleReviewModal = () => {
        setReviewModal(!reviewModal)
    }

    async function submitReview(review) {
        console.log(productId)
        await axios.post(`http://localhost:8080/reviews/${productId}`, review, {
            headers: {
                authorization : localStorage.getItem("token")
        }})
            .then((res)=>{
                console.log(res.data);
                setReviewModal(false);
                loadReviews();
            }).catch((err)=> {
                console.log(err.response.data.message)
                alert(err.response.data.message);
            });
    }

    async function loadReviews() {
        let tempList = []
        await axios.get(`http://localhost:8080/reviews/productId/${productId}`)
            .then((res) => {
                console.log(res.data);
                res.data.forEach((review)=> {
                    tempList.push(<Review props={review} key={res.data._id}/>);
                });
                setReviews(tempList);
            }).catch((err)=> {
                console.log(err.response.data.message);
                alert(err.response.data.message);
            });
    }

    useEffect( ()=> {
        loadReviews();
        console.log(isLoggedIn)
    }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Product Modal"
      className="Modal bg-black/70 fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out"
      overlayClassName="Overlay transition-opacity duration-300 ease-in-out"
      onClick={closeModal}
    >
        <div className="bg-cyan-900 p-6 text-white rounded-lg w-3/4 h-3/4 relative flex flex-col">
            <div className='flex flex-row'>
                
                <div className='flex-none w-64'>
                    <h1 className="text-3xl mb-4 w-64 text-center">{productName}</h1>
                    <img src={productImage} className='w-64 h-auto pb-2'></img>
                    <div className="left-0 right-0 border-t-2 border-black w-72 absolute "></div>
                    <span className='text-2xl mb-4 ml-20'>Specs</span>
                    <ul>
                        {
                            productSpecs && Object.keys(productSpecs).map((field) => (
                                <li className="capitalize" key={field}>{field}: {productSpecs[field]}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="flex-none ml-8">
                        <h1 className="text-3xl">User Reviews</h1>
                        {reviews}
                </div>
                <div className="border-l-2 border-black left-72 absolute top-0 bottom-0"></div>
                
                {isLoggedIn && <button onClick={toggleReviewModal} className='mb-2 text-xl absolute bg-sky-600 rounded-md w-16 bottom-0 left-1/2'>Post</button>}
                <ReviewModal productName={productName} submitReview={submitReview} productImage={productImage} isOpen={reviewModal} closeModal={()=>setReviewModal(false)}/>
                <div className='flex-1'>
                    <button onClick={closeModal} className="float-right text-white hover:text-gray-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    </button>
                </div>
            </div>
            
        </div>
    </Modal>
  );
};

export default ProductModal;