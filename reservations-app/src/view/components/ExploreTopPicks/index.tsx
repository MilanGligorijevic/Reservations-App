import React, { useEffect, useState } from 'react'
import { useLocals } from '../../../context/localsContext';
import RestaurantPreview from '../RestaurantPreview';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';


function ExploreTopPicks() {
    const locals = useLocals();
    const topLocals = [locals[0], locals[1], locals[2], locals[3]]

    const isMobile = useMediaQuery(
        `(max-width: 620px)`,
    );

    return (
        <div className='w-9/12 mt-10 mb-20 2xl:w-10/12'>
            <div className='flex justify-between items-center my-5'>
                <h1 className='text-3xl font-medium md:text-2xl sm:font-normal'>{isMobile ? "Top restaurants" : "Explore top restaurants"}</h1>
                <Link to="/localsGeomap" className='text-lg text-custom-orange self-end sm:text-base'>{isMobile ? "Explore" : "Explore all"}</Link>
            </div>
            <div className='flex gap-5 md:hidden'>
                {topLocals.map((local) => {
                    return <RestaurantPreview key={local.id} id={local.id} image={local.images[0]} name={local.name} address={local.address} />
                })}
            </div>
            <div className='hidden md:flex md:gap-5 sm:flex-wrap'>
                {topLocals.map((local, index) => {
                    if (index <= 2) {
                        return <RestaurantPreview key={local.id} id={local.id} image={local.images[0]} name={local.name} address={local.address} />
                    }
                })}
            </div>
        </div>
    )
}

export default ExploreTopPicks