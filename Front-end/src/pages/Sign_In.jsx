import React, {useState,} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setToken} from '../tokenSlice';


const Sign_In = () => {
    const [formData, setFormData] = useState({
        userName: '',       
        password: '',
    });

const dispatch = useDispatch();
const token = useSelector(state => state.token);

const handleChange = (event => {
    setFormData({...formData, [event.target.name]: event.target.value});
});

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/api/v1/user/signup', formData);
        console.log(response.data);
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
    }
};

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="userName" value={formData.userName} onChange={handleChange}/>
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