import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { motion } from 'framer-motion';
import User from '../../../types/User';
import { useCurrentUser } from '../../../context/userContext';
import { getRedirectResult, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '../../../firebase/config';
import firebaseErrorHandler from '../../../utilities/firebaseErrorHandler';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, useMediaQuery } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

function SignIn() {
    const [userCredentials, setUserCredentials] = useState<User>({ id: "", email: "", password: "" });
    const currentUser = useCurrentUser();
    const [errorState, setErrorState] = useState<string>('');
    const [showPassword, setShowPassword] = React.useState(false);
    const navigateUser = useNavigate();
    const location = useLocation();

    const isMobile = useMediaQuery(
        `(max-width: 620px)`,
    );


    function handleCredentials(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
    }

    function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setErrorState('');
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
            .then((userCredentials) => {
                signInUser(userCredentials.user.uid, userCredentials.user.email, userCredentials.user.displayName);
                console.log(userCredentials.user.displayName);
            }) //sva login logika ide iz observera onAuthStateChanged
            .catch((error) => {
                const errorMessage = error.message;
                setErrorState(firebaseErrorHandler(errorMessage));
            });
    }

    function signInUser(id: string, email: string | null, firstName: string | null) {
        const user = { userId: id, userEmail: email, firstName: firstName };
        currentUser.userDispatch({ type: 'SET_USER', payload: user });
        navigateUser(location.state ? location.state.pathName : "/");
        console.log(currentUser.user);
    }



    function handleGoogleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (isMobile) {
            signInWithRedirect(auth, provider);
            getRedirectResult(auth)
                .then((result) => {
                    const user = result?.user;
                    if (user) {
                        signInUser(user.uid, user.email, user.displayName);
                    }
                    navigateUser('/');
                }).catch((error) => {
                    const errorMessage = error.message;
                    setErrorState(firebaseErrorHandler(errorMessage));
                });
        } else {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    signInUser(user.uid, user.email, user.displayName);
                }).catch((error) => {
                    const errorMessage = error.message;
                    setErrorState(firebaseErrorHandler(errorMessage));
                });
        }
    }

    function handlePasswordReset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        sendPasswordResetEmail(auth, userCredentials.email)
            .then(() => {
                console.log('Uspesno poslat email za reset lozinke');
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorState(firebaseErrorHandler(errorMessage));
            });
    }


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <nav className='h-20 bg-white text-center mt-7'>
                <Link to="/" className='text-custom-orange text-3xl '>hungry</Link>
            </nav>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-3xl font-medium mb-7 mt-14 sm:text-2xl'>Sign in to continue</p>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '18rem' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name='email'
                        onChange={(e) => handleCredentials(e)}
                        sx={{
                            '& .MuiInputBase-input': {
                                fontFamily: 'Poppins',
                            },
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
                <FormControl
                    sx={{
                        m: 1,
                        width: '18rem',
                        '& .MuiInputBase-input': {
                            fontFamily: 'Poppins',
                        },
                        '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                            color: '#F96D00',
                        },
                        '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#F96D00'
                        }
                    }}
                    variant="outlined">
                    <InputLabel
                        htmlFor="outlined-adornment-password"
                        style={{ fontFamily: 'Poppins' }}
                    >Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        name='password'
                        onChange={(e) => handleCredentials(e)}
                    />
                </FormControl>
                <Link to='/'>
                    <button className='rounded bg-custom-orange h-12 w-72 text-white text-lg mt-3 hover:bg-[#eb6902]' onClick={(e) => handleLogin(e)}>Sign in</button>
                </Link>
                <button className='text-gray-400 text-sm mt-2' onClick={(e) => handlePasswordReset(e)}>Forgot password?</button>
                <div className='mt-2 self-center text-red-500'>{errorState}</div>
                <div className="inline-flex items-center justify-center w-full mt-28">
                    <hr className="w-72 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <span className="absolute px-3 text-base text-gray-400 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">New to hungry?</span>
                </div>
                <Link to='/signUp'>
                    <motion.button
                        className='rounded bg-white h-12 w-72 text-custom-orange text-lg border border-custom-orange mb-3'
                        whileHover={{
                            backgroundColor: "#F96D00",
                            color: "#FFFFFF",
                            transition: {
                                duration: .15,
                            }
                        }}
                    >
                        Sign up
                    </motion.button>
                </Link>
                <Link to='/'>
                    <motion.button
                        className='rounded bg-white h-12 w-72 mb-10 text-custom-orange text-lg border border-custom-orange'
                        whileHover={{
                            backgroundColor: "#F96D00",
                            color: "#FFFFFF",
                            transition: {
                                ease: "easeIn",
                                duration: .15,
                            }
                        }}
                        onClick={(e) => handleGoogleLogin(e)}
                    >
                        Sign in with Google
                    </motion.button>
                </Link>
            </div>
        </>
    )
}

export default SignIn