import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Card from './Card';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import EditProfileModal from './EditProfileModal';

function Profile(props) {
    const { username } = useParams();
    const [cards, setCards] = useState([]);
    const [userExists, setExists] = useState(true);
    const [user, setUser] = useState({});
    const [isUser, setIsUser] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const navigate = useNavigate();
    const toggleAddModal = () => {
        setAddModal(!addModal);
    }

    const toggleEditModal = () => {
        setEditModal(!editModal);
    }

    async function loadUser() {
        console.log(username);
        await axios.get(`http://localhost:8080/user/${username}`)
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            }).catch((err) => {
                console.log(err.response.data.message);
                setExists(false);
                navigate(`/404`);
            });
        if (userExists) {
            console.log(localStorage.getItem("token"));
            await axios.get(`http://localhost:8080/self`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }).then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                setIsLoggedIn(true);
                console.log(isLoggedIn);
                if (username === res.data.username) {
                    setIsUser(true);
                } else {
                    setIsUser(false);
                }
            }).catch((err) => {
                console.log(err.response);
                setIsUser(false);
                setIsLoggedIn(false);
            })
            await axios.get(`http://localhost:8080/products/user/${username}`)
                .then((res) => {
                    console.log(isLoggedIn);
                    makeCards(res.data);
                }).catch((err) => {
                    console.log(err.response.data.message);
                    alert(err.response.data.message);
                });
        }

        setLoading(false);
    }

    async function addProductToUser(product) {
        let productId = "";
        await axios.post(`http://localhost:8080/products`, product, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then((res) => {
                productId = res.data._id;
                console.log(productId);
                axios.post(`http://localhost:8080/user/${username}/addProduct/${productId}`, {}, {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                })
                    .then((res) => {
                        window.location.reload();
                        closeModal();
                    })
                    .catch((err) => {
                        alert(err.response.data.message);
                        console.log(err.response.data);
                    });
            }).catch((err) => {
                alert(err.response.data.message);
                console.log(err.response.data.message);
            });
    }

    function addExistingProduct(productId) {
        axios.post(`http://localhost:8080/user/${username}/addProduct/${productId}`, {}, {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                })
                    .then((res) => {
                        window.location.reload();
                        closeModal();
                    })
                    .catch((err) => {
                        alert(err.response.data.message);
                        console.log(err.response.data);
                    });
    }

    async function editProfile(profile) {

        await axios.put(`http://localhost:8080/user/${username}/edit`, profile, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            }).catch((err) => {
                alert(err.response.data.message);
                console.log(err.response.data);
            });
    }

    function makeCards(products) {
        let tempCards = [];
        products.forEach(item => {
            tempCards.push(<Card key={item.name} product={item} isLoggedIn={isLoggedIn} />);
        });
        setCards(tempCards);
    }

    useEffect(() => {
        loadUser();
    }, [isLoggedIn]);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
            ) : (
                <div>
                    <div className="w-full mx-auto bg-cyan-900 rounded-lg shadow-lg overflow-hidden relative">
                        <div className="px-4 py-6">
                            {isUser && (
                                <button
                                    className="absolute top-4 right-4  p-1 rounded-full"
                                    aria-label="Edit Profile"
                                    onClick={toggleEditModal}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6 text-cyan-900"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            stroke = "white"
                                            d="M16.862 2.487c.737-.737 1.931-.737 2.669 0l2.085 2.085c.737.737.737 1.931 0 2.669l-13.208 13.21a4.5 4.5 0 01-2.012 1.192l-4.78 1.26a.75.75 0 01-.919-.92l1.26-4.779a4.5 4.5 0 011.191-2.012L16.862 2.487zm-.708 6.005l-2.335-2.336M14.14 4.316l2.336 2.335m0 0l-2.336-2.335"
                                        />
                                    </svg>
                                </button>
                            )}
                            <div className="flex items-center">
                                <img
                                    className="h-24 w-24 rounded-full mr-4"
                                    src={user.profilePicture}
                                    alt="Profile"
                                />
                                <div>
                                    <h1 className="text-xl font-bold text-white">{user.displayName}</h1>
                                    <p className="text-sm text-white mt-1">@{user.username}</p>
                                </div>
                            </div>
                            <div className="mt-6 text-left">
                                <p className="text-sm text-white mt-1 text-pretty">
                                    {user.bio}
                                </p>
                            </div>
                            <div className="mt-6">
                                <div className="flex justify-between text-sm text-white">
                                    <span>Products</span>
                                </div>
                                <div className="flex justify-between text-sm text-white font-bold mt-1">
                                    <span>{user.products.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-4">
                        {cards}
                        {isUser && (
                            <button onClick={toggleAddModal} className="w-60 h-96 bg-white hover:bg-gray-400 text-lg rounded-md content-start ml-8">
                                <h1 className="text-xl text-balanced content-start">+ Add a Product</h1>
                            </button>
                        )}
                    </div>
                    <EditProfileModal editProfile={editProfile} isOpen={editModal} closeModal={() => setEditModal(false)} user={user}/>
                    <AddProductModal addProductToUser={addProductToUser} isOpen={addModal} closeModal={() => setAddModal(false)} addExistingProduct = {addExistingProduct}/>
                </div>
            )}
        </div>
    );
};

export default Profile;