import React from 'react';
import ViewTransactions from '../components/viewTransactions/ViewTransactions';

const User = () => {
    return (
        <main className="container_User main bg-dark">
            <div className="content_HeaderUser">
                <h1>Welcome back<br />Tony Jarvis!</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <ViewTransactions/>
            
        </main>
    );
};

export default User;