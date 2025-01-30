import { ProfileData } from "../../interfaces/ProfileInterface";
//import AddFriendButton from "../AddFriendButton/AddFriendButton";
import { Avatar, Typography } from "@material-tailwind/react";
import ProfilePopover from "../ProfilePopover/ProfilePopover";
import { useEffect, useState } from "react";
import { GetProfile } from "../../api/Profile";
import { getPinCount } from "../../api/Pin";
import { getTripCount } from "../../api/Trips";
import useAuthStore from "../../utils/AuthStore";

const languageCodes: Record<string, string> = {
  German: 'de',
  English: 'gb',
  Arabic: 'sa',
  Spanish: 'es',
  French: 'fr',
  Greek: 'gr',
  Italian: 'it',
  Mandarin: 'cn',
  Dutch: 'nl',
  Polish: 'pl',
  Portuguese: 'pt',
  Russian: 'ru'
};

export default function ProfileHeader() {
  const userId = useAuthStore(state => state.user_id);

  const [userProfileData, setUserProfileData] = useState<ProfileData | null>(null);
  const [pinsCount, setPinsCount] = useState<number | null>(null);
  const [tripsCount, setTripsCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchDataHeaderProfile = async () => {
      if (userId) {
        try {
          const profileData = await GetProfile(userId);
          setUserProfileData(profileData);

          const pinsData = await getPinCount(userId);
          setPinsCount(pinsData);

          const tripsData = await getTripCount(userId);
          setTripsCount(tripsData);
        } catch (error) {
          throw new Error(error as string)
        }
      }
    }

    fetchDataHeaderProfile();
  }, [userId]);

  const calculateAge = (birth_date: string): number => {
    const birth = new Date(birth_date);
    const today = new Date();
    return today.getFullYear() - birth.getFullYear() - (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
  };

  return (
    <>
      {userId ? (
        <div className="container mx-auto">
          {/* Section profile header */}
          <div className="flex justify-center border-b-0 border-gray-80">
            <div className="flex flex-col bg-light-white shadow-md p-4 w-full max-w-3xl mt-2 md:mt-16 lg:mt-32">
              <div className="flex items-start">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-300 mr-6 flex-shrink-0">
                  {userProfileData?.media?.url ? (
                    <img src={`${import.meta.env.VITE_API_BASE_URL}/${userProfileData?.media?.url}`} alt={`Photo de profil de ${userProfileData?.firstname} ${userProfileData?.lastname}`} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-gray-500">Photo</span>
                  )}
                </div>

                {/* Section profile informations */}
                <div className="text-left space-y-2 w-full">
                  <h1 className="text-2xl font-bold font-title capitalize mb-2">{`${userProfileData?.firstname} ${userProfileData?.lastname}`}</h1>
                  <div className="text-md font-normal">
                    {userProfileData?.birth_date ? `${calculateAge(userProfileData.birth_date)} ans` : 'Âge inconnu'}, {userProfileData?.gender}
                  </div>
                  <div className="flex flex-wrap">
                    {userProfileData?.profileLanguages.map((lang: { language: string }, index: number) => (
                      <div key={index} className="flex items-center">
                        <span className={`fi fi-${languageCodes[lang.language]} w-8 h-8 mr-2`} />
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    {userProfileData?.profileActivities.map((activity: { activity: string }, index: number) => (
                        <Avatar src={`/activity/${activity.activity.toLowerCase()}.svg`} key={index} alt={activity.activity} className="w-8 h-8 mr-2"></Avatar>
                      ))
                    }
                  </div>
                  <div className="w-full">
                    {userProfileData?.address}
                  </div>
                </div>

                <div className="flex flex-col space-y-10 items-end">
                  <ProfilePopover />
                  {/* Implemented this button for the Version 2 app */}
                  {/* <AddFriendButton /> */}
                </div>
              </div>

              {/* Section profile stats */}
              <div className="mt-6 mx-auto w-3/4 px-4 flex justify-between text-center text-sm font-bold">
                <p>{pinsCount} marqueurs</p>
                <p>{tripsCount} trips</p>
              </div>
            </div>
          </div>

          {/* Section profile biography */}
          <div className="p-6 bg-light-white w-full max-w-3xl mx-auto">
            <Typography className="text-2xl font-title font-bold pb-4">Bio</Typography>
            {userProfileData?.bio || 'Veuillez remplir votre bio.'}
          </div>
        </div>
      ) : null}
    </>
  )
}
