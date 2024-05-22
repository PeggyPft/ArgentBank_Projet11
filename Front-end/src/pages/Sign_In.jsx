import React, {useEffect, useState,} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { setToken } from '../Slices/tokenSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import { setUserInformation } from '../Slices/userInformation';


const Sign_In = () => {
    const [formData, setFormData] = useState({
        email: '',       
        password: '',
    });

    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        const savedPassword = localStorage.getItem('savedPassword');
        const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

        if (savedEmail && savedPassword && savedRememberMe){
            setFormData({ email: savedEmail, password: savedPassword });
            setRememberMe(true);
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
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
                localStorage.setItem('authToken', token);
                
                
                const profileResponse = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const {firstName, userName, lastName, email, id} = profileResponse.data.body;
                dispatch(setUserInformation({firstName, userName, lastName, email, id}));
                console.log('Données de l\'utilisateur:', firstName, userName, lastName, email, id);
                localStorage.setItem('userData', JSON.stringify({firstName, userName, lastName, email, id}));

                if (rememberMe) {
                    localStorage.setItem('savedEmail', formData.email);
                    localStorage.setItem('savedPassword', formData.password);
                    localStorage.setItem('rememberMe', true);
                } else {
                    localStorage.removeItem('savedEmail');
                    localStorage.removeItem('savedPassword');
                    localStorage.removeItem('rememberMe');
                }

                const updateProfileResponse = await axios.put('http://localhost:3001/api/v1/user/profile',{
                    userName: firstName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

                navigate('/profile');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
            setError('Saisie incorrecte')
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
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMeChange} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div> 
                    <button type="submit" className="sign-in-button">Sign In</button>
                    {error && <div className="error_Message">{error}</div>}
                </form>
        </section>
      </main>
    );
};

export default Sign_In;