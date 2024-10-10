import { useEffect, useState } from 'react';
import { getFakeTrips } from '../../api/TripService';
import TripCardContainer from '../../components/TripCardContainer';
import { Trip } from '../../interfaces/TripProps';
import { Typography } from '@material-tailwind/react';

const TripListe = () => {
	const [trips, setTrips] = useState<Trip[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTrips = async () => {
			try {
				const tripsData = await getFakeTrips(); // Récupérer les voyages
				setTrips(tripsData);
			} catch (error) {
				console.error('Error fetching trips:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchTrips();
	}, []);

	if (loading) return <div>Chargement des voyages...</div>;

	return (
		<section className="container mx-auto p-4">
			{/* Titre de la page */}
			<Typography variant="h4" className="mb-8">
				Liste des trips
			</Typography>

			{/* Grille pour afficher les trips */}
			<div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{trips.map(trip => (
					<TripCardContainer
						key={trip.id}
						id={trip.id}
						title={trip.title}
						destination={trip.destination}
						dateFrom={trip.dateFrom}
						dateTo={trip.dateTo}
						description={trip.description}
						budgetMin={trip.budgetMin}
						budgetMax={trip.budgetMax}
						media={trip.media}
						activities={trip.activities}
					/>
				))}
			</div>
		</section>
	);
};

export default TripListe;
