import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sign_in from './pages/Sign_In';
import Header from './components/header/Header'
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<Sign_in/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
  );
};

export default App;