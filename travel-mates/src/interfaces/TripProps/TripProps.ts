/**
 * @interface Activity
 * @description Represents an individual activity within a trip.
 */
export interface Activity {
	id: number; // Unique identifier for the activity
	type: string; // The type of activity (e.g., "adventure", "culture")
	icon: string; // URL or path to the icon representing the activity
}

/**
 * @interface Trip
 * @description Represents a trip with its associated details and activities.
 */
export interface Trip {
	id: number; // Unique identifier for the trip
	title: string; // The title or name of the trip
	destination: string; // Destination or location of the trip
	dateFrom: Date; // Start date of the trip (in ISO format or any date format)
	dateTo: Date; // End date of the trip (in ISO format or any date format)
	description: string; // Detailed description of the trip
	budgetMin: number; // Minimum budget required for the trip
	budgetMax: number; // Maximum budget required for the trip
	media: string; // URL to the media or image associated with the trip
	activities: Activity[]; // List of activities related to the trip
}
