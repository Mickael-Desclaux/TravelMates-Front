import axios from 'axios';
import { Activity, Trip } from '../interfaces/TripProps';

// Type pour les données retournées par jsonplaceholder
interface JsonPlaceholderPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

// Liste des activités possibles avec des types explicites
const allActivities: Activity[] = [
	{ id: 1, type: 'adventure', icon: '/assets/activity/adventure.svg' },
	{ id: 2, type: 'culture', icon: '/assets/activity/culture.svg' },
	{ id: 3, type: 'family', icon: '/assets/activity/family.svg' },
	{ id: 4, type: 'gastronomy', icon: '/assets/activity/gastronomy.svg' },
	{ id: 5, type: 'leisure', icon: '/assets/activity/leisure.svg' },
	{ id: 6, type: 'nature', icon: '/assets/activity/nature.svg' },
	{ id: 7, type: 'party', icon: '/assets/activity/party-and-bar.svg' },
	{ id: 8, type: 'relaxation', icon: '/assets/activity/relaxation.svg' },
	{ id: 9, type: 'sport', icon: '/assets/activity/sport.svg' },
];

// Fonction pour mélanger les éléments d'un tableau avec un typage explicite
const shuffleArray = <T>(array: T[]): T[] => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

// Configurer l'instance Axios
const api = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Fonction pour récupérer des voyages factices avec des activités random
export const getFakeTrips = async (): Promise<Trip[]> => {
	try {
		const response = await api.get<JsonPlaceholderPost[]>('/posts');

		return response.data.slice(0, 10).map((post: JsonPlaceholderPost): Trip => {
			// Mélanger les activités et sélectionner un nombre aléatoire jusqu'à 6
			const randomActivities: Activity[] = shuffleArray(allActivities).slice(
				0,
				Math.floor(Math.random() * 6) + 1,
			);

			return {
				id: post.id,
				title: post.title,
				destination: `Destination ${post.id}`,
				dateFrom: '2024-10-01',
				dateTo: '2024-10-10',
				description: post.body,
				budgetMin: Math.floor(Math.random() * 500) + 100,
				budgetMax: Math.floor(Math.random() * 1500) + 600,
				media: `https://via.placeholder.com/600/${post.id}`,
				activities: randomActivities,
			};
		});
	} catch (error) {
		console.error('Error fetching trips:', error);
		throw error;
	}
};
