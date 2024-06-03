import React from 'react'
import { FacebookIcon } from '../../../assets/svg/FacebookIcon'
import { InstagramIcon } from '../../../assets/svg/InstagramIcon'
import { TwitterIcon } from '../../../assets/svg/TwitterIcon'

function Footer() {
    return (
        <div className='relative bg-custom-black text-white'>
            <div className='flex justify-center items-start gap-20 p-6 h-36'>
                <div>
                    <h1 className='text-custom-orange'>COMPANY</h1>
                    <p className='cursor-pointer'>About</p>
                    <p className='cursor-pointer'>Purpose</p>
                    <p className='cursor-pointer'>Careers</p>
                </div>
                <div>
                    <h1 className='text-custom-orange'>USEFUL LINKS</h1>
                    <p className='cursor-pointer'>Support</p>
                    <p className='cursor-pointer'>Contact</p>
                </div>
                <div>
                    <h1 className='text-custom-orange'>SOCIALS</h1>
                    <div className='flex gap-3 justify-center'>
                        <FacebookIcon color={'#ffffff'} />
                        <InstagramIcon color={'#ffffff'} />
                        <TwitterIcon color={'#ffffff'} />
                    </div>
                </div>
            </div>
            <hr className='w-[98%] mx-auto my-0'></hr>
            <div className='text-center p-3'>
                <div>  <span>© 2024 <a href="https://github.com/MilanGligorijevic/Reservations-App" target='_blank' rel="noreferrer" className='text-custom-orange'>hungry</a></span>. All rights reserved. by <span><a href="https://github.com/MilanGligorijevic" target='_blank' rel="noreferrer">MG</a></span></div>
            </div>
        </div>
    )
}

export default Footer