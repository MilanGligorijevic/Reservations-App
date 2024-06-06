import React from 'react'
import { Link } from 'react-router-dom'

interface RestaurantPreviewGeomapProps {
    id: string,
    image: string,
    name: string,
    address: string,
    handleGeolocation: Function,
}

function RestaurantPreviewGeomap({ id, name, image, address, handleGeolocation }: RestaurantPreviewGeomapProps) {

    function handleClick() {
        handleGeolocation(address);
    }

    return (
        <div className='p-5 hover:bg-gray-100 cursor-pointer' onClick={handleClick}>
            <img src={image} alt={name} className='h-56 w-[100%] object-cover' />
            <p className='mt-2 text-lg font-medium'>{name}</p>
            <div className='flex justify-between'>
                <p className=' text-base'>{address}</p>
                <Link to={`/singleLocal/${id}`} className='text-sm text-custom-orange hover:underline'>View details</Link>
            </div>
        </div>
    )
}

export default RestaurantPreviewGeomap