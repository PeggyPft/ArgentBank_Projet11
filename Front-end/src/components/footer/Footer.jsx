import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const isEditUserNamePage = location.pathname === '/editUserName';

    return (
        <div className={`container_footer ${isEditUserNamePage ? 'no-border' : ''}`}>
            <p className="footer-text">Copyright 2020 Argent Bank</p>
        </div>
    );
};

export default Footer;