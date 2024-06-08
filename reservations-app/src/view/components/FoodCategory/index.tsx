import React from 'react'
import { Link } from 'react-router-dom'

interface FoodCategoryProps {
    category: string,
    image: string,
}

function FoodCategory({ category, image }: FoodCategoryProps) {
    return (
        <Link to={`/localsGeomap?category=${category}`} className='h-[25rem] w-[17rem] md:w-[48%] '>
            <img src={image} alt={category} className='h-[23rem] w-[17rem] object-cover md:w-[100%] sm:h-56' />
            <p className='my-1 text-lg font-medium sm:text-xl sm:p-1.5'>{category}</p>
        </Link>
    )
}

export default FoodCategory