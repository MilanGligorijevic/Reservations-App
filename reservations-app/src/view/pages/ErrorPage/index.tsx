import React from 'react'
import Navbar from '../../components/Navbar'
import NavbarMobile from '../../components/NavbarMobile'
import Footer from '../../components/Footer'
import { ColdFood } from '../../../assets/svg/ColdFood'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <>
            <Navbar />
            <NavbarMobile />
            <div className='h-[80vh] flex flex-col items-center md:mt-10'>
                <div>
                    <ColdFood />
                </div>
                <h1 className='text-2xl mb-2 sm:text-xl'>Your <span className='text-custom-orange'>food</span> is getting cold!</h1>
                <h1 className='text-xl text-center sm:text-lg sm:text-wrap sm:px-5'>Try refreshing the page or navigate to <Link to="/" className='text-custom-orange'>Home</Link></h1>
            </div>
            <Footer />
        </>
    )
}

export default ErrorPage