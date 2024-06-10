import { useMediaQuery } from '@mui/material';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface RestaurantPreviewGeomapProps {
    id: string,
    image: string,
    name: string,
    address: string,
    handleGeolocation: Function,
}

function RestaurantPreviewGeomap({ id, name, image, address, handleGeolocation }: RestaurantPreviewGeomapProps) {
    const navigateToLocal = useNavigate();

    const isTablet = useMediaQuery(
        `(max-width: 935px)`,
    );

    function handleClick() {
        if (isTablet) {
            navigateToLocal(`/singleLocal/${id}`);
        } else {
            handleGeolocation(address);
        }
    }

    return (
        <div className='p-5 hover:bg-gray-100 cursor-pointer md:hover:bg-white' onClick={handleClick}>
            <img src={image} alt={name} className='h-56 w-[100%] object-cover' />
            <p className='mt-2 text-lg font-medium sm:text-base'>{name}</p>
            <div className='flex'>
                <p className='text-base sm:text-sm'>{address}</p>
                <Link to={`/singleLocal/${id}`} className='text-sm text-custom-orange hover:underline ml-auto md:hidden'>View details</Link>
            </div>
        </div>
    )
}

export default RestaurantPreviewGeomap