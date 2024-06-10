import { Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Local from '../../../types/local';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { addNewLocalToFirebase } from '../../../firebase/config';
import { isValidPhoneNumber } from '../../../utilities/functions';
import { useCurrentUser } from '../../../context/userContext';


function AddLocalPage() {
  //srediti ovu stranicu vremenom, nepregledna, puno ponovljenog koda
  const [localData, setLocalData] = useState<Local>({
    id: uuidv4(),
    name: "",
    about: "",
    address: "",
    city: "",
    images: [],
    tags: [],
    openingHours: "",
    closingHours: "",
    website: "",
    email: "",
    phoneNumber: "",
    instagram: "",
    facebook: "",
  });
  const [tag, setTag] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [localAdded, setLocalAdded] = useState<boolean>(false);
  const [showPage, setShowPage] = useState<boolean>(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser.user?.firstName === 'admin') setShowPage(true); //prikaz stranice samo za admin usera, mozda dodati kompleksniju logiku ali radi posao za sad
  }, [currentUser.user])

  function handleLocalData(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setLocalData({ ...localData, [e.target.name]: e.target.value })
    console.log(localData)
  }

  function handleImageInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setImage(e.target.value);
  }

  function handleTagInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setTag(e.target.value);
  }

  function addNewImage() {
    setLocalData({ ...localData, images: [...localData.images, image] })
  }

  function addNewTag() {
    setLocalData({ ...localData, tags: [...localData.tags, tag] })
  }



  function checkDataInput() {
    setErrorMessage("");
    if (localData.id
      && localData.name
      && localData.about
      && localData.address
      && localData.city
      && localData.images
      && localData.tags
      && localData.openingHours
      && localData.closingHours
      && localData.website
      && localData.instagram
      && localData.facebook
      && localData.email
      && localData.phoneNumber
      && localData.email.includes('@')
      && isValidPhoneNumber(localData.phoneNumber)
      && isValidWorkingHours(localData.openingHours, localData.closingHours)) {
      return true;
    }
    setErrorMessage("Please fill all fields with valid values");
    return false;
  }

  function isValidWorkingHours(hour1: string, hour2: string) {
    const regex = /^(1[0-9]|2[0-4]|[1-9]):00$/;
    return regex.test(hour1) && regex.test(hour2);
  }


  function addNewLocal() {
    if (checkDataInput()) {
      addNewLocalToFirebase(localData);
      setLocalAdded(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500)
    };
  }

  return (
    <>
      <nav className='h-20 bg-white text-center mt-7'>
        <Link to="/" className='text-custom-orange text-3xl'>hungry</Link>
      </nav>
      {showPage && <div className=' w-9/12 mx-auto'>
        <h1 className='text-3xl text-center mt-5 mb-12'>Add new local</h1>
        {errorMessage && <h2 className='text-xl text-center mb-7 text-red-500'>{errorMessage}</h2>}
        {localAdded && <h2 className='text-xl text-center mb-7 text-green-500'>Local successfully added!</h2>}
        <div className='flex gap-7 justify-center'>
          <div>
            <h1 className='text-2xl'>General info</h1>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Local name"
                variant="outlined"
                name='name'
                onChange={(e) => handleLocalData(e)}
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
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-textarea"
                label="About local"
                variant="outlined"
                multiline
                name='about'
                onChange={(e) => handleLocalData(e)}
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
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                name='city'
                onChange={(e) => handleLocalData(e)}
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
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                name='address'
                onChange={(e) => handleLocalData(e)}
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
          </div>
          <div>
            <h1 className='text-2xl'>Contact info</h1>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name='email'
                onChange={(e) => handleLocalData(e)}
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
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Phone number"
                variant="outlined"
                name='phoneNumber'
                onChange={(e) => handleLocalData(e)}
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
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Website"
                variant="outlined"
                name='website'
                onChange={(e) => handleLocalData(e)}
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
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Facebook"
                variant="outlined"
                name='facebook'
                onChange={(e) => handleLocalData(e)}
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
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Instagram"
                variant="outlined"
                name='instagram'
                onChange={(e) => handleLocalData(e)}
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
          </div>
          <div>
            <h1 className='text-2xl'>Working hours</h1>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Opening hours (e.g. 9:00)"
                variant="outlined"
                name='openingHours'
                onChange={(e) => handleLocalData(e)}
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
                '& > :not(style)': { my: 1, width: '18rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Closing hours (e.g. 20:00)"
                variant="outlined"
                name='closingHours'
                onChange={(e) => handleLocalData(e)}
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
          </div>

          <div className='flex flex-col h-max'>
            <h1 className='text-2xl'>Additional info</h1>
            <div className='flex gap-1 items-center'>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { my: 1, width: '16rem' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Image url"
                  variant="outlined"
                  name='images'
                  onChange={(e) => handleImageInput(e)}
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
              <button className='text-custom-orange h-10 w-10 text-4xl' onClick={addNewImage}>+</button>
            </div>
            <div className='flex gap-1 items-center'>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { my: 1, width: '16rem' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic-tag"
                  label="Tag"
                  variant="outlined"
                  name='tags'
                  onChange={(e) => handleTagInput(e)}
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
              <button className='text-custom-orange h-10 w-10 text-4xl' onClick={addNewTag}>+</button>
            </div>
            <button className='rounded bg-custom-orange h-12 w-72 text-white text-lg hover:bg-[#eb6902] mt-48' onClick={addNewLocal}>Add local</button>
          </div>
        </div>
      </div>}
    </>
  )
}

export default AddLocalPage