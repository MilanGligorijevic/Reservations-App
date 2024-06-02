import React from 'react'
import { DateIcon } from '../../../assets/svg/DateIcon'
import { TimeIcon } from '@mui/x-date-pickers/icons'
import { GuestIcon } from '../../../assets/svg/GuestIcon'

interface ReservationDetailsProps {
    localName: string | undefined,
    reservationDate: string | undefined,
    reservationTime: string | undefined,
    guestsNumber: string | undefined,
}

function ReservationDetails({ localName, reservationDate, reservationTime, guestsNumber }: ReservationDetailsProps) {
    return (
        <div className='border-t border-b py-2'>
            <h2 className='text-custom-orange text-xl font-medium mb-2'>{localName}</h2>
            <div className='flex items-center gap-2.5 ml-1 mb-2'><DateIcon /> {reservationDate}</div>
            <div className='flex items-center gap-2 ml-0.5 mb-1.5'><TimeIcon /> {reservationTime}</div>
            <div className='flex items-center gap-2'><GuestIcon /> {guestsNumber} {guestsNumber && parseInt(guestsNumber) > 1 ? 'guests' : 'guest'}</div>
        </div>
    )
}

export default ReservationDetails