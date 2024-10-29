import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Typography } from "@material-tailwind/react";
import pinMarkerIcon from '../../assets/icons/pin-marker.svg';
import { useState } from "react";

// Fake data for pins
const pinsData = [
    { id: 1, title: "Tour Eiffel", country: "France", dateAdded: "2023-12-01" },
    { id: 2, title: "Montmartre, Paris", country: "France", dateAdded: "2023-11-20" },
    { id: 3, title: "Dōtonbori", country: "Japon", dateAdded: "2023-10-15" },
    { id: 4, title: "Lac de Côme", country: "Italie", dateAdded: "2023-09-10" },
    { id: 5, title: "Tour de Pise", country: "Italie", dateAdded: "2023-08-05" },
    { id: 6, title: "Piccola Cucina Estiatorio", country: "New York", dateAdded: "2023-07-22" },
  ];

export default function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("marqueurs");

    const tabs = [
      { label: "Marqueurs", value: "marqueurs" },
      { label: "Trips", value: "trips" },
    ];

    // Sort pinsData by dateAdded from newest to oldest
    const sortedPinsData = [...pinsData].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());

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
                    <img src={pinMarkerIcon} alt="Icone marqueur" className="w-8 h-8" />
                    <p className="flex text-lg font-medium text-black mx-auto">
                      {activity.title}, {activity.country}
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