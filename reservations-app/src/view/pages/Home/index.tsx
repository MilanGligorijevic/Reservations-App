import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import HomePageReservationBar from '../../components/HomePageReservationBar';
import PopularCategories from '../../components/PopularCategories';
import ExploreTopPicks from '../../components/ExploreTopPicks';
import LoadingCircle from '../../components/LoadingCircle';
import NavbarMobile from '../../components/NavbarMobile';

function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 800)
    }, [])

    return (
        <>
            <Navbar />
            <NavbarMobile />
            {isLoading ?
                <LoadingCircle />
                :
                <div className='flex flex-col items-center'>
                    <HomePageReservationBar />
                    <PopularCategories />
                    <ExploreTopPicks />
                </div>}
            <Footer />
        </>
    )
}

export default Home