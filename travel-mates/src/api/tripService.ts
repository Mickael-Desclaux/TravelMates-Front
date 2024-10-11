import axios from 'axios';
import { Activity, Trip } from '../interfaces/TripProps';

// Interface for the data returned by jsonplaceholder API
interface JsonPlaceholderPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

// List of possible activities with explicit types
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

// Function to shuffle the elements of an array with explicit typing
const shuffleArray = <T>(array: T[]): T[] => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

// Configure Axios instance for API requests
const api = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com', // Base URL for the API
	headers: {
		'Content-Type': 'application/json',
	},
});

// Function to fetch fake trips and generate random activities
export const getFakeTrips = async (): Promise<Trip[]> => {
	try {
		// Fetch posts from the jsonplaceholder API
		const response = await api.get<JsonPlaceholderPost[]>('/posts');

		// Map the response data to our Trip format and add random activities
		return response.data.slice(0, 10).map((post: JsonPlaceholderPost): Trip => {
			// Shuffle the list of activities and select a random number (up to 6)
			const randomActivities: Activity[] = shuffleArray(allActivities).slice(
				0,
				Math.floor(Math.random() * 6) + 1, // Select 1 to 6 activities
			);

			return {
				id: post.id, // Use the post's id as the trip's id
				title: post.title, // Use the post's title for the trip title
				destination: `Destination ${post.id}`, // Generate a fake destination
				dateFrom: '2024-10-01', // Fixed date for the trip start
				dateTo: '2024-10-10', // Fixed date for the trip end
				description: post.body, // Use the post's body as the trip description
				budgetMin: Math.floor(Math.random() * 500) + 100, // Generate a random minimum budget
				budgetMax: Math.floor(Math.random() * 1500) + 600, // Generate a random maximum budget
				media: `https://via.placeholder.com/600/${post.id}`, // Use a placeholder image
				activities: randomActivities, // Assign the randomly selected activities
			};
		});
	} catch (error) {
		console.error('Error fetching trips:', error); // Handle any errors
		throw error; // Re-throw the error for further handling
	}
};
