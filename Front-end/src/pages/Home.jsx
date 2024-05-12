import React from 'react';
import Header from '../components/header/Header'
import BannerHome from '../components/bannerHome/BannerHome';
import Features from '../components/features/Features';

const Home = () => {
    return (
        <div>
            <div>
                <Header/>
                <BannerHome/>
                <Features/>
            </div>
        </div>
    );
};

export default Home;