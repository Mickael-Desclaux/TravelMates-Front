import Navbar from "../../components/Navbar/Navbar";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { ProfileData } from "../../interfaces/ProfileInterface";

export default function Profile() {

  const profile: ProfileData = {
      id: 1,
      profilePicture: '',
      firstName: 'Éloïse',
      lastName: 'DeBordeaux',
      age: 25,
      gender: 'Femme',
      language: ['Français', 'Anglais'],
      address: '11 Avenue d\'Eysines, Bordeaux',
      activities: [3, 5, 6, 4],
  }

  return (
    <>
      <div className="xl:max-w-7xl mt-32">
          <ProfileHeader values={profile} />
      </div>

      <Navbar />
    </>
  )
}