import React, { useEffect, useState } from 'react'
import { useLocals } from '../../../context/localsContext';
import RestaurantPreview from '../RestaurantPreview';
import restaurantPreview1 from '../../../assets/img/restaurantPreview1.jpg';
import restaurantPreview2 from '../../../assets/img/restaurantPreview2.jpg';


function ExploreTopPicks() {
    const locals = useLocals();

    return (
        <div className='w-9/12 mt-10 mb-20'>
            <h1 className='text-3xl font-medium my-5'>Explore top restaurants</h1>
            <div className='flex gap-5'>
                {locals.map((local) => {
                    return <RestaurantPreview id={local.id} image={restaurantPreview1} name={local.name} address={local.address} />
                })}
            </div>
        </div>
    )
}

export default ExploreTopPicks