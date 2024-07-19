import React, {useEffect, useState} from 'react'
import ReviewModal from '../Profile/ReviewModal';
import Review from '../Profile/Review';
import {useParams} from 'react-router-dom'
import axios from 'axios';




const Product = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [product, setProduct] = useState({});
    const [exists, setExists] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { productId } = useParams();
    const toggleReviewModal = () => {
        setReviewModal(!reviewModal)
    }

    async function submitReview(review) {
        console.log(productId)
        await axios.post(`http://localhost:8080/reviews/${productId}`, review)
            .then((res)=>{
                console.log(res.data);
                setReviewModal(false);
                loadReviews();
            }).catch((err)=> {
                console.log(err.response.data.message)
                alert(err.response.data.message);
            });
    }


    async function loadProduct() {
        setIsLoading(true);
        await axios.get(`http://localhost:8080/products/${productId}`).then((res) => {
            console.log(res.data)
            setProduct(res.data);
        }).catch((err) => {
            console.log(err);
            alert(err.response.data.message);
        });
        let tempList = []
        axios.get(`http://localhost:8080/reviews/productId/${productId}`)
            .then((res) => {
                console.log(res.data);
                res.data.forEach((review)=> {
                    tempList.push(<Review props={review} key={res.data._id}/>);
                });
                setReviews(tempList);
            }).catch((err)=> {
                console.log(err);
                alert(err.response.data.message);
            });
        setIsLoading(false);
    }

    useEffect(() => {
        loadProduct();
    }, []);

    
    return ( <div className='flex justify-center'>{isLoading ? <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
  </div> : 
    <div className='flex flex-col bg-cyan-900 p-6 text-white rounded-lg w-3/4 h-3/4 relative'>
        <div className='flex flex-row'>
                
                <div className='flex-none w-64'>
                    <h1 className="text-3xl mb-4 w-64 text-center">{product.name}</h1>
                    <img src={product.image} className='w-64 h-auto pb-2'></img>
                    <span className='text-2xl mb-4'>Specs</span>
                    <ul>
                        {
                            product.specs && Object.keys(product.specs).map((field) => (
                                <li className="capitalize" key={field}>{field}: {product.specs[field]}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="flex flex-1 justify-center relative overflow-auto">
                    <h1 className="text-3xl absolute">User Reviews</h1>
                    <div className='absolute overflow-auto h-[390px] w-full mt-8'>
                        
                        {reviews}
                    </div>
                    <button onClick={toggleReviewModal} className='mb-2 text-xl bg-sky-600 rounded-md w-16 absolute bottom-0 translate-x-[-7px]'>Post</button>
                </div>
                <div className="border-l-2 border-black/25 left-72 absolute top-0 bottom-0"></div>
            
                
                <ReviewModal productName={product.name} submitReview={submitReview} isOpen={reviewModal} closeModal={()=>setReviewModal(false)}/>
        </div>
    </div>}
</div>
);
};

export default Product