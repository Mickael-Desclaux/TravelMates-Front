import { ProfileData } from "../../interfaces/ProfileInterface";
import adventureIcon from '../../assets/activity/adventure.svg';
import leisureIcon from '../../assets/activity/leisure.svg';
import relaxationIcon from '../../assets/activity/relaxation.svg';
import sportIcon from '../../assets/activity/sport.svg';
import SettingsButton from "../SettingsButton/SettingsButton";
import AddFriendButton from "../AddFriendButton/AddFriendButton";

interface ProfilePageProps {
    values: ProfileData;
}

// List of available activities with icons
const activitiesData = [
    { id: 3, name: "Aventure", icon: adventureIcon },
    { id: 4, name: "Détente", icon: relaxationIcon },
    { id: 5, name: "Loisirs", icon: leisureIcon },
    { id: 6, name: "Sport", icon: sportIcon },
];

// Associates language names with their corresponding country codes to render flag icons
type Language = string;
const languageCodes: Record<Language, string> = {
    Français: 'fr',
    Anglais: 'gb',
    Espagnol: 'es',
};

export default function ProfileHeader({ values }: ProfilePageProps) {
    // Filter activities that match those in the user's profile data
    const selectedActivities = activitiesData.filter(activity =>
        values.activities.includes(activity.id)
    );

    return (
        <>
            <div className="flex justify-center border-b-0 border-gray-80">
                <div className="flex bg-white shadow-md p-4 w-full max-w-3xl mt-2 md:mt-16 lg:mt-32">

                    {/* Section profile picture */}
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-300 mr-6 flex-shrink-0">
                        {values.profilePicture ? (
                            <img src={values.profilePicture} alt="Profile" className="object-cover w-full h-full" />
                        ) : (
                            <span className="text-gray-500">Photo</span>
                        )}
                    </div>

                    {/* Section profile informations */}
                    <div className="text-left space-y-2 w-full">
                        <h1 className="text-xl font-bold font-title mb-2">{`${values.firstName} ${values.lastName}`}</h1>
                        <div className="text-md font-normal">
                            {values.age}, {values.gender}
                        </div>
                        <div className="flex flex-wrap">
                            {values.language.map((lang, index) => (
                                <div key={index} className="flex items-center mr-2">
                                    {languageCodes[lang] ? (
                                        <span className={`fi fi-${languageCodes[lang]} w-8 h-8 mr-1`} />
                                    ) : (
                                        <span>{lang}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex">
                            {selectedActivities.map((activity, index) => (
                                <div key={index} className="flex items-center mr-2">
                                    <img src={activity.icon} alt={activity.name} className="w-8 h-8 mr-1" />
                                </div>
                            ))}
                        </div>
                        <div>
                            {values.address}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-10 items-end">
                        <SettingsButton />
                        <AddFriendButton />
                    </div>
                </div>
            </div>
        </>
    )
}