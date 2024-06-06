import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react'
import { APIProvider, AdvancedMarker, Map, Marker } from "@vis.gl/react-google-maps";
import axios from 'axios';
import Geolocation from '../../../types/Geolocation';

interface LocationMapProps {
    address: string,
    fullScreen?: boolean,
}

function LocationMap({ address, fullScreen }: LocationMapProps) {
    const API_KEY = 'AIzaSyDouVcd15FUe08J0BlYwxcQif7OvRl3PRI';
    const MAP_ID = "9942db31a61abe6e";
    const encodedAddress = encodeURIComponent(address);
    const [geolocationData, setGeolocationData] = useState<Geolocation>();
    const [showMap, setShowMap] = useState<boolean>(false);

    useEffect(() => {
        const fetchGeolocationData = async () => {
            try {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`);
                setGeolocationData({ lat: response.data.results[0].geometry.location.lat, lng: response.data.results[0].geometry.location.lng });
                setShowMap(true);
            } catch (error) {
                console.error('Error fetching GeoLocation data:', error);
            }
        };

        fetchGeolocationData();
    }, [encodedAddress]);

    return (
        <APIProvider apiKey={API_KEY}>
            {showMap && <div className={fullScreen ? 'h-[100%] w-[100%]' : 'h-96 w-96'}>
                <Map defaultZoom={14} center={geolocationData} mapId={MAP_ID} streetViewControl={false} mapTypeControl={false}>
                    <AdvancedMarker position={geolocationData}></AdvancedMarker>
                </Map>
            </div>}
        </APIProvider>
    )
}

export default LocationMap