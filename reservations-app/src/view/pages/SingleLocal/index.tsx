import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ImagesContainer from '../../components/ImagesContainer'
import AboutLocal from '../../components/AboutLocal'
import InfoLocal from '../../components/InfoLocal'
import ReservationContainer from '../../components/ReservationContainer'
import { useParams } from 'react-router-dom'
import Local from '../../../types/local'
import { getSingleLocalData } from '../../../firebase/config'
import NavbarMobile from '../../components/NavbarMobile'
import ImagesContainerMobile from '../../components/ImagesContainerMobile'

function SingleLocal() {
    let { localId } = useParams();
    const [local, setLocal] = useState<Local>();



    useEffect(() => {
        async function fetchSingleLocalData() {
            const localData = await getSingleLocalData(localId)
            localId ? localData.id = localId : console.log("Local has no ID");
            setLocal(localData);
        }
        fetchSingleLocalData();
    }, [localId])


    return (
        <>
            <Navbar />
            <NavbarMobile />
            {local && <ImagesContainerMobile imagesArray={local.images} />}

            {local && <div className='w-[64vw] mx-auto xl:w-4/5 md:mt-10'>
                <ImagesContainer imagesArray={local.images} />
                <div className='flex gap-10 mb-14 ms:flex-col'>
                    <AboutLocal localData={local} />
                    <ReservationContainer openingHours={local.openingHours} closingHours={local.closingHours} localName={local.name} />
                </div>
                <InfoLocal
                    address={local.address}
                    name={local.name}
                    website={local.website}
                    email={local.email}
                    city={local.city}
                    phoneNumber={local.phoneNumber}
                    openingHours={local.openingHours}
                    closingHours={local.closingHours}
                    facebook={local.facebook}
                    instagram={local.instagram} />
            </div>}
            <Footer />
        </>
    )
}

export default SingleLocal