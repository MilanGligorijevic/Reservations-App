import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'

interface ReservationTimeProps {
    reservationTime: string,
    handleReservationTime: Function,
    workingHours?: number[],
    reservedHours?: string[] | undefined,
}

function ReservationTime({ reservationTime, handleReservationTime, workingHours, reservedHours }: ReservationTimeProps) {
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
                },

            }}
        >
            <Select
                inputProps={{ 'aria-label': 'Without label' }}
                value={reservationTime}
                onChange={(newValue) => handleReservationTime(newValue)}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            maxHeight: 300,
                        },
                    },
                }}
            >
                {workingHours?.map((time) => {
                    return (
                        <MenuItem
                            key={time}
                            sx={{
                                fontFamily: 'Poppins',
                            }}
                            disabled={(reservedHours?.includes(time + ':00') ? true : false) || (time <= new Date().getHours())}
                            value={time + ':00'}>
                            {time + ":00"}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

export default ReservationTime