import Activity from "../Activity/Activity";
import adventureIcon from '/activity/adventure.svg';
import cultureIcon from '/activity/culture.svg';
import familyIcon from '/activity/family.svg';
import gastronomyIcon from '/activity/gastronomy.svg';
import leisureIcon from '/activity/leisure.svg';
import natureIcon from '/activity/nature.svg';
import partyIcon from '/activity/party-and-bar.svg';
import relaxationIcon from '/activity/relaxation.svg';
import sportIcon from '/activity/sport.svg';
import { useFormikContext } from "formik";

export default function ActivityPicker() {

    const activities = [
        { id: 1, name: "Culture", value:"Culture", icon: cultureIcon },
        { id: 2, name: "Nature", value:"Nature", icon: natureIcon },
        { id: 3, name: "Aventure", value:"Adventure", icon: adventureIcon },
        { id: 4, name: "Détente", value:"Relaxation", icon: relaxationIcon },
        { id: 5, name: "Gastronomie", value:"Gastronomy", icon: gastronomyIcon },
        { id: 6, name: "Sport", value:"Sport", icon: sportIcon },
        { id: 7, name: "Bar et Fête", value:"BarAndParty", icon: partyIcon },
        { id: 8, name: "Loisirs", value:"Leisure", icon: leisureIcon },
        { id: 9, name: "Famille", value:"Family", icon: familyIcon }
    ];

    interface FormValues {
        activities: string[];
    }

    // Use formik context
    const { values, setFieldValue } = useFormikContext<FormValues>();
    
    const handleToggle = (value: string) => {
        const selectedActivities = values.activities;
        if (selectedActivities.includes(value)) {
            setFieldValue(
                "activities",
                selectedActivities.filter((activityValue: string) => activityValue !== value)
            );
        } else {
            setFieldValue("activities", [...selectedActivities, value]);
        }
    };


    return (
        <>
            <div className="flex justify-center">
                <div className="grid gap-3 grid-cols-3 grid-rows-3">
                    {activities.map((activity) => (
                        <Activity
                            key={activity.id}
                            id={activity.id} // ID peut toujours être utilisé pour la clé ou d'autres besoins internes
                            name={activity.name}
                            iconPath={activity.icon}
                            onToggle={() => handleToggle(activity.value)} // Passe value au lieu d'id
                            isSelected={values.activities.includes(activity.value)} // Vérifie si value est sélectionné
                        />
                    ))}
                </div>
            </div>
        </>
    );
}