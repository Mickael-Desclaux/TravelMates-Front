import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { useEffect } from 'react';
import './Map.css';
import { Activity } from '../../interfaces/TripProps/TripProps';
import adventureIcon from '../../assets/activity/adventure.svg';
import cultureIcon from '../../assets/activity/culture.svg';
import relaxationIcon from '../../assets/activity/relaxation.svg';
import sportIcon from '../../assets/activity/sport.svg';
import partyIcon from '../../assets/activity/party-and-bar.svg';
import pinMarker from '../../assets/icons/pin-marker.svg';
import { renderToString } from 'react-dom/server';
import { Button, Typography } from '@material-tailwind/react';

interface Pin {
    title: string;
    activities: Activity[];
    latitude: number;
    longitude: number;
    rating: number
}

export default function Map() {

    // Fake data
    const data: Pin[] = [
        {
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
            title: 'Musée du Louvre',
            activities: [{ id: 1, type: 'Museum', icon: cultureIcon }, { id: 2, type: 'Adventure', icon: adventureIcon }],
            latitude: 48.8606,
            longitude: 2.3376,
            rating: 4
        },
        {
            title: 'Cathédrale Notre-Dame',
            activities: [{ id: 1, type: 'Museum', icon: cultureIcon }, { id: 2, type: 'Adventure', icon: adventureIcon }],
            latitude: 48.8529,
            longitude: 2.3500,
            rating: 4
        },
        {
            title: 'Arc de Triomphe',
            activities: [{ id: 1, type: 'Museum', icon: cultureIcon }, { id: 2, type: 'Adventure', icon: adventureIcon }],
            latitude: 48.8738,
            longitude: 2.2950,
            rating: 4
        },
        {
            title: 'Basilique du Sacré-Cœur',
            activities: [{ id: 1, type: 'Museum', icon: cultureIcon }, { id: 2, type: 'Adventure', icon: adventureIcon }],
            latitude: 48.8867,
            longitude: 2.3431,
            rating: 4
        }
    ];

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', // ID de la div
            center: [2.023056, 46.615102], // Position initiale
            zoom: 3.92, // Niveau de zoom initial
            projection: 'equirectangular', // Projection carte
        });

        map.on('load', () => {
            map.setConfigProperty('basemap', 'showPointOfInterestLabels', false)
        })

        // Ajoute des contrôles de navigation
        map.addControl(new mapboxgl.NavigationControl());

        const markers: mapboxgl.Marker[] = [];

        data.forEach(function (markerData) {
            const el = document.createElement('div');
            el.innerHTML = `<img src="${pinMarker}" width="36" height="72">`;

            const popup = new mapboxgl.Popup()
                .setHTML(renderToString(
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
                            <Button size='sm' className='bg-black'>Voir plus</Button>
                        </div>
                    </div>
                ));

            const marker = new mapboxgl.Marker(el, { anchor: 'center' })
                .setLngLat([markerData.longitude, markerData.latitude])
                .setPopup(popup);
            markers.push(marker);
        })

        map.on('zoomend', function() {

            const zoom = map.getZoom();
    
            markers.forEach(function(marker) {
                if (zoom >= 4) {
                    marker.addTo(map);
                } 
                else {
                    marker.remove();
                }
            });
        });

        return () => map.remove();
    }, []);

    return (
        <>
            <div className="flex justify-center mt-8">
                <div id='map' style={{ width: '90vw', height: '90vh' }}></div>
            </div>
        </>
    )
}