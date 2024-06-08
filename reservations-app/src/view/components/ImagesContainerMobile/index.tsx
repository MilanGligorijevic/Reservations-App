import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ImagesGalery from '../ImagesGalery'
import { duration } from '@mui/material';

interface ImagesContainerMobileProps {
    imagesArray: Array<string>,
}

function ImagesContainerMobile({ imagesArray }: ImagesContainerMobileProps) {
    const [showImagesGalery, setShowImagesGalery] = useState<boolean>(false);
    const galeryRef = useRef(null);

    const imageContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: .3,
                staggerChildren: 0.35,
            }
        }
    }


    const imagesVariants = {
        hidden: {
            opacity: 0,
            y: -80,
        },
        visible: {
            opacity: 1,
            y: 0,
        }
    }

    const openGaleryVariants = {
        hidden: {},
        visible: {
            transition: {
                duration: .25,
            },
            opacity: [0, 0.3, 0.5, 0.8, 1]
        }
    }

    function openImagesGalery() {
        setShowImagesGalery(true);
    }

    function handleClickOutside(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (galeryRef.current === event.target) {
            setShowImagesGalery(false);
        }
    }

    return (
        <>
            {showImagesGalery &&
                <motion.div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-10"
                    ref={galeryRef}
                    onClick={(e) => handleClickOutside(e)}
                    initial="hidden"
                    animate="visible"
                    variants={openGaleryVariants}
                >
                    <ImagesGalery imagesArray={imagesArray} />
                </motion.div>}
            <motion.div
                className='hidden  sm:block sm:h-60 sm:mb-6'
                initial="hidden"
                animate="visible"
                variants={imageContainerVariants}
            >
                <motion.div
                    className='cursor-pointer h-full'
                    variants={imagesVariants}
                    onClick={() => openImagesGalery()}
                >
                    <img src={imagesArray[0]} alt='local main' className='h-full w-full' />
                </motion.div>
            </motion.div>
        </>
    )
}

export default ImagesContainerMobile