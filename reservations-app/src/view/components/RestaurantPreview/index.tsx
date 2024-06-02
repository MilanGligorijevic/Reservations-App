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
        <Link to={`/singleLocal/${id}`} className='h-80 w-96 shadow'>
            <img src={image} alt={name} className='h-60 object-cover' />
            <p className='mx-2 mt-2 text-lg font-medium'>{name}</p>
            <p className='mx-2 text-base '>{address}</p>
        </Link>
    )
}

export default RestaurantPreview