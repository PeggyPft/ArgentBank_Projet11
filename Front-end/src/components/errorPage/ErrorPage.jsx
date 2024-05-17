import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';

const ErrorPage = () => {
    return (
        <div>
            <Header/>
            <div className='errorPage'>
                <h1>404</h1>
                <p>Merci de bien vouloir vous connecter.</p>

                <div className="errorLink">
                    <Link to="/">Retourner sur la page de connexion</Link>
                </div>
            </div>        
        </div>
    );
};


export default ErrorPage;