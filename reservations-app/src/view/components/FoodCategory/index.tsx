import React from 'react'
import { Link } from 'react-router-dom'

interface FoodCategoryProps {
    category: string,
    image: string,
}

function FoodCategory({ category, image }: FoodCategoryProps) {
    return (
        <Link to="/" className='h-[25rem] w-[17rem] '>
            <img src={image} alt={category} className='h-[23rem] w-[17rem] object-cover' />
            <p className='my-1 text-lg font-medium'>{category}</p>
        </Link>
    )
}

export default FoodCategory