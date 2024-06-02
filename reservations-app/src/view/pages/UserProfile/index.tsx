import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProfileInfo from '../../components/ProfileInfo'
import ProfileReservations from '../../components/ProfileReservations'
import ProfileFavorites from '../../components/ProfileFavorites'
import { useCurrentUser } from '../../../context/userContext'
import { useFavoriteLocals } from '../../../context/favoriteLocalsContext'
import { useUserReservations } from '../../../context/usersReservationsContext'
import { useLocation } from 'react-router-dom'

function UserProfile() {
    const [isOpenProfileOpen, setIsOpenProfileOpen] = useState(false);
    const [isOpenProfileReservations, setIsOpenProfileReservations] = useState(false);
    const [isOpenProfileFavorites, setIsOpenProfileFavorites] = useState(false);
    const location = useLocation();
    const state = location.state;
    const currentUser = useCurrentUser();
    const favoriteLocals = useFavoriteLocals();
    const usersReservations = useUserReservations()

    useEffect(() => {
        setIsOpenProfileOpen(state.profileInfo);
        setIsOpenProfileReservations(state.profileReservations)
        setIsOpenProfileFavorites(state.profileFavorites)
    }, [state])



    function handleClickProfileInfo() {
        setIsOpenProfileOpen((prevState) => !prevState);
    }

    function handleClickProfileReservations() {
        setIsOpenProfileReservations((prevState) => !prevState);
    }

    function handleClickProfileFavorites() {
        setIsOpenProfileFavorites((prevState) => !prevState);
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center gap-7 mb-10 min-h-[65vh]'>
                <ProfileInfo userInfo={currentUser.user} isOpen={isOpenProfileOpen} handleClick={handleClickProfileInfo} />
                <ProfileReservations usersReservations={usersReservations.reservations} isOpen={isOpenProfileReservations} handleClick={handleClickProfileReservations} />
                <ProfileFavorites favoriteLocals={favoriteLocals.favoriteLocals} isOpen={isOpenProfileFavorites} handleClick={handleClickProfileFavorites} />
            </div>
            <Footer />
        </>
    )
}

export default UserProfile