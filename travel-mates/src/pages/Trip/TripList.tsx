import { useEffect, useState } from 'react';
import TripCardContainer from '../../components/TripCardContainer/TripCardContainer';
import { Trip } from '../../interfaces/TripProps/TripProps';
import { Typography } from '@material-tailwind/react';
import { getFakeTrips } from '../../api/Trips';

/**
 * TripListe Component
 * @description This component fetches and displays a list of trips from a mock API.
 * It uses the `TripCardContainer` to render each trip in a styled card.
 * The component fetches the trips on mount using the useEffect hook and manages the loading state.
 * The fetched trips are displayed in a responsive grid layout.
 */
const TripListe = () => {
	// State to hold the list of trips
	const [trips, setTrips] = useState<Trip[]>([]);

	// Loading state to manage loading status
	const [loading, setLoading] = useState(true);

	// useEffect hook to fetch trips on component mount
	useEffect(() => {
		const fetchTrips = async () => {
			try {
				const tripsData = await getFakeTrips(); // Fetch trips from the mock API
				setTrips(tripsData); // Set the trips state with fetched data
			} catch (error) {
				console.error('Error fetching trips:', error); // Log any errors during fetch
			} finally {
				setLoading(false); // Set loading state to false after fetching is complete
			}
		};

		fetchTrips();
	}, []); // Empty dependency array ensures this runs only once when the component mounts

	// Display a loading message while fetching data
	if (loading) return <div>Loading trips...</div>;

	return (
		<section className="container mx-auto p-4">
			{/* Page title */}
			<Typography variant="h4" className="mb-8">
				Trip List
			</Typography>

			{/* Grid layout to display the trips */}
			<div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{/* Map over trips and render a TripCardContainer for each */}
				{trips.map(trip => (
					<TripCardContainer
						key={trip.id} // Use trip id as a unique key
						id={trip.id} // Pass trip id to the card component
						title={trip.title} // Pass trip title
						destination={trip.destination} // Pass destination
						dateFrom={trip.dateFrom} // Pass start date
						dateTo={trip.dateTo} // Pass end date
						description={trip.description} // Pass trip description
						budgetMin={trip.budgetMin} // Pass minimum budget
						budgetMax={trip.budgetMax} // Pass maximum budget
						media={trip.media} // Pass media (image) URL
						activities={trip.activities} // Pass activities related to the trip
					/>
				))}
			</div>
		</section>
	);
};

export default TripListe;
