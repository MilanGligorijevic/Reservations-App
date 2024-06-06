import React, { useEffect, useRef } from 'react'
import LocationMap from '../LocationMap'
import { FacebookIcon } from '../../../assets/svg/FacebookIcon'
import { InstagramIcon } from '../../../assets/svg/InstagramIcon'
import { motion, useInView } from 'framer-motion'


interface InfoLocalProps {
    address: string,
    website: string,
    email: string,
    name: string,
    city?: string,
    phoneNumber?: string,
    openingHours?: string,
    closingHours?: string,
    facebook?: string,
    instagram?: string,
}

function InfoLocal({ address, website, email, name, city, phoneNumber, openingHours, closingHours, facebook, instagram }: InfoLocalProps) {

    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const additionalInfoVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: .08,
                staggerChildren: 0.2,
            }
        }
    }

    const infoVariants = {
        hidden: {
            opacity: 0,
            y: -50,
        },
        visible: {
            opacity: 1,
            y: 0,
        }
    }

    return (
        <>
            <h2 className='text-3xl font-medium mb-3'>Additional information</h2>
            <div className='flex gap-6 mb-20' ref={ref}>
                <LocationMap address={address} />
                {inView && <motion.div
                    className='text-lg'
                    initial="hidden"
                    animate="visible"
                    variants={additionalInfoVariants}
                >
                    <motion.p className='mb-3 border-b pb-2' variants={infoVariants}>{name}</motion.p>
                    <motion.p className='mb-3 border-b pb-2' variants={infoVariants}>{address}</motion.p>
                    <motion.p className='mb-3 border-b pb-2' variants={infoVariants}>{city}</motion.p>
                    <motion.p className='mb-3 border-b pb-2' variants={infoVariants}>{phoneNumber}</motion.p>
                    <motion.p className='mb-3 border-b pb-2' variants={infoVariants}>{email}</motion.p>
                    <motion.p className='mb-3 border-b pb-2' variants={infoVariants}><a href={website} target='_blank' rel="noreferrer">{website}</a></motion.p>
                    <motion.p className='mb-5 border-b pb-2' variants={infoVariants}>Working hours: {openingHours} - {closingHours}</motion.p>
                    <motion.div className='flex gap-2' variants={infoVariants}>
                        <a href={facebook} target='_blank' rel='noreferrer'><FacebookIcon color={'#F96D00'} /></a>
                        <a href={instagram} target='_blank' rel='noreferrer'><InstagramIcon color={'#F96D00'} /></a>
                    </motion.div>
                </motion.div>}
            </div >
        </>
    )
}

export default InfoLocal