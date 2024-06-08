import React from 'react'
import FoodCategory from '../FoodCategory'
import pizzaCategory from '../../../assets/img/pizzaCategory.jpg'
import pastaCategory from '../../../assets/img/pastaCategory.jpg'
import burgerCategory from '../../../assets/img/burgerCategory.jpg'
import sushiCategory from '../../../assets/img/sushiCategory.jpg'
import saladCategory from '../../../assets/img/saladCategory.jpg'
import './index.css'
import 'swiper/css';
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { useMediaQuery } from '@mui/material'

function PopularCategories() {

    const isMobile = useMediaQuery(
        `(max-width: 620px)`,
    );

    return (
        <div className='w-9/12 my-10 2xl:w-10/12 sm:mb-1'>
            <div className='flex justify-between items-center my-5'>
                <h1 className='text-3xl font-medium md:text-2xl sm:font-normal'>Popular categories</h1>
                {/* <Link to="/" className='text-lg text-custom-orange self-end'>Explore all</Link> */}
            </div>
            <div className='flex gap-5 xl:hidden'>
                <FoodCategory category='Pasta' image={pastaCategory} key='pasta' />
                <FoodCategory category='Burgers' image={burgerCategory} key='burger' />
                <FoodCategory category='Sushi' image={sushiCategory} key='sushi' />
                <FoodCategory category='Pizza' image={pizzaCategory} key='pizza' />
                <FoodCategory category='Salads' image={saladCategory} key='salad' />
            </div>
            {!isMobile ? <div className='hidden xl:flex xl:gap-5 md:flex-wrap md:justify-between'>
                <FoodCategory category='Pasta' image={pastaCategory} key='pasta' />
                <FoodCategory category='Burgers' image={burgerCategory} key='burger' />
                <FoodCategory category='Pizza' image={pizzaCategory} key='pizza' />
                <FoodCategory category='Salads' image={saladCategory} key='salad' />
            </div>
                :
                <Swiper
                    spaceBetween={7}
                    slidesPerView={1}
                    navigation={true}
                    modules={[Navigation]}
                >
                    <SwiperSlide>
                        <FoodCategory category='Pasta' image={pastaCategory} key='pasta' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FoodCategory category='Burgers' image={burgerCategory} key='burger' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FoodCategory category='Sushi' image={sushiCategory} key='sushi' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FoodCategory category='Pizza' image={pizzaCategory} key='pizza' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FoodCategory category='Salads' image={saladCategory} key='salad' />
                    </SwiperSlide>
                </Swiper>}
        </div>
    )
}

export default PopularCategories