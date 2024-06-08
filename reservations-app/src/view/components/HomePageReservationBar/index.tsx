import React, { useState } from 'react'
import ReservationDate from '../ReservationDate'
import dayjs from 'dayjs';
import ReservationTime from '../ReservationTime';
import { SelectChangeEvent } from '@mui/material';
import { getWorkingHours } from '../../../utilities/functions';
import ReservationGuests from '../ReservationGuests';
import ReservationLocation from '../ReservationLocation';
import { SearchIcon } from '../../../assets/svg/SearchIcon';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
        <motion.div className='w-9/12 flex p-5 shadow flex justify-around items-center rounded 2xl:w-10/12 xl:gap-6 md:mt-10 md:flex-wrap md:justify-around md:pl-5 md:relative' variants={reservationBarVariants} initial="hidden" animate="animate">
            <ReservationLocation handleReservationLocation={(newValue: any) => handleReservationLocation(newValue)} reservationLocation={reservationLocation} locationOptions={locationOptions} />
            <ReservationDate reservationDate={reservationDate} handleReservationDate={(newValue: any) => handleReservationDate(newValue)} />
            <ReservationTime reservationTime={reservationTime} reservationDate={reservationDate} handleReservationTime={(newValue: any) => handleReservationTime(newValue)} workingHours={workingHours} />
            <ReservationGuests guestsNumber={guestsNumber} addNumOfGuests={addNumOfGuests} subtractNumOfGuests={subtractNumOfGuests} />
            <Link to={`/localsGeomap?city=${reservationLocation}&time=${reservationTime}`} className='hidden md:block'>
                <button className='rounded bg-custom-orange h-12 w-64 text-white text-lg hover:bg-[#eb6902]'>Search</button>
            </Link>
            <Link to={`/localsGeomap?city=${reservationLocation}&time=${reservationTime}`} className='md:hidden'>
                <SearchIcon />
            </Link>
        </motion.div>
    )
}

export default HomePageReservationBar