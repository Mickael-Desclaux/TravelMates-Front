import { ProfileData } from "../../interfaces/ProfileInterface";
import adventureIcon from '../../assets/activity/adventure.svg';
import leisureIcon from '../../assets/activity/leisure.svg';
import relaxationIcon from '../../assets/activity/relaxation.svg';
import sportIcon from '../../assets/activity/sport.svg';
import Flag from 'react-world-flags';
import SettingsButton from "../SettingsButton/SettingsButton";
import AddFriendButton from "../AddFriendButton/AddFriendButton";

interface ProfilePageProps {
    values: ProfileData;
}

const activitiesData = [
    { id: 3, name: "Aventure", icon: adventureIcon },
    { id: 4, name: "Détente", icon: relaxationIcon },
    { id: 5, name: "Loisirs", icon: leisureIcon },
    { id: 6, name: "Aventure", icon: sportIcon },
];

type Language = string;
const languageCodes : Record<Language, string> = {
    Français: 'FR',
    Anglais: 'GB',
    Espagnol: 'ES',
};

export default function ProfileHeader({ values }: ProfilePageProps) {

    const selectedActivities = values.activities.map(activityId => {
        return activitiesData.find(activity => activity.id === activityId);
    });

    return (
        <>
            <div className="flex items-center border-b-0 border-gray-800">

                {/* Section profile picture */}
                <div className="flex bg-white rounded-lg shadow-md p-4 w-full">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-300 mb-4 mr-8">
                        {values.profilePicture ? (
                            <img src={values.profilePicture} alt="Profile" className="object-cover w-full h-full" />
                        ) : (
                            <span className="text-gray-500">Photo</span>
                        )}
                    </div>

                    {/* Section profile informations */}
                    <div className="text-left space-y-2">
                        <h1 className="text-xl font-bold font-title mb-2">{`${values.firstName} ${values.lastName}`}</h1>
                        <div className="text-md font-normal">
                            {values.age}, {values.gender}
                        </div>
                        <div className="flex flex-wrap">
                            {values.language.map((lang, index) => (
                                <div key={index} className="flex items-center mr-2">
                                    {languageCodes[lang] ? (
                                    <Flag code={languageCodes[lang]} className="w-8 h-8 mr-1" />
                                    ) : (
                                    <span>{lang}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap">
                            {selectedActivities.map((activity, index) =>
                                activity ? (
                                    <div key={index} className="flex items-center mr-2 mb-2">
                                        <img src={activity.icon} alt={activity.name} className="w-8 h-8 mr-1" />
                                    </div>
                                ) : null
                            )}
                        </div>
                        {values.address}
                    </div>

                    <SettingsButton />

                    <div className="flex">
                        <AddFriendButton />
                    </div>
                </div>
            </div>
        </>
    )
}