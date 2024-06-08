import { useState } from "react";
import { useCurrentUser } from "../../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { NavbarMobileMenu } from "../NavbarMobileMenu";
import SearchBar from "../SearchBar";
import ProfileDropdownMenu from "../ProfileDropdownMenu";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";

function NavbarMobile() {
    const currentUser = useCurrentUser();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const navigateToHomePage = useNavigate();
    const navigateToProfile = useNavigate();


    const menuVariants = {
        initial: {
            x: -1000,
        },
        animate: {
            x: 0,
            transition: {
                duration: 0.35,
                ease: "easeInOut",
            },
        },
        exit: {
            x: -1000,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
    };

    function toggleMenu() {
        setMenuOpen((prevState) => !prevState);
    }

    function handleSignOut() {
        signOut(auth).then(() => {
            currentUser.userDispatch({ type: 'SET_USER', payload: null });
            navigateToHomePage('/');
            setMenuOpen(false);
            console.log(currentUser)
        }).catch((error) => {
            console.log(error)
        });
    }

    function openProfileInfo(event: Event | React.SyntheticEvent) {
        navigateToProfile('/userProfile', { state: { profileInfo: true, profileReservations: false, profileFavorites: false } });
    }

    function openProfileReservations(event: Event | React.SyntheticEvent) {
        navigateToProfile('/userProfile', { state: { profileInfo: false, profileReservations: true, profileFavorites: false } });
    }

    function openProfileFavorites(event: Event | React.SyntheticEvent) {
        navigateToProfile('/userProfile', { state: { profileInfo: false, profileReservations: false, profileFavorites: true } });
    }


    return (
        <div className="hidden md:block">
            <nav className='px-5 w-full h-16 flex justify-between items-center shadow '>
                <Link to="/" className='text-custom-orange text-2xl'>hungry</Link>

                <div className="mr-2 z-50 cursor-pointer" onClick={toggleMenu}>
                    <NavbarMobileMenu toggleMenu={menuOpen} />
                </div>
            </nav>
            <AnimatePresence >
                {menuOpen &&
                    <motion.div
                        className="bg-white fixed top-0 z-20 h-full w-full flex flex-col items-center p-14"
                        variants={menuVariants}
                        style={{ originX: 1 }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <SearchBar />
                        {currentUser.user ?
                            <div>
                                <div className='mt-14 mb-8 text-2xl font-medium'>Hello, {currentUser.user.firstName}</div>
                                <div className="mt-2 text-2xl cursor-pointer" onClick={openProfileInfo}>Profile</div>
                                <div className="mt-2 text-2xl cursor-pointer" onClick={openProfileReservations}>My reservations</div>
                                <div className="mt-2 text-2xl cursor-pointer" onClick={openProfileFavorites}>Favorites</div>
                                <button className='rounded mt-16 bg-custom-orange h-10 w-[17rem] text-white hover:bg-[#eb6902] text-xl' onClick={handleSignOut}>Sign out</button>
                            </div>
                            :
                            <Link to='/signIn' className='mt-16'>
                                <button className='rounded bg-custom-orange h-10 w-[17rem] text-white hover:bg-[#eb6902] text-xl'>Sign in</button>
                            </Link>}
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
}

export default NavbarMobile;
