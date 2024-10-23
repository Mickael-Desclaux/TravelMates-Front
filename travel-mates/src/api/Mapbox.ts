import axios from 'axios';

const MAPBOX_API_BASE_URL =
	'https://api.mapbox.com/search/searchbox/v1/suggest';
const VITE_MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
const VITE_MAPBOX_SESSION_TOKEN = import.meta.env.VITE_MAPBOX_SESSION_TOKEN;

// default values to return only regions and 5 results
const typesParam: string = 'region';
const limitParam: number = 5;

export const fetchSuggestions = async (q: string) => {
	try {
		const response = await axios.get(MAPBOX_API_BASE_URL, {
			params: {
				q,
				types: typesParam,
				limit: limitParam,
				access_token: VITE_MAPBOX_API_KEY,
				session_token: VITE_MAPBOX_SESSION_TOKEN,
			},
		});
		return response.data.suggestions;
	} catch (error) {
		console.error('Error fetching suggestions from Mapbox API:', error);
		throw error;
	}
};

export default async function getPoiSuggestions (q: string, proximity: string) {
	try {
		const response = await axios.get(MAPBOX_API_BASE_URL, {
			params: {
				q,
				types: 'poi',
				limit: limitParam,
				poi_category_exclusions: 'bus_stop',
				proximity: proximity,
				access_token: VITE_MAPBOX_API_KEY,
				session_token: VITE_MAPBOX_SESSION_TOKEN,
			},
		});
		return response.data.suggestions;
	} catch (error) {
		console.error('Erreur lors du chargement des suggestions Mapbox', error);
		throw error;
	}
};
