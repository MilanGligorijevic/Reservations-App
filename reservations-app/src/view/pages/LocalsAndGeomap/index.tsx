import React, { useEffect, useState } from 'react'
import LocalsList from '../../components/LocalsList'
import { useLocals } from '../../../context/localsContext'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSearchParams } from 'react-router-dom';
import Local from '../../../types/local';

function LocalsAndGeomap() {
    const locals = useLocals();
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [searchLocals, setSearchLocals] = useState<Array<Local>>(locals);

    useEffect(() => {
        if (category) {
            const searchLocalsFiltered = locals.filter((local) => {
                return local.tags.includes(category.toLocaleLowerCase());
            }, [])
            setSearchLocals(searchLocalsFiltered);
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className='flex'>
                <LocalsList localsList={searchLocals} />
            </div>
            <Footer />
        </>
    )
}

export default LocalsAndGeomap