import React, { useState } from 'react'
import ProductModal from './ProductModal'
import Review from './Review';
import axios from 'axios';
const Card = (props) => {
    const [addModal, setAddModal] = useState(false);
    const toggleAddModal = () => {
        setAddModal(!addModal)
    }

    
    
    return (
        <>
            <button onClick={toggleAddModal} className=" text-white w-60 h-96 px-2 bg-cyan-800 hover:bg-cyan-900 text-lg rounded-md align-top shadow-lg shadow-cyan-700 ml-8 mb-8">
                <img src={props.product.image} className="align-top w-full h-auto"/>
                <h1 className="text-xl text-balanced content-start">{props.product.name}</h1>    
            </button>
            <ProductModal productImage={props.product.image} productName={props.product.name} productSpecs={props.product.specs} isOpen={addModal} productId={props.product._id} closeModal={()=>setAddModal(false)} key={props.product._id} isLoggedIn={props.isLoggedIn}/>     
        </>
    );
}

export default Card;