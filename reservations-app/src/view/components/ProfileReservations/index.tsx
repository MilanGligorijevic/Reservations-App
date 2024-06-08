import React from 'react'
import { Link } from 'react-router-dom'
import UserReservation from '../../../types/UsersReservation'
import ReservationDetails from '../ReservationDetails'

interface ProfileReservationsProps {
    usersReservations: UserReservation[],
    isOpen: boolean,
    handleClick: Function,
}


function ProfileReservations({ usersReservations, isOpen, handleClick }: ProfileReservationsProps) {
    return (
        <div className='w-9/12 p-5 shadow rounded cursor-pointer md:w-10/12' onClick={() => handleClick()}>
            <h1 className='text-3xl font-medium mb-3 sm:text-2xl'>My reservations</h1>
            {isOpen && <div>
                {usersReservations ?
                    <div className='flex flex-col gap-5'> {usersReservations.map((reservation) => {
                        return <ReservationDetails
                            key={reservation.localId + reservation.reservationDate + reservation.reservationTime}
                            localName={reservation.localName}
                            reservationDate={reservation.reservationDate}
                            reservationTime={reservation.reservationTime}
                            guestsNumber={reservation.numberOfGuests.toString()} />
                    })}</div>
                    :
                    <div>
                        <p className='text-xl mb-3'>You have no reservations at the moment</p>
                        <p className='text-xl mb-1'>Explore our <Link to="/" className='text-custom-orange'>top picks</Link> to make one!</p>
                    </div>}
            </div>}
        </div>
    )
}

export default ProfileReservations