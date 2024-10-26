import NavbarComponent from "../../components/Navbar/Navbar";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { ProfileData } from "../../interfaces/ProfileInterface";
import ProfilePicture from "../../assets/profile/profil1.jpg";

export default function Profile() {

  const profile: ProfileData = {
      id: 1,
      profilePicture: ProfilePicture,
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
      <div>
          <ProfileHeader values={profile} />
      </div>

      <NavbarComponent />
    </>
  )
}