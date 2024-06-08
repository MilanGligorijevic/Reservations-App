import React from 'react'
import AddToFavorites from '../AddToFavorites'
import Local from '../../../types/local'

interface AboutLocalProps {
    localData: Local,
}

function AboutLocal({ localData }: AboutLocalProps) {
    return (
        <div className='grow'>
            <div className='text-4xl font-medium flex items-center justify-between mb-3 lg:text-2xl'>{localData.name} <AddToFavorites localData={localData} /></div>
            <p className='text-lg font-medium mb-3 lg:text-base'>{localData.city}, Food & Drinks</p>
            <div className="text-lg lg:text-base sm:text-sm">{localData.about}</div>
        </div>
    )
}

export default AboutLocal