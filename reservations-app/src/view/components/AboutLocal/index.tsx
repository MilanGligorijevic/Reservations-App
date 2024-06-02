import React from 'react'
import AddToFavorites from '../AddToFavorites'
import Local from '../../../types/local'

interface AboutLocalProps {
    localData: Local,
}

function AboutLocal({ localData }: AboutLocalProps) {
    return (
        <div className='grow'>
            <div className='text-4xl font-medium flex items-center justify-between mb-3'>{localData.name} <AddToFavorites localData={localData} /></div>
            <p className='text-xl font-medium mb-3'>{localData.name}</p>
            <div className="text-lg">{localData.about}</div>
        </div>
    )
}

export default AboutLocal