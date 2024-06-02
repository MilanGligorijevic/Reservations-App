import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Box, TextField } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GuestIcon } from '../../../assets/svg/GuestIcon'
import { DateIcon } from '../../../assets/svg/DateIcon'
import { TimeIcon } from '@mui/x-date-pickers/icons'
import { v4 as uuidv4 } from 'uuid';
import Reservation from '../../../types/reservation'
import { addUsersReservation, makeLocalReservation } from '../../../firebase/config'
import { useCurrentUser } from '../../../context/userContext'
import ReservationDetails from '../../components/ReservationDetails'
import { useUserReservations } from '../../../context/usersReservationsContext'



function ReservationPage() {
    const { localId, localName, guestsNumber, reservationDate, reservationTime } = useParams();
    const [firstName, setFirstName] = useState<string>("user");
    const [lastName, setLastName] = useState<string>("user");
    const [email, setEmail] = useState<string>("user@gmail.com");
    const [phoneNumber, setPhoneNumber] = useState<string>("1234567");
    const currentUser = useCurrentUser();
    const usersReservation = useUserReservations();
    const navigateToHomePage = useNavigate();

    function bookReservation() {
        if (localId && localName && guestsNumber && reservationDate && reservationTime) {
            const reservationData: Reservation = {
                id: uuidv4(),
                numberOfGuests: parseInt(guestsNumber),
                reservationDate: reservationDate,
                reservationTime: reservationTime,
                guestName: currentUser.user ? (currentUser.user.firstName + ' ' + currentUser.user.lastName) : (firstName + ' ' + lastName),
                guestEmail: currentUser.user ? currentUser.user.email : email,
                guestPhoneNumber: currentUser.user ? currentUser.user.phoneNumber : phoneNumber,
            }
            makeLocalReservation(localId, reservationData);
            if (currentUser.user) usersReservation.reservationsDispatch({
                type: 'ADD_USER_RESERVATION',
                payload: { localId, localName, reservationData }
            });
            navigateToHomePage('/');
        } else {
            throw new Error("Reservation failed")
        }
    }

    function handleFirstName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFirstName(e.target.value);
    }

    function handleLastName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setLastName(e.target.value);
    }

    function handleEmail(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setEmail(e.target.value);
    }

    function handlePhoneNumber(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPhoneNumber(e.target.value);
    }


    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center'>
                <div className='w-3/12'>
                    <h1 className='text-3xl font-medium mb-5'>Complete your reservation</h1>
                    <ReservationDetails localName={localName} reservationDate={reservationDate} reservationTime={reservationTime} guestsNumber={guestsNumber} />
                    <div>
                        {!currentUser.user ?
                            <h2 className='font-medium text-lg mt-5'>Fill your reservation details</h2>
                            :
                            <h2 className='font-medium text-lg mt-5 mb-4'>Your reservation details</h2>}
                        {!currentUser.user && <div className='text-base mt-2 mb-4'>
                            <p><Link to="/signIn" className='text-custom-orange'>Sign in</Link> to make things quicker or <Link to="/signUp" className='text-custom-orange'>Sign up</Link> to create an account</p>
                        </div>}
                        {/* razmotriti prebacivanje ovog koda u zasebne komponente */}
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { marginBottom: 2, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label={currentUser.user ? currentUser.user.firstName : "First name"}
                                variant="outlined"
                                disabled={currentUser.user ? true : false}
                                onChange={(e) => handleFirstName(e)}
                                sx={{
                                    '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                        fontFamily: 'Poppins',
                                    },
                                    '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                        fontFamily: 'Poppins',
                                        color: '#F96D00',
                                    },
                                    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#F96D00'
                                    }
                                }}
                            />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { marginBottom: 2, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label={currentUser.user ? currentUser.user.lastName : "Last name"}
                                variant="outlined"
                                disabled={currentUser.user ? true : false}
                                onChange={(e) => handleLastName(e)}
                                sx={{
                                    '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                        fontFamily: 'Poppins',
                                    },
                                    '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                        fontFamily: 'Poppins',
                                        color: '#F96D00',
                                    },
                                    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#F96D00'
                                    }
                                }}
                            />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { marginBottom: 2, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label={currentUser.user ? currentUser.user.email : "Email"}
                                variant="outlined"
                                disabled={currentUser.user ? true : false}
                                onChange={(e) => handleEmail(e)}
                                sx={{
                                    '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                        fontFamily: 'Poppins',
                                    },
                                    '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                        fontFamily: 'Poppins',
                                        color: '#F96D00',
                                    },
                                    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#F96D00'
                                    }
                                }}
                            />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { marginBottom: 2, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label={currentUser.user ? currentUser.user.phoneNumber : "Phone number"}
                                variant="outlined"
                                disabled={currentUser.user ? true : false}
                                onChange={(e) => handlePhoneNumber(e)}
                                sx={{
                                    '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                        fontFamily: 'Poppins',
                                    },
                                    '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                        fontFamily: 'Poppins',
                                        color: '#F96D00',
                                    },
                                    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#F96D00'
                                    }
                                }}
                            />
                        </Box>
                        <button className='rounded bg-custom-orange h-12 w-[100%] text-white text-lg mt-2 hover:bg-[#eb6902] mb-20' onClick={() => bookReservation()}>Complete reservation</button>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default ReservationPage