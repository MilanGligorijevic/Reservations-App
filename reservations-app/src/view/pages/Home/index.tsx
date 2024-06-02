import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import HomePageReservationBar from '../../components/HomePageReservationBar';
import PopularCategories from '../../components/PopularCategories';
import ExploreTopPicks from '../../components/ExploreTopPicks';

function Home() {

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center'>
                <HomePageReservationBar />
                <PopularCategories />
                <ExploreTopPicks />
            </div>
            <Footer />
        </>
    )
}

export default Home