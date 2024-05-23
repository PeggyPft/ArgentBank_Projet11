import React, {useEffect, useState} from 'react';
import Header from '../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserName } from '../Slices/userInformation';
import axios from 'axios';
import ArrowRight from '../assets/img/arrow-right.svg';


const EditUserName = () => {
    const token = useSelector((state) => state.token.token);
    const isAuthenticated = token !== null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { firstName, lastName, userName } = useSelector((state) => state.userInformation);

    const [localUserName, setLocalUserName] = useState('');
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

        useEffect(() => {
            const userData = JSON.parse(localStorage.getItem('userData'));
                if(!userData) {
                    navigate('/error');
                    return;
                }
                setLocalUserName(userName);
        }, [isAuthenticated, navigate, userName]);


        const handleUserNameChange = (e) => {
            console.log('UserName modifié:', e.target.value);
            setLocalUserName(e.target.value);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const updateProfileResponse = await axios.put('http://localhost:3001/api/v1/user/profile',
                    {userName: localUserName},
                    {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }          
                }
            );
            console.log('Réponse API:', updateProfileResponse);

            if (updateProfileResponse.status === 200) {
                dispatch(updateUserName(localUserName));
                console.log('Mise à jour userName dans Redux:', localUserName);
                setLocalUserName(localUserName);
                setSuccess('Votre nom d\'utilisateur a été mis à jour avec succès !');
                setError(null);
            } else {
                setError('Echec de la mise à jour de votre user name');
                setSuccess(null);
            }
        } catch (error) {
            console.error('une erreur s\'est produite lors de la mise à jour du nom d\'utilisateur', error);
            setError(error.response?.data?.message || 'Une erreur s\'est produite lors de la mise à jour du nom d\'utilisateur');
            setSuccess(null);
            }
        };

    return (
        <div>
            <Header/>
            <div className='container_main'>
                <h2 className='title_Edit_User'>Edit user info</h2>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <form onSubmit={handleSubmit} className='container_Form'>
                    <div className='line_Label_Input'>
                        <label htmlFor="username">User name :</label>
                        <input type="text" id="username" name="username" value={localUserName} onChange={handleUserNameChange} className='userName_Input'/>
                    </div>
                    <div className='line_Label_Input'>
                        <label htmlFor="firstname">First name :</label>
                        <input type="text" id="firstname" name="firstname" value={firstName} readOnly/>
                    </div>
                    <div className='line_Label_Input'>
                        <label htmlFor="lastname">Last name :</label>
                        <input type="text" id="lastname" name="lastname"value={lastName} readOnly/>
                    </div>
                    <div className='container_Button'>
                        <button type='submit' className='button'>Save</button>
                        <button type='button' className='button' onClick={() => navigate('/profile')}>Cancel</button>
                    </div>
                </form>
                <div className='container_Transactions'>
                    <div className='box_content'>
                        <div>
                            <p className='title_Transactions content'> Argent Checking (x3448)</p>
                            <p className='balance content'>$48,098.43</p>
                            <p className='available content'>Available balance</p>
                        </div>
                        <div className='container_img'>
                            <img src={ArrowRight} alt="Arrow Right" className='imgArrow'/>
                        </div>
                    </div>
                    <div className='box_content'>
                        <div>
                            <p className='title_Transactions content'> Argent Checking (x3448)</p>
                            <p className='balance content'>$48,098.43</p>
                            <p className='available content'>Available balance</p>
                        </div>
                        <div className='container_img'>
                            <img src={ArrowRight} alt="Arrow Right" className='imgArrow'/>
                        </div>
                    </div>
                    <div className='box_content'>
                        <div>
                            <p className='title_Transactions content'> Argent Checking (x3448)</p>
                            <p className='balance content'>$48,098.43</p>
                            <p className='available content'>Available balance</p>
                        </div>
                        <div className='container_img'>
                            <img src={ArrowRight} alt="Arrow Right" className='imgArrow'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserName;