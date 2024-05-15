import React, {useEffect} from 'react';
import logoBanner from '../../assets/img/argentBankLogo.png';
import {Link, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {clearToken, logout} from '../../Slices/tokenSlice';
import { setUserInformation } from '../../Slices/userInformation';


const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isAuthenticated = useSelector(state => state.token.token !== null);
    const firstName = useSelector(state => state.userInformation.firstName);
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if(token) {
            const userFirstName = localStorage.getItem('userFirstName');
            dispatch(setUserInformation({firstName: userFirstName}));
        }
    }, [dispatch, localStorage.getItem('authToken')]);

    

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userFirstName');
        dispatch(logout());
        dispatch(clearToken());
    }

    return (
        <div className='main-nav'>
            <Link to="/" className='main-nav-logo'><img src={logoBanner} alt="Logo Argent Bank" className='main-nav-logo-image'/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div className='main-nav-item'>
                {/* Sur la page Home */}
                {location.pathname === "/" && !isAuthenticated && (
                    <Link to="/sign-in" ><i className="fa fa-user-circle"> <span>Sign In</span> </i></Link>
                )}

                {/* Sur la page Sign_In */}
                {location.pathname === "/sign-in" && (
                    <i className="fa fa-user-circle"> <span>Sign In</span> </i>
                )}

                {/* Sur la page User */}
                {location.pathname === "/profile" && (
                    <div>
                        <i className="fa fa-user-circle"/> <span>{firstName}</span>
                        <Link to="/" onClick={handleSignOut}><i className="fa fa-sign-out"> <span>Sign out</span> </i></Link>
                    </div>
                )}
            </div>            
        </div>
        
    );
};

export default Header;