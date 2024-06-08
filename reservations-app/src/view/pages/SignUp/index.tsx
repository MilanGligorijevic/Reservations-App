import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import User from '../../../types/User';
import { addUserToFirebase, auth } from '../../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useCurrentUser } from '../../../context/userContext';
import firebaseErrorHandler from '../../../utilities/firebaseErrorHandler';

function SignUp() {
    const [userCredentials, setUserCredentials] = useState<User>({ id: "", email: "", password: "", firstName: "", lastName: "", phoneNumber: "" });
    const [showPassword, setShowPassword] = React.useState(false);
    const [errorState, setErrorState] = useState<string>('');
    const currentUser = useCurrentUser();
    const navigateUser = useNavigate();
    const location = useLocation();



    function handleCredentials(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
    }

    function handleSignup(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (userCredentials.firstName?.length === 0 || userCredentials.lastName?.length === 0) {
            setErrorState("Please fill in your name");
            return;
        };
        setErrorState('');
        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: userCredentials.firstName,
                })
                console.log(user);
                addUserToFirebase(user.uid, userCredentials.firstName, userCredentials.lastName, userCredentials.email, userCredentials.phoneNumber)
                signInUser(user.uid, user.email, userCredentials.firstName);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorState(firebaseErrorHandler(errorMessage));
            });

    }

    function signInUser(id: string, email: string | null, firstName: string | undefined) {
        const user = { userId: id, userEmail: email, firstName: firstName };
        currentUser.userDispatch({ type: 'SET_USER', payload: user });
        navigateUser(location.state ? location.state.pathName : "/");
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <nav className='h-20 bg-white text-center mt-7'>
                <Link to="/" className='text-custom-orange text-3xl'>hungry</Link>
            </nav>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-3xl font-medium mb-5 mt-10 sm:text-2xl'>Sign up to continue</p>
                <p className='text-base w-72  text-center mb-5 sm:text-sm'>Create a free account to book and manage your reservations</p>
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
                        label="First name"
                        variant="outlined"
                        name='firstName'
                        onChange={(e) => handleCredentials(e)}
                        sx={{
                            '& .MuiInputBase-input': {
                                fontFamily: 'Poppins',
                            },
                            '& .MuiFormLabel-root.MuiInputLabel-root, & .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                                fontFamily: 'Poppins',
                            },
                            '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
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
                        '& > :not(style)': { m: 1, width: '18rem' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Last name"
                        variant="outlined"
                        name='lastName'
                        onChange={(e) => handleCredentials(e)}
                        sx={{
                            '& .MuiInputBase-input': {
                                fontFamily: 'Poppins',
                            },
                            '& .MuiFormLabel-root.MuiInputLabel-root, & .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                                fontFamily: 'Poppins',
                            },
                            '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
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
                        '& > :not(style)': { m: 1, width: '18rem' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Phone number"
                        variant="outlined"
                        name='phoneNumber'
                        onChange={(e) => handleCredentials(e)}
                        sx={{
                            '& .MuiInputBase-input': {
                                fontFamily: 'Poppins',
                            },
                            '& .MuiFormLabel-root.MuiInputLabel-root, & .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                                fontFamily: 'Poppins',
                            },
                            '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
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
                            '& .MuiFormLabel-root.MuiInputLabel-root, & .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                                fontFamily: 'Poppins',
                            },
                            '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
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
                    <button className='rounded bg-custom-orange h-12 w-72 text-white text-lg mt-3 hover:bg-[#eb6902]' onClick={(e) => handleSignup(e)}>Sign up</button>
                </Link>
                <Link to="/signIn">
                    <button className='text-gray-400 text-sm mt-2'>Already have an account?</button>
                </Link>
                <div className='mt-2 self-center text-red-500'>{errorState}</div>
            </div>
        </>
    )
}

export default SignUp