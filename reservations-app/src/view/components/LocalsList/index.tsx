import React, { useState } from 'react'
import Local from '../../../types/local'
import RestaurantPreview from '../RestaurantPreview'
import RestaurantPreviewGeomap from '../RestaurantPreviewGeomap'
import LocationMap from '../LocationMap'


interface LocalsListProps {
    localsList: Local[],
}

function LocalsList({ localsList }: LocalsListProps) {
    const [localAddress, setLocalAddress] = useState<string>("");


    function handleGeolocation(address: string) {
        setLocalAddress(address);
        console.log(address);
    }

    return (
        <>
            <div className='mb-3 shadow w-1/4 h-screen overflow-scroll overflow-x-hidden xl:flex-grow md:px-8 md:h-fit md:overflow-y-hidden'>
                <div className='flex flex-col'>
                    {localsList.map((local) => {
                        return <RestaurantPreviewGeomap key={local.id} id={local.id} name={local.name} image={local.images[0]} address={local.address} handleGeolocation={handleGeolocation} />
                    })}
                </div>
            </div>
            <div className='w-3/4 mb-3 xl:w-2/3 md:hidden'>
                <LocationMap address={localAddress ? localAddress : "Belgrade"} fullScreen={true} />
            </div>
        </>
    )
}

export default LocalsList