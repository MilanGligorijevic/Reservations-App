import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import React from 'react'

interface ReservationDateProps {
    reservationDate: dayjs.Dayjs | null,
    handleReservationDate: Function,
}

function ReservationDate({ reservationDate, handleReservationDate }: ReservationDateProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className='absolute'
                defaultValue={dayjs(new Date())}
                minDate={dayjs(new Date())}
                maxDate={dayjs().add(1, 'month')}
                value={reservationDate}
                onChange={(newValue) => handleReservationDate(newValue)}
                sx={{
                    width: '16rem',
                    '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                        fontFamily: 'Poppins',
                    },
                    '& .css-i4bv87-MuiSvgIcon-root': {
                        color: '#313131',
                    },
                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#F96D00"
                    }
                }}
            />
        </LocalizationProvider>
    )
}

export default ReservationDate