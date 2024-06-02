import React from 'react'

interface ReservationGuestsProps {
    guestsNumber: number,
    subtractNumOfGuests: Function,
    addNumOfGuests: Function,
}

function ReservationGuests({ guestsNumber, subtractNumOfGuests, addNumOfGuests }: ReservationGuestsProps) {
    return (
        <div className='h-[56px] w-64 border-[1px] border-custom-white rounded p-2 flex items-center justify-between hover:border-black'>
            <div>
                <p className='ml-1'>{guestsNumber} {guestsNumber === 1 ? 'guest' : 'guests'}</p>
            </div>
            <div className='justify-self-end pr-1'>
                <button className='text-3xl custom-text-black px-3' disabled={guestsNumber <= 1} onClick={() => subtractNumOfGuests()}>-</button>
                <button className='text-3xl custom-text-black' disabled={guestsNumber >= 20} onClick={() => addNumOfGuests()}>+</button>
            </div>
        </div>
    )
}

export default ReservationGuests