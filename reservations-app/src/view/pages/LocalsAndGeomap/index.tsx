import React, { useEffect, useState } from 'react'
import LocalsList from '../../components/LocalsList'
import { useLocals } from '../../../context/localsContext'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSearchParams } from 'react-router-dom';
import Local from '../../../types/local';
import NavbarMobile from '../../components/NavbarMobile';

function LocalsAndGeomap() {
    const locals = useLocals();
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const time = searchParams.get('time');
    const [searchLocals, setSearchLocals] = useState<Array<Local>>(locals);

    useEffect(() => {
        if (category) {
            const searchLocalsFiltered = locals.filter((local) => {
                return local.tags.includes(category.toLocaleLowerCase());
            }, [])
            setSearchLocals(searchLocalsFiltered);
        }
        if (city && time) {
            const searchLocalsFiltered = locals.filter((local) => {
                return (local.city.toLowerCase() === city.toLowerCase() && local.closingHours >= time);
            }, [])
            setSearchLocals(searchLocalsFiltered);
        }
    }, [])

    return (
        <>
            <Navbar />
            <NavbarMobile />
            <div className='flex md:mt-10'>
                <LocalsList localsList={searchLocals} />
            </div>
            <Footer />
        </>
    )
}

export default LocalsAndGeomap