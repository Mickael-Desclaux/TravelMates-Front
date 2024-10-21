import { useEffect, useState } from 'react';
import TripCardContainer from '../../components/TripCardContainer/TripCardContainer';
import { Trip } from '../../interfaces/TripProps/TripProps';
import { Typography } from '@material-tailwind/react';
import { getFakeTrips } from '../../api/Trips';
import TripSearch from '../../components/TripSearch/TripSearch';

/**
 * TripListe Component
 * @description This component fetches and displays a list of trips from a mock API.
 * It uses the `TripCardContainer` to render each trip in a styled card.
 * The component fetches the trips on mount using the useEffect hook and manages the loading state.
 * The fetched trips are displayed in a responsive grid layout.
 */
const TripListe = () => {

	const [trips, setTrips] = useState<Trip[]>([]);

	// State to display filtered trips
	const [filteredTrips, setFilteredTrips] = useState<Trip[]>(trips);

	const [title, setTitle] = useState<string>('Trips list');

	// Loading state to manage loading status
	const [loading, setLoading] = useState(true);

	// useEffect hook to fetch trips on component mount
	useEffect(() => {
		const fetchTrips = async () => {
			try {
				const tripsData = await getFakeTrips(); // Fetch trips from the mock API
				setFilteredTrips(tripsData);
				setTrips(tripsData); // Set the trips state with fetched data
			} catch (error) {
				console.error('Error fetching trips:', error); // Log any errors during fetch
			} finally {
				setLoading(false); // Set loading state to false after fetching is complete
			}
		};

		fetchTrips();
	}, []); // Empty dependency array ensures this runs only once when the component mounts

	const handleFilter = (destination: string, dates: string) => {
		let startDate: Date | undefined = undefined;
		let endDate: Date | undefined = undefined;

		if (dates) {
			const tripDates = dates.split(" - ");
			const startDateParts = tripDates[0].split("/");
			const endDateParts = tripDates[1].split("/");

			startDate = new Date(+startDateParts[2], +startDateParts[1] - 1, +startDateParts[0]);
			endDate = new Date(+endDateParts[2], +endDateParts[1] - 1, +endDateParts[0]);
		}

		const filtered = trips.filter(trip =>
			(destination ? trip.destination.toLowerCase().includes(destination.toLowerCase()) : true) &&
			(startDate ? trip.dateFrom.getTime() >= startDate.getTime() : true) &&
			(endDate ? trip.dateTo.getTime() <= endDate.getTime() : true)
		);
		updateTitle(destination, startDate, endDate)
		setFilteredTrips(filtered);
	};

	const updateTitle = (destination: string, dateFrom?: Date, dateTo?: Date) => {
		const formattedDates = dateFrom && dateTo
			? `${dateFrom.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} au ${dateTo.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}`
			: '';

		setTitle(`Trips ${destination ? `à ${destination}` : ''} ${formattedDates ? ` du ${formattedDates}` : ''}`);
	}

	// Display a loading message while fetching data
	if (loading) return <div>Loading trips...</div>;

	return (
		<>
			<header className='flex justify-center'>
				<TripSearch onFilter={handleFilter}/>
			</header>
			<section className="container mx-auto ps-4 pe-4">
				{/* Page title */}
				<Typography variant="h1" className="font-title text-lg mt-4">
					{title}
				</Typography>

				{/* Grid layout to display the trips */}
				<div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
					{/* Map over trips and render a TripCardContainer for each */}
					{filteredTrips.map(trip => (
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
		</>
	);
};

export default TripListe;
