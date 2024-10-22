import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { useEffect } from 'react';
import './Map.css';

interface Pin {
    title: string;
    latitude: number;
    longitude: number;
}

export default function Map() {

    const data: Pin[] = [
        { title: 'Tour Eiffel', latitude: 48.8584, longitude: 2.2945 },
        { title: 'Musée du Louvre', latitude: 48.8606, longitude: 2.3376 },
        { title: 'Cathédrale Notre-Dame', latitude: 48.8529, longitude: 2.3500 },
        { title: 'Arc de Triomphe', latitude: 48.8738, longitude: 2.2950 },
        { title: 'Basilique du Sacré-Cœur', latitude: 48.8867, longitude: 2.3431 }
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

        data.forEach(function(markerData) {
            const el = document.createElement('div');
            el.className='marker';

            new mapboxgl.Marker(el, { anchor: 'center' })
            .setLngLat([markerData.longitude, markerData.latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // Ajoutez des popups
            .setHTML('<h3>' + markerData.title + '</h3>'))
            .addTo(map);
        })

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