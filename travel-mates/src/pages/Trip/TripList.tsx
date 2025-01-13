import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import TripCardContainer from '../../components/TripCardContainer/TripCardContainer';
import { Trip } from '../../interfaces/TripProps/TripProps';
import { Typography, Tabs, Tab, TabsHeader, TabsBody, TabPanel, Button } from '@material-tailwind/react';
import { GetUserTrips, GetTrips } from '../../api/Trips';
import TripSearch from '../../components/TripSearch/TripSearch';
import useAuthStore from '../../utils/AuthStore';

/**
 * TripListe Component
 * @description This component fetches and displays a list of trips from a mock API.
 * It uses tabs to toggle between "All Trips" and "My Trips".
 * If the user is not authenticated, "Mes trips" will display a login message with a button.
 */
export default function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [myTrips, setMyTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all-trips');
  const [message, setMessage] = useState<string>('');
  const userId = useAuthStore(state => state.user_id);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsData = await GetTrips();
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

  useEffect(() => {
    const fetchUserTrips = async () => {
      if (userId) {
        try {
          const userTripsData = await GetUserTrips();
          setMyTrips(userTripsData);
        } catch (error) {
          console.error('Error fetching user trips:', error);
        }
      } else {
        setMyTrips([]);
      }
    };

    fetchUserTrips();
  }, [userId]);

  const handleFilter = (destination: string, dates: string) => {
    let startDate: Date | undefined = undefined;
    let endDate: Date | undefined = undefined;

    if (!destination && !dates) {
      setFilteredTrips(trips);
      setMessage('');
      return
    }

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
          ? trip.date_from.getTime() >= startDate.getTime()
          : true) &&
        (endDate ? trip.date_to.getTime() <= endDate.getTime() : true)
    );

    if (filtered.length === 0) {
      setFilteredTrips([]);
      setMessage(
        `Aucun trip trouvé ${destination ? `pour la destination "${destination}"` : ''
        }${startDate && endDate
          ? ` entre le ${startDate.toLocaleDateString('fr-FR')} et le ${endDate.toLocaleDateString('fr-FR')}`
          : ''
        }.`
      );
    } else {
      setFilteredTrips(filtered);
      setMessage('');
    }
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
            <TabsHeader className="mt-6 w-11/12 mx-auto">
              <Tab value="all-trips" onClick={() => setActiveTab('all-trips')}>
                Tous les trips
              </Tab>
              <Tab value="my-trips" onClick={() => setActiveTab('my-trips')}>
                Mes trips
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="all-trips">
                {message ? (
                  <Typography variant="h5" className="text-center mx-auto font-bold text-black mt-10">
                    {message}
                  </Typography>
                ) : (
                  <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
                    {filteredTrips.map((trip) => (
                      <TripCardContainer
                        key={trip.id}
                        id={trip.id}
                        title={trip.title}
                        destination={trip.destination}
                        date_from={trip.date_from}
                        date_to={trip.date_to}
                        description={trip.description}
                        budget_min={trip.budget_min}
                        budget_max={trip.budget_max}
                        tripUnsplashImage={trip.tripUnsplashImage}
                        tripActivities={trip.tripActivities}
                        owner={trip.owner}
                      />
                    ))}
                  </div>
                )}
              </TabPanel>

              <TabPanel value="my-trips">
                {userId ? (
                  <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
                    {myTrips.map((trip) => (
                      <TripCardContainer
                        key={trip.id}
                        id={trip.id}
                        title={trip.title}
                        destination={trip.destination}
                        date_from={trip.date_from}
                        date_to={trip.date_to}
                        description={trip.description}
                        budget_min={trip.budget_min}
                        budget_max={trip.budget_max}
                        tripUnsplashImage={trip?.tripUnsplashImage}
                        tripActivities={trip.tripActivities}
                        owner={trip.owner}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center mt-10">
                    <Typography
                      variant="h5"
                      className="text-center mx-auto font-bold text-black mt-10 mb-8"
                    >
                      Veuillez vous connecter pour voir vos trips.
                    </Typography>
                    <Button size="sm" className="bg-green items-center justify-center h-10">
                      <NavLink to={'/sign-in'} className="text-white">
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
