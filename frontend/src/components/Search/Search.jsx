import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import UserCard from './UserCard';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const peripheralTypes = ['Keyboard', 'Mouse', 'Mousepad']; // List of peripheral types

  const { searchQuery } = useParams();

  const [isUserSearch, setIsUserSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cards , setCards] = useState([]);
  const [filters, setFilters] = useState([]);
  const [found, setFound] = useState(true);

  const toggleFilter = (type) => {
    setFilters((prevFilters) =>
      prevFilters.includes(type)
        ? prevFilters.filter((filter) => filter !== type)
        : [...prevFilters, type]
    );
  };

  function loadCards() {
    setLoading(true);
    if(isUserSearch) {
      axios.get(`http://localhost:8080/user/search/query?search_query=${encodeURIComponent(searchQuery)}`).then((res) => {
        console.log(res.data)
        let tempCards = res.data.map(user => (<UserCard key={user._id} user={user} />));
        setCards(tempCards);
      }).catch((err) => {
        console.log(err)
      });
    }
    else {
      axios.get(`http://localhost:8080/products/search/query?search_query=${encodeURIComponent(searchQuery)}`).then((res) => {
        console.log(res.data)
        let filteredProducts = res.data;
          if (filters.length > 0) {
            filteredProducts = res.data.filter((product) =>
              filters.includes(product.category)
            );
          }

          let tempCards = filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ));;
        setCards(tempCards);
      }).catch((err) => {
        console.log(err)
      });
    }
    console.log(searchQuery)
    setLoading(false);
  }

  useEffect(()=> {
    loadCards();
  }, [searchQuery, isUserSearch, filters]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="h-full flex">
          {!isUserSearch && <div className="flex-none w-60 h-screen bg-cyan-900 p-4 text-white rounded-md">
            <h2 className="text-lg font-bold mb-4">Peripheral Types</h2>
            <ul>
              {peripheralTypes.map((type, index) => (
                <li key={index} className={`mb-2 cursor-pointer hover:text-cyan-500 ${filters.includes(type) ? 'text-cyan-300' : ''}`} onClick={() => toggleFilter(type)}>{type}</li>
              ))}
            </ul>
          </div>}
          <div className="flex-grow p-4">
            <div className="flex justify-between mb-4">
              <div>
                <button
                  onClick={() => setIsUserSearch(false)}
                  className={`px-4 py-2 mr-2 rounded ${!isUserSearch ? 'bg-cyan-700 text-white' : 'bg-gray-300'}`}
                >
                  Search Products
                </button>
                <button
                  onClick={() => setIsUserSearch(true)}
                  className={`px-4 py-2 rounded ${isUserSearch ? 'bg-cyan-700 text-white' : 'bg-gray-300'}`}
                >
                  Search Users
                </button>
              </div>
            </div>
            <div className="overflow-x-hidden">
              <div className="flex justify-center flex-wrap">
                {cards}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Search;