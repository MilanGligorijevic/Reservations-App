import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ImagesGalery from '../ImagesGalery'
import { duration } from '@mui/material';

interface ImagesContainerProps {
    imagesArray: Array<string>,
}

function ImagesContainer({ imagesArray }: ImagesContainerProps) {
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
                className='h-[50vh] flex gap-1 mb-6'
                initial="hidden"
                animate="visible"
                variants={imageContainerVariants}
            >
                <motion.div
                    className='bg-custom-orange flex-1 cursor-pointer'
                    variants={imagesVariants}
                    onClick={() => openImagesGalery()}
                >
                    <img src={imagesArray[0]} alt='local main' className='h-full w-full' />
                </motion.div>
                <div className='w-[34%] flex flex-col gap-1 '>
                    <motion.div
                        className='bg-custom-black h-40 flex-1 cursor-pointer'
                        variants={imagesVariants}
                        onClick={() => openImagesGalery()}
                    >
                        <img src={imagesArray[1]} alt='local second' className='w-full h-full object-cover' />
                    </motion.div>
                    <motion.div
                        className='bg-custom-grey h-40 flex-1 cursor-pointer'
                        variants={imagesVariants}
                        onClick={() => openImagesGalery()}
                    >
                        <img src={imagesArray[2]} alt='local third' className='w-full h-full object-cover' />
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}

export default ImagesContainer