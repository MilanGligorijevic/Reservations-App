import React from 'react'
import { Link } from 'react-router-dom'

interface RestaurantPreviewProps {
    id: string,
    image: string,
    name: string,
    address: string,
}

function RestaurantPreview({ id, name, image, address }: RestaurantPreviewProps) {
    return (
        <Link to={`/singleLocal/${id}`} className='h-80 w-96 shadow xl:h-[22rem] sm:w-full'>
            <img src={image} alt={name} className='h-60 object-cover sm:w-full sm:h-72' />
            <p className='mx-2 mt-2 text-lg font-medium 2xl:text-base'>{name}</p>
            <p className='mx-2 text-base xl:text-sm '>{address}</p>
        </Link>
    )
}

export default RestaurantPreview