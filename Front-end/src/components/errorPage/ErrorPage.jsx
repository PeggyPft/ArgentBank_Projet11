import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../header/Header';

const ErrorPage = () => {
    const location = useLocation();
    const {pathname} = location;

    let errorCode = '';
    let errorAlert = '';
    let errorMessage = '';

    if(pathname === '/profile' || pathname === '/editUserName') {
        errorCode = '401';
        errorAlert = 'authentification requise';
        errorMessage = 'Vous devez vous connecter pour accéder à cette page';
    } else {
        errorCode = '404';
        errorAlert = 'Désolé, page introuvable';
        errorMessage = 'La page que vous avez demandée est introuvable';
    }
    
    return (
        <div>
            <Header/>
            <div className='errorPage'>
                <h1>{errorCode}</h1>
                <p>{errorAlert}</p>
                <p>{errorMessage} </p>

                <div className="errorLink">
                    <Link to="/sign-in">Retourner sur la page de connexion</Link>
                </div>
            </div>        
        </div>
    );
};


export default ErrorPage;