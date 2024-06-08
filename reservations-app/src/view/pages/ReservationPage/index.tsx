import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Box, TextField } from '@mui/material'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { GuestIcon } from '../../../assets/svg/GuestIcon'
import { DateIcon } from '../../../assets/svg/DateIcon'
import { TimeIcon } from '@mui/x-date-pickers/icons'
import { v4 as uuidv4 } from 'uuid';
import Reservation from '../../../types/reservation'
import { addUsersReservation, makeLocalReservation } from '../../../firebase/config'
import { useCurrentUser } from '../../../context/userContext'
import ReservationDetails from '../../components/ReservationDetails'
import { useUserReservations } from '../../../context/usersReservationsContext'
import { isValidPhoneNumber } from '../../../utilities/functions'
import TaskSuccessful from '../../components/TaskSuccessful'
import emailjs from 'emailjs-com';
import NavbarMobile from '../../components/NavbarMobile'



function ReservationPage() {
    const { localId, localName, guestsNumber, reservationDate, reservationTime } = useParams();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const currentUser = useCurrentUser();
    const usersReservation = useUserReservations();
    const navigateUser = useNavigate();
    const pathLocation = useLocation();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [taskSuccessful, setTaskSuccessful] = useState<boolean>(false);



    function bookReservation() {
        setErrorMessage("");
        if (!currentUser.user) {
            if (checkDataInput() && localId && localName && guestsNumber && reservationDate && reservationTime) {
                const reservationData: Reservation = {
                    id: uuidv4(),
                    numberOfGuests: parseInt(guestsNumber),
                    reservationDate: reservationDate,
                    reservationTime: reservationTime,
                    guestName: firstName + ' ' + lastName,
                    guestEmail: email,
                    guestPhoneNumber: phoneNumber,
                }
                makeLocalReservation(localId, reservationData);
                sendReservationDetailsOnEmail();
                setTaskSuccessful(true);
                setTimeout(() => {
                    navigateUser('/');
                }, 3000)
            } else {
                setErrorMessage("Please fill all fields with valid values");
                return;
            }
        } else {
            if (localId && localName && guestsNumber && reservationDate && reservationTime) {
                const reservationData: Reservation = {
                    id: uuidv4(),
                    numberOfGuests: parseInt(guestsNumber),
                    reservationDate: reservationDate,
                    reservationTime: reservationTime,
                    guestName: currentUser.user.firstName + ' ' + currentUser.user.lastName,
                    guestEmail: currentUser.user.email,
                    guestPhoneNumber: currentUser.user.phoneNumber,
                }
                makeLocalReservation(localId, reservationData);
                usersReservation.reservationsDispatch({
                    type: 'ADD_USER_RESERVATION',
                    payload: { localId, localName, reservationData }
                });
                setTaskSuccessful(true);
                setTimeout(() => {
                    navigateUser('/');
                }, 3000)
            } else {
                setErrorMessage("Reservation failed");
                return;
            }
        }
    }

    function sendReservationDetailsOnEmail() {
        emailjs.send('service_zvbvt7q', 'template_liz4yjh', {
            to_name: firstName,
            reply_to: email,
        }, 'sfBqPr9Hxszym2Vyo')
            .then((response) => {
                console.log('Email sent successfully', response.status, response.text);
            }, (error) => {
                console.error('Error sending email', error);
            });
    }

    function checkDataInput() {
        if (firstName && lastName && email && phoneNumber && isValidPhoneNumber(phoneNumber) && email.includes('@')) return true;
        return false;
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

    function redirectToSignIn() {
        navigateUser('/signIn', { state: { pathName: pathLocation.pathname } });
    }

    function redirectToSignUp() {
        navigateUser('/signUp', { state: { pathName: pathLocation.pathname } });
    }

    return (
        <>
            <Navbar />
            <NavbarMobile />
            <div className='flex flex-col items-center md:mt-10'>
                <div className='w-3/12 lg:w-3/5'>
                    <h1 className='text-3xl font-medium mb-5 sm:text-2xl'>Complete your reservation</h1>
                    {taskSuccessful && <TaskSuccessful />}
                    <ReservationDetails localName={localName} reservationDate={reservationDate} reservationTime={reservationTime} guestsNumber={guestsNumber} />
                    <div>
                        {!currentUser.user ?
                            <h2 className='font-medium text-lg mt-5'>Fill your reservation details</h2>
                            :
                            <h2 className='font-medium text-lg mt-5 mb-4'>Your reservation details</h2>}
                        {!currentUser.user && <div className='text-base mt-2 mb-4'>
                            <p><button className='text-custom-orange' onClick={redirectToSignIn}>Sign in</button> to make things quicker or <button className='text-custom-orange' onClick={redirectToSignUp}>Sign up</button> to create an account</p>
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
                                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                                        fontFamily: 'Poppins',
                                    },
                                    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                                        fontFamily: 'Poppins',
                                        color: '#F96D00',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
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
                                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                                        fontFamily: 'Poppins',
                                    },
                                    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                                        fontFamily: 'Poppins',
                                        color: '#F96D00',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
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
                                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                                        fontFamily: 'Poppins',
                                    },
                                    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                                        fontFamily: 'Poppins',
                                        color: '#F96D00',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
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
                                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                                        fontFamily: 'Poppins',
                                    },
                                    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                                        fontFamily: 'Poppins',
                                        color: '#F96D00',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#F96D00'
                                    }
                                }}
                            />
                        </Box>
                        {errorMessage && <h2 className='text-lg text-center mb-4 text-red-500'>{errorMessage}</h2>}
                        <button className='rounded bg-custom-orange h-12 w-[100%] text-white text-lg mt-2 hover:bg-[#eb6902] mb-20 sm:text-base' onClick={() => bookReservation()}>Complete reservation</button>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default ReservationPage