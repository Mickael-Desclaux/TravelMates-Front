import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { useEffect, useRef, useState } from 'react';
import './Map.css';
import adventureIcon from '../../assets/activity/adventure.svg';
import cultureIcon from '../../assets/activity/culture.svg';
import relaxationIcon from '../../assets/activity/relaxation.svg';
import sportIcon from '../../assets/activity/sport.svg';
import partyIcon from '../../assets/activity/party-and-bar.svg';
import pinMarker from '../../assets/icons/pin-marker.svg';
import { renderToString } from 'react-dom/server';
import { Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import PinSearch from '../../components/PinSearch/PinSearch';
import { MapPin } from '../../interfaces/Pin';

export default function Map() {

    const navigate = useNavigate()

    // Used to pass map const to handleSearch function
    const mapRef = useRef<mapboxgl.Map | null>(null);

    // Pin data storage
    const [ pins, setPins ] = useState<MapPin[]>([])

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
        // Fake data
        const data: MapPin[] = [
            {
                id: 1,
                title: 'Tour Eiffel',
                activities: [
                    { id: 1, type: 'Museum', icon: cultureIcon },
                    { id: 2, type: 'Adventure', icon: adventureIcon },
                    { id: 3, type: 'Détente', icon: relaxationIcon },
                    { id: 5, type: 'Fête', icon: partyIcon },
                    { id: 4, type: 'Sport', icon: sportIcon }],
    
                latitude: 48.8584,
                longitude: 2.2945,
                rating: 4
            },
            {
                id: 2,
                title: 'Musée du Louvre',
                activities: [{ id: 1, type: 'Museum', icon: cultureIcon }, { id: 2, type: 'Adventure', icon: adventureIcon }],
                latitude: 48.8606,
                longitude: 2.3376,
                rating: 4
            },
            {
                id: 3,
                title: 'Cathédrale Notre-Dame',
                activities: [{ id: 1, type: 'Museum', icon: cultureIcon }, { id: 2, type: 'Adventure', icon: adventureIcon }],
                latitude: 48.8529,
                longitude: 2.3500,
                rating: 4
            },
            {
                id: 4,
                title: 'Arc de Triomphe',
                activities: [{ id: 1, type: 'Museum', icon: cultureIcon }, { id: 2, type: 'Adventure', icon: adventureIcon }],
                latitude: 48.8738,
                longitude: 2.2950,
                rating: 4
            },
            {
                id: 5,
                title: 'Basilique du Sacré-Cœur',
                activities: [{ id: 1, type: 'Museum', icon: cultureIcon }, { id: 2, type: 'Adventure', icon: adventureIcon }],
                latitude: 48.8867,
                longitude: 2.3431,
                rating: 4
            }
        ];

        setPins(data);

        const map = new mapboxgl.Map({
            container: 'map', // root id for the map
            center: [2.023056, 46.615102], // initial position
            zoom: 3.92, // initial zoom
            projection: 'equirectangular', // map style
        });

        mapRef.current = map;

        // Hide Mapbox POI (Points of interests)
        map.on('load', () => {
            map.setConfigProperty('basemap', 'showPointOfInterestLabels', false)
        })

        // Navigation controls
        map.addControl(new mapboxgl.NavigationControl());

        const markers: mapboxgl.Marker[] = [];

        data.forEach(function (markerData) {
            const el = document.createElement('div');
            el.innerHTML = `<img src="${pinMarker}" width="36" height="72">`;
        
            // Popup triggered when pin is clicked
            const popupContent = renderToString(
                <div>
                    <Typography variant='h2' className='text-lg mt-2 mb-4'>{markerData.title}</Typography>
                    <div className='flex felx-row gap-2 mb-6'>
                        {markerData.activities.map(activity => (
                            <img
                                key={activity.id}
                                src={activity.icon}
                                alt={activity.type}
                                className="h-9 w-9"
                            />
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
        })

        // Show/hide pins depending on zoom level
        map.on('zoomend', function () {

            const zoom = map.getZoom();

            markers.forEach(function (marker) {
                if (zoom >= 4) {
                    marker.addTo(map);
                }
                else {
                    marker.remove();
                }
            });
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
                    <button className='absolute bottom-12 right-4 z-10 bg-green w-12 h-12 flex justify-center items-center border rounded-lg'
                        onClick={() => navigate('/pin')}>
                        <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 2V6M6 6V10M6 6H10M6 6H2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

