import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <a href = {`http://localhost:5173/products/${product._id}`}>
    <button className="text-white w-60 h-72 bg-cyan-800 hover:bg-cyan-900 text-lg rounded-md align-top shadow-lg shadow-cyan-700 ml-8 mb-8 justify-between items-center">
      <div className="flex items-center justify-center">
        <img src={product.image} className="w-52 h-auto" alt="Product" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-xl text-balanced mb-2">{product.name}</h1>
      </div>
    </button>
    </a>
  );
};

export default ProductCard;