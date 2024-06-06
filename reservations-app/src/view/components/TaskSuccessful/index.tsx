import React from 'react'
import { TaskCompleted } from '../../../assets/svg/TaskCompleted'
import { motion } from 'framer-motion';

function TaskSuccessful() {
    const bgVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: .3,
            }
        }
    }

    return (
        <motion.div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-10' variants={bgVariants} initial="hidden" animate="visible">
            <TaskCompleted />
        </motion.div>
    )
}

export default TaskSuccessful