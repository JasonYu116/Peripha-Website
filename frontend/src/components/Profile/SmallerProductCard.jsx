import React from 'react';

const SmallerProductCard = ({ product, selectCard, props, selected }) => {
  return (
    <button className={`text-white w-60 h-72  hover:bg-cyan-900 text-lg rounded-md align-top shadow-lg ${selected ? 'shadow-cyan-500 bg-cyan-900': 'shadow-cyan-700 bg-cyan-800'} ml-8 mb-8 justify-between items-center`} onClick={()=>{selectCard(product._id)}}>
      <div className="flex items-center justify-center">
        <img src={product.image} className="w-52 h-auto" alt="Product" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-xl text-balanced mb-2">{product.name}</h1>
      </div>
    </button>
  );
};

export default SmallerProductCard;