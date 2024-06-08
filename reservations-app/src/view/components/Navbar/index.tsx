import React, { useEffect, useState } from 'react'
import SearchBar from '../SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { PastaIcon } from '../../../assets/svg/PastaIcon';
import { BurgerIcon } from '../../../assets/svg/BurgerIcon';
import { PizzaIcon } from '../../../assets/svg/PizzaIcon';
import { motion } from 'framer-motion';
import { useCurrentUser } from '../../../context/userContext';
import { auth } from '../../../firebase/config';
import { signOut } from 'firebase/auth';
import { ProfileIcon } from '../../../assets/svg/ProfileIcon';
import ProfileDropdownMenu from '../ProfileDropdownMenu';

function Navbar() {
    const storage = window.sessionStorage;
    const [showAnimation, setShowAnimation] = useState<boolean>(!storage.getItem('intro animation') ? true : false)
    const currentUser = useCurrentUser();
    const navigateToHomePage = useNavigate();

    useEffect(() => {
        storage.setItem('intro animation', 'done');
        //na osnovu itema iz sessionStorage pokrecemo animaciju glavnog logo-a
    }, [storage]);

    function handleSignOut() {
        signOut(auth).then(() => {
            currentUser.userDispatch({ type: 'SET_USER', payload: null });
            navigateToHomePage('/');
            console.log(currentUser)
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <nav className='h-20 flex justify-between items-center shadow-sm px-5 sticky top-0 z-10 bg-white mb-10 opacity-[99%] md:hidden'>
            {showAnimation ? <div className='flex ml-5 items-center lg:hidden'>
                <motion.div animate={{
                    transition: { delay: 1.5, duration: .3 },
                    opacity: [0, 0.5, 1],
                }}>
                    <Link to="/" className='text-custom-orange text-2xl'>hungry</Link>
                </motion.div>
                <motion.div animate={{
                    transition: { delay: 1.1, duration: .4 },
                    opacity: [0, 0.5, 1, 0.5, 0],
                }}><PastaIcon /></motion.div>
                <motion.div animate={{
                    transition: { delay: .7, duration: .4 },
                    opacity: [0, 0.5, 1, 0.5, 0],
                }}><PizzaIcon /></motion.div>
                <motion.div animate={{
                    transition: { delay: .3, duration: .4 },
                    opacity: [0, 0.5, 1, 0.5, 0],
                }}><BurgerIcon /></motion.div>
            </div> : <Link to="/" className='text-custom-orange text-2xl ml-5 mr-48'>hungry</Link>}

            <SearchBar />
            {currentUser.user ?
                <ProfileDropdownMenu handleSignOut={handleSignOut} />
                :
                <Link to='/signIn' className='ml-60 lg:ml-36 md:ml-0'>
                    <button className='rounded-3xl bg-custom-orange h-10 w-28 text-white hover:bg-[#eb6902]'>Sign in</button>
                </Link>}
        </nav>
    )
}

export default Navbar