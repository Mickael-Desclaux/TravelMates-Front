import Activity from "../Activity/Activity";
import adventureIcon from '../../assets/activity/adventure.svg';
import cultureIcon from '../../assets/activity/culture.svg';
import familyIcon from '../../assets/activity/family.svg';
import gastronomyIcon from '../../assets/activity/gastronomy.svg';
import leisureIcon from '../../assets/activity/leisure.svg';
import natureIcon from '../../assets/activity/nature.svg';
import partyIcon from '../../assets/activity/party-and-bar.svg';
import relaxationIcon from '../../assets/activity/relaxation.svg';
import sportIcon from '../../assets/activity/sport.svg';
import { ErrorMessage, useFormikContext } from "formik";

export default function ActivityPicker() {

    const activities = [
        { id: 1, name: "Culture", icon: cultureIcon },
        { id: 2, name: "Nature", icon: natureIcon },
        { id: 3, name: "Aventure", icon: adventureIcon },
        { id: 4, name: "Détente", icon: relaxationIcon },
        { id: 5, name: "Loisirs", icon: leisureIcon },
        { id: 6, name: "Sport", icon: sportIcon },
        { id: 7, name: "Bar et Fête", icon: partyIcon },
        { id: 8, name: "Gastronomie", icon: gastronomyIcon },
        { id: 9, name: "Famille", icon: familyIcon }
    ];

    interface FormValues {
        activities: number[];
    }

    // Use formik context
    const { values, setFieldValue } = useFormikContext<FormValues>();
    
    /**
     * Handles the toggle of an activity selection in the activity picker.
     * @param {number} id The id of the activity to toggle
     * @description If the activity is already selected, it is removed from the list of selected activities.
     * If the activity is not selected, it is added to the list of selected activities.
     */
    const handleToggle = (id: number) => {
        const selectedActivities = values.activities;
        if (selectedActivities.includes(id)) {
            setFieldValue("activities", selectedActivities.filter((activityId: number) => activityId !== id));
        } else {
            setFieldValue("activities", [...selectedActivities, id]);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="grid gap-4 grid-cols-3 grid-rows-3 w-full md:w-[40%]">
                    {activities.map((activity) => (
                        <Activity
                            key={activity.id}
                            id={activity.id}
                            name={activity.name}
                            iconPath={activity.icon}
                            onToggle={() => handleToggle(activity.id)}
                            isSelected={values.activities.includes(activity.id)}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-2 mt-4">
                <ErrorMessage name="activities" component="div" className="text-red-500 text-sm mt-1 w-full" />
            </div>
        </>
    );
}