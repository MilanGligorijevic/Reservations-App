import React from 'react'
import TextField from '@mui/material/TextField';


function SearchBar() {
    return (
        <TextField
            id="filled-search"
            label="Find restaurant"
            type="search"
            variant="filled"
            sx={{
                width: '34vw',
                color: 'success.main',
                backgroundColor: '#FFFFFF',
                '& .css-1lfthva-MuiInputBase-input-MuiFilledInput-input': {
                    fontFamily: 'Poppins'
                },
                '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root': {
                    fontFamily: 'Poppins'
                },
                '& .css-batk84-MuiInputBase-root-MuiFilledInput-root': {
                    fontFamily: 'Poppins',
                    backgroundColor: '#FFFFFF',
                    '&::after': {
                        borderBottom: '2px solid #F96D00',
                    }
                },
                '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root': {
                    fontFamily: 'Poppins'
                },
                '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                    color: '#F96D00',
                }
            }}
        />
    )
}

export default SearchBar