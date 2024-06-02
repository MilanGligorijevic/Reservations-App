import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'

interface ReservationLocation {
    handleReservationLocation: Function
    reservationLocation: string,
    locationOptions: string[],
}

function ReservationLocation({ reservationLocation, handleReservationLocation, locationOptions }: ReservationLocation) {
    return (
        <FormControl
            sx={{
                width: '16rem',
                '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                    fontFamily: 'Poppins',
                },
                '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
                    color: '#313131',
                },
                '& .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
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