import React, {useEffect, useState} from 'react';
import ViewTransactions from '../components/viewTransactions/ViewTransactions';
import Header from '../components/header/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const {firstName, lastName} = useSelector((state) => state.userInformation);
    const [isLoading, setIsLoading] = useState(true);
    const isAuthenticated=useSelector(state => state.token.token !== null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
            if(!userData) {
                navigate('/error');
            } else {
                setIsLoading(false);
            }
    }, [isAuthenticated, navigate]);

    const handleEditName = () => {
        navigate('/editUserName');
    };

    if(isLoading) {
        return <div>Loading... </div>;
    }

    return (
        <main className="container_User main bg-dark">
            <Header/>
            <div className="content_HeaderUser">
                <h1>Welcome back<br /> {firstName} {lastName} !</h1>
                <button className="edit-button" onClick={handleEditName}>Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <ViewTransactions
                title="Argent Bank Checking (x8349)"
                balance="$2,082.79"
                availableBalance="Available Balance"
            />
            <ViewTransactions
                title="Argent Bank Savings (x6712)"
                balance="$10,928.42"
                availableBalance="Available Balance"
            />
            <ViewTransactions
                title="Argent Bank Credit Card (x8349)"
                balance="$184.30"
                availableBalance="Current Balance"
            />
            
        </main>
    );
};

export default User;