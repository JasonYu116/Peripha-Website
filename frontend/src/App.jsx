import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LoginRegister from './components/LogInRegister/LoginRegister'
import Profile from './components/Profile/Profile'
import LandingPage from './components/LandingPage/LandingPage'
import DoesntExist from './components/DoesntExist';
import Navbar from './components/Navbar';
import Search from './components/Search/Search';
import Product from './components/Product/Product';

function App() {
  const [count, setCount] = useState(0)

  return (
      
      
    <BrowserRouter>
    <Navbar/>
    <div className = "pt-20">
      <Routes>
        <Route path="/">
          <Route index  />
          <Route path="login" element={<LoginRegister />} />
          <Route path="404" element={<DoesntExist />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="user/:username" element={<Profile />} />
          <Route path="search/:searchQuery" element={<Search />} />
          <Route path="products/:productId" element={<Product/>}   />
        </Route>
        
      </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App
