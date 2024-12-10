import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import TripCardContainer from '../../components/TripCardContainer/TripCardContainer';
import { Trip } from '../../interfaces/TripProps/TripProps';
import { Typography, Tabs, Tab, TabsHeader, TabsBody, TabPanel, Button } from '@material-tailwind/react';
import { getFakeTrips } from '../../api/Trips';
import TripSearch from '../../components/TripSearch/TripSearch';

/**
 * TripListe Component
 * @description This component fetches and displays a list of trips from a mock API.
 * It uses tabs to toggle between "All Trips" and "My Trips".
 * If the user is not authenticated, "Mes trips" will display a login message with a button.
 */
const TripListe = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
    const [myTrips] = useState<Trip[]>([]);
    const [title, setTitle] = useState<string>('Trips list');
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string>('all-trips');
    const [isAuthenticated] = useState<boolean>(false); // Simulate user authentication

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const tripsData = await getFakeTrips();
                setTrips(tripsData);
                setFilteredTrips(tripsData);
            } catch (error) {
                console.error('Error fetching trips:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const handleFilter = (destination: string, dates: string) => {
        let startDate: Date | undefined = undefined;
        let endDate: Date | undefined = undefined;

        if (dates) {
            const tripDates = dates.split(' - ');
            const startDateParts = tripDates[0].split('/');
            const endDateParts = tripDates[1].split('/');

            startDate = new Date(
                +startDateParts[2],
                +startDateParts[1] - 1,
                +startDateParts[0]
            );
            endDate = new Date(
                +endDateParts[2],
                +endDateParts[1] - 1,
                +endDateParts[0]
            );
        }

        const filtered = trips.filter(
            (trip) =>
                (destination
                    ? trip.destination
                          .toLowerCase()
                          .includes(destination.toLowerCase())
                    : true) &&
                (startDate
                    ? trip.dateFrom.getTime() >= startDate.getTime()
                    : true) &&
                (endDate ? trip.dateTo.getTime() <= endDate.getTime() : true)
        );
        updateTitle(destination, startDate, endDate);
        setFilteredTrips(filtered);
    };

    const updateTitle = (destination: string, dateFrom?: Date, dateTo?: Date) => {
        const formattedDates =
            dateFrom && dateTo
                ? `${dateFrom.toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                  })} au ${dateTo.toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                  })}`
                : '';
        setTitle(
            `Trips ${
                destination ? `à ${destination}` : ''
            } ${formattedDates ? ` du ${formattedDates}` : ''}`
        );
    };

    if (loading) return <div>Loading trips...</div>;

    return (
        <>
            <div className="md:mt-24 mb-32">
                <header className="flex justify-center ">
                    <TripSearch onFilter={handleFilter} />
                </header>
                <section className="container mx-auto ps-4 pe-4">
                    <Tabs value={activeTab}>
                        <TabsHeader className="mt-[20px]">
                            <Tab
                                value="all-trips"
                                onClick={() => setActiveTab('all-trips')}
                            >
                                Tous les trips
                            </Tab>
                            <Tab
                                value="my-trips"
                                onClick={() => setActiveTab('my-trips')}
                            >
                                Mes trips
                            </Tab>
                        </TabsHeader>
                        <TabsBody>
                            <TabPanel value="all-trips">
                                {/* Page title */}
                                <Typography
                                    variant="h1"
                                    className="font-title text-2xl mt-4"
                                >
                                    {title}
                                </Typography>
                                {/* Grid layout to display all trips */}
                                <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
                                    {filteredTrips.map((trip) => (
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
                            </TabPanel>
                            <TabPanel value="my-trips">
                                {isAuthenticated ? (
                                    <>
                                        <Typography
                                            variant="h1"
                                            className="font-title text-2xl mt-4"
                                        >
                                            Mes trips
                                        </Typography>
                                        {/* Grid layout to display user's trips */}
                                        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
                                            {myTrips.map((trip) => (
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
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center mt-10">
                                        <Typography
                                            variant="h3"
                                            className="text-center mb-4"
                                        >
                                            Veuillez vous connecter pour voir vos trips.
                                        </Typography>
                                        <Button
                                            size="sm"
                                            className="bg-green items-center justify-center h-10"
                                        >
                                            <NavLink
                                                to={'/sign-in'}
                                                className="text-white"
                                            >
                                                Connexion
                                            </NavLink>
                                        </Button>
                                    </div>
                                )}
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </section>
            </div>
        </>
    );
};

export default TripListe;
