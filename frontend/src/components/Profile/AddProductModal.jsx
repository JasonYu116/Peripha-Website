// AddProductModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import SmallerProductCard from './SmallerProductCard';
// Make sure to bind modal to app element
Modal.setAppElement('#root');

const AddProductModal = ({ addProductToUser, addExistingProduct, isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    manufacturer: '',
    model: '',
    image: '',
    reviews: [],
    specs: {}
  });
  const [productId, setProductId] = useState("");
  const [existingProduct, setExistingProduct] = useState(true);
  const [cards, setCards] = useState([]);
  const [specFields, setSpecFields] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSpecChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSpecs = [...specFields];
    updatedSpecs[index][name] = value;
    setSpecFields(updatedSpecs);

    // Update formData specs
    const updatedSpecsObject = updatedSpecs.reduce((acc, spec) => {
      acc[spec.property] = spec.value;
      return acc;
    }, {});
    setFormData(prevState => ({
      ...prevState,
      specs: updatedSpecsObject
    }));
  };

  const searchProducts = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/products/search/query?search_query=${encodeURIComponent(searchQuery)}`).then((res) => {
        console.log(res.data);
        let tempCards = res.data.map((product) => (
          <SmallerProductCard key={product._id} id={product._id} product={product} selectCard={selectCard} selected={productId === product._id} />
        ));
        setCards(tempCards);
        setProductId("");
      }).catch((err) => {
        console.log(err);
      });
  };

  const selectCard = (newProductId) => {
    console.log(newProductId);
    setProductId(newProductId);
    setCards(prevCards => prevCards.map(card =>
      React.cloneElement(card, { selected: card.props.id === newProductId })
    ));
  };

  const addSpecField = () => {
    setSpecFields([...specFields, { property: '', value: '' }]);
  };

  const removeSpecField = (index) => {
    const updatedSpecs = specFields.filter((_, i) => i !== index);
    setSpecFields(updatedSpecs);

    // Update formData specs
    const updatedSpecsObject = updatedSpecs.reduce((acc, spec) => {
      acc[spec.property] = spec.value;
      return acc;
    }, {});
    setFormData(prevState => ({
      ...prevState,
      specs: updatedSpecsObject
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addProductToUser(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Product Modal"
      className="Modal bg-black/70 fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out"
      overlayClassName="Overlay transition-opacity duration-300 ease-in-out"
    >
      <div className="bg-cyan-900 p-6 rounded-lg w-1/2 relative text-white">
        <button onClick={closeModal} className="absolute top-2 right-2 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-xl mb-4">Add Product</h2>
        <button
          onClick={() => setExistingProduct(true)}
          className={`px-4 py-2 mr-2 rounded ${existingProduct ? 'bg-cyan-700 text-white' : 'bg-gray-400'}`}
        >
          Existing Products
        </button>
        <button
          onClick={() => setExistingProduct(false)}
          className={`px-4 py-2 rounded ${!existingProduct ? 'bg-cyan-700 text-white' : 'bg-gray-400'}`}
        >
          Custom Product
        </button>
        {existingProduct ?  <div className="pt-5 justify-center flex flex-col">
          <form onSubmit={searchProducts}>
            <input
              type="text"
              placeholder="Search..."
              className="bg-cyan-950 px-4 py-2 rounded-md focus:outline-none w-full text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex justify-center flex-wrap pt-10 overflow-y-auto max-h-[50rem]">
            {cards}
          </div>
          {productId !== "" && <button className='bg-cyan-600 rounded-md px-4 py-2 justify-center align-middle' onClick = {()=>{addExistingProduct(productId)}}>+ Add</button>}
        </div> : 
        <form onSubmit={handleSubmit}>
          {['name', 'category', 'manufacturer', 'model', 'image'].map((field) => (
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
          <div className="mb-4">
            <label className="bloc mb-2">Specifications:</label>
            {specFields.map((spec, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  name="property"
                  value={spec.property}
                  onChange={(e) => handleSpecChange(index, e)}
                  placeholder="Property"
                  className="w-1/2 border rounded-lg px-3 py-2 mr-2 text-black"
                />
                <input
                  type="text"
                  name="value"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, e)}
                  placeholder="Value"
                  className="w-1/2 border rounded-lg px-3 py-2 mr-2 text-black"
                />
                <button type="button" onClick={() => removeSpecField(index)} className="text-white bg-red-600 hover:bg-red-800 w-1/4">
                  -
                </button>
              </div>
            ))}
            <button type="button" onClick={addSpecField} className="text-blue-500 hover:text-blue-700 font-normal">
              + Add Specification
            </button>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
        </form>}
      </div>
    </Modal>
  );
};

export default AddProductModal;