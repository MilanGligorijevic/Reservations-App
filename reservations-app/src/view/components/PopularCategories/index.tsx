import React from 'react'
import FoodCategory from '../FoodCategory'
import pizzaCategory from '../../../assets/img/pizzaCategory.jpg'
import pastaCategory from '../../../assets/img/pastaCategory.jpg'
import burgerCategory from '../../../assets/img/burgerCategory.jpg'
import sushiCategory from '../../../assets/img/sushiCategory.jpg'
import saladCategory from '../../../assets/img/saladCategory.jpg'
import { Link } from 'react-router-dom'

function PopularCategories() {
    return (
        <div className='w-9/12 my-10'>
            <div className='flex justify-between items-center my-5'>
                <h1 className='text-3xl font-medium'>Popular categories</h1>
                {/* <Link to="/" className='text-lg text-custom-orange self-end'>Explore all</Link> */}
            </div>
            <div className='flex gap-5'>
                <FoodCategory category='Pasta' image={pastaCategory} key='pasta' />
                <FoodCategory category='Burgers' image={burgerCategory} key='burger' />
                <FoodCategory category='Sushi' image={sushiCategory} key='sushi' />
                <FoodCategory category='Pizza' image={pizzaCategory} key='pizza' />
                <FoodCategory category='Salads' image={saladCategory} key='salad' />
            </div>
        </div>
    )
}

export default PopularCategories