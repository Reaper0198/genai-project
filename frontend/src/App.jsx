import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/home/NAVBAR'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import { Toaster } from 'react-hot-toast';
import Footer from './components/footer/Footer'
import ChatPage from './pages/ChatPage'

function App() {
  axios.defaults.baseURL = 'http://localhost:3000/api/';
  return (
    <BrowserRouter>
    <Toaster position="top-center"
  reverseOrder={false} />
    <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
