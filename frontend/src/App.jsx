import React from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials=true;

const App = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
