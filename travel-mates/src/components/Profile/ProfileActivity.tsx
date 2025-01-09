import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import planeIcon from '../../assets/icons/plane.svg';
import pinMarkerIcon from '../../assets/icons/pin-marker.svg';
import TripWithParticipants from "../../interfaces/Trip";
import { Pin } from "../../interfaces/Pin";
import { GetUserTrips } from "../../api/Trips";
import { GetUserPins } from "../../api/Pin";
import useAuthStore from "../../utils/AuthStore";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("marqueurs");
  const [trips, setTrips] = useState<TripWithParticipants[]>([]);
  const [pins, setPins] = useState<Pin[]>([]);
  const userId = useAuthStore(state => state.user_id);

  useEffect(() => {
    const fetchDataActivity = async () => {
      if (userId) {
        try {
          const [pinsData, tripsData] = await Promise.all([GetUserPins(), GetUserTrips()]);
          setPins(pinsData);
          setTrips(tripsData);
        } catch (error) {
          throw new Error(error as string)
        }
      } else {
        setPins([]);
        setTrips([]);
      }
    };
  
    fetchDataActivity();
  }, [userId]);

  const tabs = [
    { label: "Marqueurs", value: "marqueurs" },
    { label: "Trips", value: "trips" },
  ];

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr });
  };

  return (
    <div>
      <Typography className="font-title text-2xl font-bold text-center mt-2 mb-6">
        Activité
      </Typography>

      {/* Component Tabs to displays pins and trips */}
      <Tabs value={activeTab} onChange={setActiveTab} className="w-full max-w-3xl mx-auto">
        <TabsHeader>
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} onClick={() => setActiveTab(tab.value)}
              className={`text-green font-bold font-title pb-2 ${activeTab === tab.value ? "underline" : ""}`}
            >
              {tab.label}
            </Tab>
          ))}
        </TabsHeader>

        <TabsBody>
          <TabPanel value="marqueurs">
            {userId ? (
              <div className="space-y-4 mt-4 h-60 overflow-y-auto pr-2">
                {pins.map((pin) => (
                  <div key={pin.id} className="flex items-center space-x-2">
                    <img src={pinMarkerIcon} alt="Icône marqueur" className="w-8 h-8 mx-4 md:mx-4" />
                    <p className="flex text-lg font-medium text-black mx-auto capitalize">
                      {pin.title}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 mt-4 h-60 overflow-y-auto pr-2">
                <p className="text-sm font-medium text-black lg:text-lg">
                  Vous n'avez pas encore de marqueur
                </p>
              </div>
            )}
          </TabPanel>

          <TabPanel value="trips">
            {userId ? (
              <div className="space-y-4 mt-4 h-60 overflow-y-auto pr-2">
                {trips.map((trip) => (
                  <div key={trip.id} className="flex items-center space-x-2 md:space-x-4">
                    <img src={planeIcon} alt="Icône avion de voyage" className="w-8 h-8 md:w-8 md:h-8 mx-4 md:mx-4" />
                    <p className="text-md md:text-lg font-medium text-black lg:text-lg w-2/3 md:w-full">
                      Voyage à {trip.destination} - du {formatDate(trip.date_from)} au{" "}
                      {formatDate(trip.date_to)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 mt-4 h-60 overflow-y-auto pr-2">
                <p className="text-sm font-medium text-black lg:text-lg">
                  Vous n'avez pas encore de trip
                </p>
              </div>
            )}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
