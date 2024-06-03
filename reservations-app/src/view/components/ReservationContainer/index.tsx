import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { SelectChangeEvent } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { getReservedHours } from '../../../firebase/config';
import ReservationDate from '../ReservationDate';
import ReservationTime from '../ReservationTime';
import ReservationGuests from '../ReservationGuests';
import { getWorkingHours } from '../../../utilities/functions';

interface ReservationContainerProps {
    openingHours: string,
    closingHours: string,
    localName: string
}

function ReservationContainer({ openingHours, closingHours, localName }: ReservationContainerProps) {
    let { localId } = useParams();
    const [guestsNumber, setGuestsNumber] = useState<number>(2);
    const [reservationDate, setReservationDate] = useState<dayjs.Dayjs | null>(dayjs(new Date()));
    const [reservationTime, setReservationTime] = useState<string>((new Date().getHours() + 1).toString() + ":00");
    const workingHours = getWorkingHours(parseInt(openingHours), parseInt(closingHours));
    const [reservedHours, setReservedHours] = useState<Array<string>>();

    useEffect(() => {
        async function fetchReservedHours() {
            const hours = await getReservedHours(localId, reservationDate?.format('DD MMMM YYYY'));
            setReservedHours(hours);
        }
        fetchReservedHours();
    }, [reservationDate])


    function addNumOfGuests() {
        setGuestsNumber(prevCount => prevCount + 1);
    }

    function subtractNumOfGuests() {
        setGuestsNumber(prevCount => prevCount - 1);
    }

    function handleReservationDate(date: dayjs.Dayjs | null) {
        setReservationDate(date);
    }

    function handleReservationTime(event: SelectChangeEvent) {
        setReservationTime(event.target.value);
    }


    return (
        <div className='h-80 min-w-[19rem] shadow rounded flex flex-col items-center gap-5 py-5'>
            <ReservationGuests guestsNumber={guestsNumber} addNumOfGuests={addNumOfGuests} subtractNumOfGuests={subtractNumOfGuests} />
            <ReservationDate reservationDate={reservationDate} handleReservationDate={(newValue: any) => handleReservationDate(newValue)} />
            <ReservationTime handleReservationTime={(newValue: any) => handleReservationTime(newValue)} reservationTime={reservationTime} reservationDate={reservationDate} reservedHours={reservedHours} workingHours={workingHours} />
            <Link to={`/reservation/${localId}/${localName}/${guestsNumber}/${reservationDate?.format('DD MMMM YYYY')}/${reservationTime}`}>
                <button className='rounded bg-custom-orange h-14 w-64 text-white text-lg hover:bg-[#eb6902]'>Book</button>
            </Link>
        </div>
    )
}

export default ReservationContainer