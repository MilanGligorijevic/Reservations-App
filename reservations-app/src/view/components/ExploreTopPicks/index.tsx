import React, { useEffect, useState } from 'react'
import { useLocals } from '../../../context/localsContext';
import RestaurantPreview from '../RestaurantPreview';
import { Link } from 'react-router-dom';


function ExploreTopPicks() {
    const locals = useLocals();
    const topLocals = [locals[0], locals[1], locals[2], locals[3]]

    return (
        <div className='w-9/12 mt-10 mb-20'>
            <div className='flex justify-between items-center my-5'>
                <h1 className='text-3xl font-medium'>Explore top restaurants</h1>
                <Link to="/localsGeomap" className='text-lg text-custom-orange self-end'>Explore all</Link>
            </div>
            <div className='flex gap-5'>
                {topLocals.map((local) => {
                    return <RestaurantPreview key={local.id} id={local.id} image={local.images[0]} name={local.name} address={local.address} />
                })}
            </div>
        </div>
    )
}

export default ExploreTopPicks