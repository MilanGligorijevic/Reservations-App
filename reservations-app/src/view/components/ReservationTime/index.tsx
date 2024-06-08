import { FormControl, MenuItem, Select } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import React from 'react'

interface ReservationTimeProps {
    reservationTime: string,
    reservationDate: Dayjs | null,
    handleReservationTime: Function,
    workingHours?: number[],
    reservedHours?: string[] | undefined,
}

function ReservationTime({ reservationTime, reservationDate, handleReservationTime, workingHours, reservedHours }: ReservationTimeProps) {

    function reservationDateIsToday() {
        return reservationDate?.format('DD-MM-YYYY') === dayjs(new Date()).format('DD-MM-YYYY') ? true : false;
    }

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
                            disabled={(reservedHours?.includes(time + ':00') ? true : false) || (reservationDateIsToday() && time <= new Date().getHours())}
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