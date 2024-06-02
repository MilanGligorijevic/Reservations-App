import React, { useEffect, useState } from 'react'
import ReservationDate from '../ReservationDate'
import dayjs from 'dayjs';
import ReservationTime from '../ReservationTime';
import { SelectChangeEvent, duration } from '@mui/material';
import { getWorkingHours } from '../../../utilities/functions';
import ReservationGuests from '../ReservationGuests';
import ReservationLocation from '../ReservationLocation';
import { SearchIcon } from '../../../assets/svg/SearchIcon';
import { easeIn, easeInOut, motion } from 'framer-motion';

function HomePageReservationBar() {

    const [reservationDate, setReservationDate] = useState<dayjs.Dayjs | null>(dayjs(new Date()));
    const [reservationTime, setReservationTime] = useState<string>("12:00");
    const [reservationLocation, setReservationLocation] = useState<string>("Belgrade");
    const locationOptions: string[] = ["Belgrade", "Novi Sad", "Nis"];
    const workingHours = getWorkingHours(8, 24);
    const [guestsNumber, setGuestsNumber] = useState<number>(2);



    function handleReservationDate(date: dayjs.Dayjs | null) {
        setReservationDate(date);
    }

    function handleReservationTime(event: SelectChangeEvent) {
        setReservationTime(event.target.value);
    }

    function addNumOfGuests() {
        setGuestsNumber(prevCount => prevCount + 1);
    }

    function subtractNumOfGuests() {
        setGuestsNumber(prevCount => prevCount - 1);
    }

    function handleReservationLocation(event: SelectChangeEvent) {
        setReservationLocation(event.target.value);
    }

    const reservationBarVariants = {
        hidden: {
            opacity: 0,
            y: -300,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.8,
                duration: 1.2,
                type: 'spring',
                stiffness: 100,
                damping: 20,
            }
        }
    }

    return (
        <motion.div className='w-9/12 flex p-5 shadow flex justify-around items-center rounded' variants={reservationBarVariants} initial="hidden" animate="animate">
            <ReservationLocation handleReservationLocation={(newValue: any) => handleReservationLocation(newValue)} reservationLocation={reservationLocation} locationOptions={locationOptions} />
            <ReservationDate reservationDate={reservationDate} handleReservationDate={(newValue: any) => handleReservationDate(newValue)} />
            <ReservationTime reservationTime={reservationTime} handleReservationTime={(newValue: any) => handleReservationTime(newValue)} workingHours={workingHours} />
            <ReservationGuests guestsNumber={guestsNumber} addNumOfGuests={addNumOfGuests} subtractNumOfGuests={subtractNumOfGuests} />
            <button>
                <SearchIcon />
            </button>
        </motion.div>
    )
}

export default HomePageReservationBar