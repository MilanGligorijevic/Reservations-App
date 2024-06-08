import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'

interface ReservationLocationProps {
    handleReservationLocation: Function
    reservationLocation: string,
    locationOptions: string[],
}

function ReservationLocation({ reservationLocation, handleReservationLocation, locationOptions }: ReservationLocationProps) {
    return (
        <FormControl
            sx={{
                width: '16rem',
                '& .MuiInputBase-input': {
                    fontFamily: 'Poppins',
                },
                '& .MuiSvgIcon-root': {
                    color: '#313131',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: "#F96D00"
                }
            }}
        >
            <Select
                inputProps={{ 'aria-label': 'Without label' }}
                value={reservationLocation}
                onChange={(newValue) => handleReservationLocation(newValue)}
            >
                {locationOptions?.map((location) => {
                    return (
                        <MenuItem
                            key={location}
                            sx={{
                                fontFamily: 'Poppins',
                            }}
                            value={location}>
                            {location}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

export default ReservationLocation