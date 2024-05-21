import React, {useEffect} from 'react';
import Header from '../components/header/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditUserName = () => {
    const isAuthenticated=useSelector(state => state.token.token !== null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
            if(!userData) {
                navigate('/error');
            }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <Header/>
            <div className='container_main'>
                <h2 className='title_Edit_User'>Edit user info</h2>
                <form action="" className='container_Form'>
                    <div className='line_Label_Input'>
                        <label htmlFor="username">User name :</label>
                        <input type="text" id="username" name="username"/>
                    </div>
                    <div className='line_Label_Input'>
                        <label htmlFor="firstname">First name :</label>
                        <input type="text" id="firstname" name="firstname"/>
                    </div>
                    <div className='line_Label_Input'>
                        <label htmlFor="lastname">Last name :</label>
                        <input type="text" id="lastname" name="lastname"/>
                    </div>
                    <div className='container_Button'>
                    <button type='submit' className='button'>Save</button>
                    <button type='submit' className='button'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserName;