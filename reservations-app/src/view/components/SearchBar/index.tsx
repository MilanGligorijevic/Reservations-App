import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { useLocals } from '../../../context/localsContext';
import { searchLocalsByInput } from '../../../utilities/functions';
import Local from '../../../types/local';
import { Link } from 'react-router-dom';


function SearchBar() {
    const [searchInput, setSearchInput] = useState<string>("");
    const locals = useLocals();
    const [searchResult, setSearchResult] = useState<Array<Local>>([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult(searchLocalsByInput(searchInput, locals));
            console.log(searchResult)
        }, 400)
    }, [searchInput])

    function handleSearchInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSearchInput(e.target.value);
    }
    return (
        <div className='relative'>
            <TextField
                id="filled-search"
                label="Find restaurant"
                type="search"
                variant="filled"
                value={searchInput}
                onChange={(e) => handleSearchInput(e)}
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
                    '& .css-batk84-MuiInputBase-root-MuiFilledInput-root.Mui-focused': {
                        backgroundColor: '#FFFFFF',
                    },
                    '& .css-batk84-MuiInputBase-root-MuiFilledInput-root:hover': {
                        backgroundColor: '#FFFFFF',
                    },
                    '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root': {
                        fontFamily: 'Poppins'
                    },
                    '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                        color: '#F96D00',
                    }
                }}
            />
            {searchInput && <div className='absolute bg-white w-full rounded-b shadow'>
                {searchResult.map((local) => {
                    return <div className='pl-3 py-2.5 hover:bg-gray-100'>
                        <Link to={`singleLocal/${local.id}`} >
                            <p>{local.name}</p>
                            <p className='text-sm opacity-85'>{local.city}</p>
                        </Link>
                    </div>
                })}
            </div>}
        </div>
    )
}

export default SearchBar