import axios from 'axios';

const MAPBOX_SUGGEST_BASE_URL = 'https://api.mapbox.com/search/searchbox/v1/suggest';
const MAPBOX_RETRIEVE_BASE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve";
const VITE_MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
const VITE_MAPBOX_SESSION_TOKEN = import.meta.env.VITE_MAPBOX_SESSION_TOKEN;

// default values to return only regions and 5 results
const typesParam: string = 'region';
const limitParam: number = 5;

export const fetchSuggestions = async (q: string) => {
	try {
		const response = await axios.get(MAPBOX_SUGGEST_BASE_URL, {
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

export async function getPoiSuggestions (q: string, proximity: string, bbox: string) {
	try {
		const response = await axios.get(MAPBOX_SUGGEST_BASE_URL, {
			params: {
				q,
				types: 'poi',
				limit: limitParam,
				poi_category: 'sports,entertainment,festival_grounds,tourist_attraction,tours,art,art_gallery,historic_site,monument,outdoors,park,cinema,museum,music,theatre',
				poi_category_exclusions: 'bus_stop,grocery,supermarket,sports_shop,it,office,services,gas_station,parking,hotel,food_and_drink,liquor_store,school,transportation,hospital,car_dealership,pet_store,optical,government,shopping,lodging,education,university,tourist_information',
				proximity: proximity,
				bbox: bbox,
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

export async function retrieveSuggestion(id: string) {
	try {
		const response = await axios.get(`${MAPBOX_RETRIEVE_BASE_URL}/${id}`, {
			params: {
				access_token: VITE_MAPBOX_API_KEY,
				session_token: VITE_MAPBOX_SESSION_TOKEN,
			},
		});
		const feature = response.data.features[0];  
        return feature;
	} catch (error) {
		console.error('Erreur lors du chargement des suggestions Mapbox', error);
		throw error;
	}
}
