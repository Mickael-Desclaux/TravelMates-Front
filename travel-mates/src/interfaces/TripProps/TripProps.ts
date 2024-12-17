/**
 * @interface Trip
 * @description Represents a trip with its associated details and activities.
 */
export interface Trip {
  id: number; // Unique identifier for the trip
  title: string; // The title or name of the trip
  destination: string; // Destination or location of the trip
  date_from: Date; // Start date of the trip (in ISO format or any date format)
  date_to: Date; // End date of the trip (in ISO format or any date format)
  description: string; // Detailed description of the trip
  budget_min: number; // Minimum budget required for the trip
  budget_max: number; // Maximum budget required for the trip
  tripUnsplashImage: {
    url: string;
    author_firstname: string;
    author_lastname: string;
    author_profile_picture: string;
  }[];
  tripActivities: {
    activity: string;
  }[];
	owner: {
		profile: {
			media: {
				url: string
			},
			firstname: string,
			lastname: string
		}
	}
}
