import { motion } from 'framer-motion';

export const TaskCompleted = () => {
    const drawSvgVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => {
            const delay = 1 + i * 0.5;
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            };
        }
    }

    return (
        <motion.svg initial="hidden" animate="visible" width="350px" height="350px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

            <g id="SVGRepo_iconCarrier"> <motion.path variants={drawSvgVariants} custom={0.2} d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#F96D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <motion.path variants={drawSvgVariants} custom={0.2} d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#F96D00" strokeWidth="1.5" strokeLinecap="round" /> </g>

        </motion.svg>
    )
} 