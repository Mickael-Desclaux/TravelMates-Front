import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { useEffect, useRef, useState } from 'react';
import './Map.css';
import pinMarker from '../../assets/icons/pin-marker.svg';
import { renderToString } from 'react-dom/server';
import { Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import PinSearch from '../../components/PinSearch/PinSearch';
import { MapPin } from '../../interfaces/Pin';
import { GetPins } from '../../api/Pin';

export default function Map() {

    const navigate = useNavigate()

    // Used to pass map const to handleSearch function
    const mapRef = useRef<mapboxgl.Map | null>(null);

    // Pin data storage
    const [pins, setPins] = useState<MapPin[]>([])

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

    // Search for a marker by its title, regardless of case or accents
    function handleSearch(title: string) {
        if (mapRef.current) {
            const normalizedTitle = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            const pin = pins.find((pin) => {
                const normalizedPinTitle = pin.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return normalizedPinTitle.includes(normalizedTitle);
            });

            if (pin) {
                mapRef.current.flyTo({
                    center: [pin.longitude, pin.latitude],
                    zoom: 15,
                });
            } else {
                console.log("Titre non trouvé");
            }
        }
    }

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', // root id for the map
            center: [2.023056, 46.615102], // initial position
            zoom: 3.92, // initial zoom
            projection: 'equirectangular', // map style
        });
        mapRef.current = map;

        map.on('load', async () => {
            map.setConfigProperty('basemap', 'showPointOfInterestLabels', false);

            try {
                const data = await GetPins();
                setPins(data);

                const markers: mapboxgl.Marker[] = [];
                data.forEach((markerData) => {
                    const el = document.createElement('div');
                    el.innerHTML = `<img src="${pinMarker}" width="36" height="72">`;

                    // Popup triggered when pin is clicked
                    const popupContent = renderToString(
                        <div>
                            <Typography variant='h2' className='text-lg mt-2 mb-4'>{markerData.title}</Typography>
                            <div className='flex felx-row gap-2 mb-6'>
                                {markerData.pinActivities.map((activityObj) => (
                                    <div key={activityObj.activity}>
                                        <img
                                            src={`/activity/${activityObj.activity.toLowerCase()}.svg`}
                                            alt={activityObj.activity}
                                            className="h-9 w-9"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-center'>
                                <Button size='sm' className='bg-black' id={`btn-${markerData.id}`} type='button'>Voir plus</Button>
                            </div>
                        </div>
                    );

                    // Redirection to pin detail page
                    const popup = new mapboxgl.Popup()
                        .setHTML(popupContent)
                        .on('open', () => {
                            const button = document.getElementById(`btn-${markerData.id}`);
                            if (button) {
                                button.addEventListener('click', () => {
                                    navigate(`/pin/${markerData.id}`);
                                });
                            }
                        });

                    const marker = new mapboxgl.Marker(el, { anchor: 'center' })
                        .setLngLat([markerData.longitude, markerData.latitude])
                        .setPopup(popup);

                    markers.push(marker);
                });

                markers.forEach((marker) => marker.addTo(map));

            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        });

        return () => map.remove();
    }, [navigate]);

    return (
        <>
            <div className="flex justify-center md:mt-32 m-4 relative">
                <div id='map' style={{ width: '90vw', height: '90vh' }}>
                    <div className='absolute top-4 md:left-1/2 left-1/3 ms-4 z-10 transform -translate-x-1/2'>
                        <PinSearch onSearch={(title) => handleSearch(title)} suggestions={pins} />
                    </div>
                    <button id='add-pin' className='absolute bottom-12 right-4 z-10 bg-green w-12 h-12 flex justify-center items-center border rounded-lg'
                        onClick={() => navigate('/pin-create')}>
                        <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 2V6M6 6V10M6 6H10M6 6H2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
