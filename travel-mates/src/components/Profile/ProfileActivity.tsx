import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Typography } from "@material-tailwind/react";
import pinMarkerIcon from '../../assets/icons/pin-marker.svg';
import { useState } from "react";
import planeIcon from '../../assets/icons/plane.svg';

// Fake data for pins
const pinsData = [
    { id: 1, title: "Tour Eiffel", country: "France", dateAdded: "2023-12-01" },
    { id: 2, title: "Montmartre, Paris", country: "France", dateAdded: "2023-11-20" },
    { id: 3, title: "Dōtonbori", country: "Japon", dateAdded: "2023-10-15" },
    { id: 4, title: "Lac de Côme", country: "Italie", dateAdded: "2023-09-10" },
    { id: 5, title: "Tour de Pise", country: "Italie", dateAdded: "2023-08-05" },
    { id: 6, title: "Piccola Cucina Estiatorio", country: "New York", dateAdded: "2023-07-22" }
  ];

  // Fake data for trips
const tripsData = [
    { id: 1, destination: "New York", startDate: `15/06/2024`, endDate: `25/06/2024` },
    { id: 2, destination: "Milan", startDate: `05/01/2024`, endDate: `17/01/2024` },
    { id: 3, destination: "Paris", startDate: `09/12/2023`, endDate: `20/12/2023` },
    { id: 4, destination: "Japon", startDate: `05/10/2023`, endDate: `29/10/2023` }
];

export default function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("marqueurs");

    const tabs = [
      { label: "Marqueurs", value: "marqueurs" },
      { label: "Trips", value: "trips" },
    ];

    // Sort pinsData by dateAdded from newest to oldest
    const sortedPinsData = [...pinsData].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    
    // Sort tripsData by dateAdded from newest to oldest
    const sortedTripsData = [...tripsData].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  return (
    <>
      <div>
        <Typography className="font-title text-2xl font-bold text-center mt-2 mb-6">
          Activité
        </Typography>

        {/* Component Tabs to displays pins and trips */}    
        <Tabs value={activeTab} onChange={setActiveTab} className="w-full max-w-3xl mx-auto">
          <TabsHeader>
            {tabs.map((tab) => (
                <Tab key={tab.value} value={tab.value} onClick={() => setActiveTab(tab.value)}
                    className={`text-green font-bold font-title pb-2 ${
                        activeTab === tab.value ? "underline" : ""
                    }`}
                >
                    {tab.label}
                </Tab>
            ))}
          </TabsHeader>

          <TabsBody>
            <TabPanel value="marqueurs">
              <div className="space-y-4 mt-4 h-60 overflow-y-auto pr-2">
                {sortedPinsData.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-2">
                    <img src={pinMarkerIcon} alt="Icône marqueur" className="w-8 h-8" />
                    <p className="flex text-lg font-medium text-black mx-auto">
                      {activity.title}, {activity.country}
                    </p>
                  </div>
                ))}
              </div>
            </TabPanel>

            <TabPanel value="trips">
              <div className="space-y-4 mt-4 h-60 overflow-y-auto pr-2">
                {sortedTripsData.map((trip) => (
                  <div key={trip.id} className="flex items-center space-x-2 md:space-x-4">
                    <img src={planeIcon} alt="Icône avion de voyage" className="w-6 h-6 md:w-8 md:h-8" />
                    <p className="text-sm font-medium text-black lg:text-lg">
                      Voyage à {trip.destination} - du {trip.startDate} au{" "}
                      {trip.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </>
  );
}