import React, {useState,} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { setToken } from '../Slices/tokenSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';


const Sign_In = () => {
    const [formData, setFormData] = useState({
        email: '',       
        password: '',
    });

const dispatch = useDispatch();
const navigate = useNavigate();

const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
};

const handleSubmit = async (event) => {
    console.log(formData);
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/api/v1/user/login', formData);
        console.log(response.data);
        if (response.status === 200) {
            console.log('Données de la réponse:', response.data.body);
            const token = response.data.body.token;
            dispatch(setToken(token));

            const profileResponse = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const {firstName} = profileResponse.data.body;
            console.log('Prénom de l\'utilisateur:', firstName);

            const updateProfileResponse = await axios.put('http://localhost:3001/api/v1/user/profile',{
                userName: 'nouveau-nom-utilisateur'
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

            navigate('/profile');
        }
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
    }
};

    return (
        <main className="main bg-dark">
            <Header/>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Username</label>
                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div> 
                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
        </section>
      </main>
    );
};

export default Sign_In;