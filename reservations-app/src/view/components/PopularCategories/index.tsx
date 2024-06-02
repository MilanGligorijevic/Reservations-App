import React from 'react'
import FoodCategory from '../FoodCategory'
import pizzaCategory from '../../../assets/img/pizzaCategory.jpg'
import pastaCategory from '../../../assets/img/pastaCategory.jpg'
import burgerCategory from '../../../assets/img/burgerCategory.jpg'
import sushiCategory from '../../../assets/img/sushiCategory.jpg'
import saladCategory from '../../../assets/img/saladCategory.jpg'

function PopularCategories() {
    return (
        <div className='w-9/12 my-10'>
            <h1 className='text-3xl font-medium my-5'>Popular categories</h1>
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