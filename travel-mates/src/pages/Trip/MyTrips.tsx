import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { GetUserTrips } from '../../api/Trips';
import useAuthStore from '../../utils/AuthStore';
import TripWithParticipants from '../../interfaces/Trip';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function MyTripsList() {
  const userId = useAuthStore(state => state.user_id);
  const [myTrips, setMytrips] = useState<TripWithParticipants[]>([]);

  useEffect(() => {
    const fetchMyTripsData = async () => {
      if(userId) {
        try {
          const myTripsData = await GetUserTrips()
          setMytrips(myTripsData)
        } catch (error) {
          throw new Error(error as string)
        }
      }
    };

    fetchMyTripsData()
  }, [userId]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr });
  };

  return (
    <div className="flex justify-center">
      <div className="md:mt-24 mb-32 max-w-4xl">
        <Typography variant="h1" className="mt-6 mb-20 text-center font-title font-bold text-2xl">
          Mes Trips
        </Typography>
        <div className="px-4">
          {myTrips.map((myTrip) => (
            <div key={myTrip.id} className="mb-6 flex items-start">
              <div className="w-32 h-32 flex-shrink-0">
                <img 
                  src={myTrip.tripUnsplashImage[0]?.url} 
                  alt={myTrip.title}
                  className="w-full h-full object-cover border rounded-lg shadow-md"
                />
              </div>
              <div className="ml-6">
                <div className="text-md font-bold mb-1">
                  {myTrip.title}
                </div>
                <div>
                  {myTrip.destination} - {formatDate(myTrip.date_to)}/{formatDate(myTrip.date_from)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
