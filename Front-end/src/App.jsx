import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sign_In from './pages/Sign_In';
import User from './pages/User';
import Footer from './components/footer/Footer';
import ErrorPage from './components/errorPage/ErrorPage';
import EditUserName from './pages/EditUserName';

const App = () => {
  return (
    <BrowserRouter>      
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<Sign_In/>}/>
          <Route path="/profile" element={<User/>}/>
          <Route path="/error" element={<ErrorPage/>}/>
          <Route path="/editUserName" element={<EditUserName/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
  );
};

export default App;