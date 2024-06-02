import React from 'react'
import { useLocals } from '../../../context/localsContext';
import RestaurantPreview from '../RestaurantPreview';
import restaurantPreview1 from '../../../assets/img/restaurantPreview1.jpg';
import restaurantPreview2 from '../../../assets/img/restaurantPreview2.jpg';


function ExploreTopPicks() {
    const locals = useLocals();

    return (
        <div className='w-9/12 my-10'>
            <h1 className='text-3xl font-medium my-5'>Explore top restaurants</h1>
            <div className='flex gap-5'>
                <RestaurantPreview id={locals[0]?.id} image={restaurantPreview1} name={"Test name"} address={"Test address"} />
                <RestaurantPreview id={locals[1]?.id} image={restaurantPreview2} name={"Test name"} address={"Test address"} />
                <RestaurantPreview id={locals[0]?.id} image={restaurantPreview1} name={"Test name"} address={"Test address"} />
                <RestaurantPreview id={locals[1]?.id} image={restaurantPreview2} name={"Test name"} address={"Test address"} />
            </div>
        </div>
    )
}

export default ExploreTopPicks