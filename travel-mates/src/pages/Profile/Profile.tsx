import ProfileHeader from "../../components/Profile/ProfileHeader";
import { ProfileData } from "../../interfaces/ProfileInterface";
import ProfilePicture from "../../assets/profile/profil1.jpg";
import ProfileActivity from "../../components/Profile/ProfileActivity";

export default function Profile() {

  // Fake profile data
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
      description : `Lorem ipsum dolor sit amet consectetur. Massa ut ac amet tempor mi.
                Porttitor neque cras lacus morbi cras tortor velit aliquam libero. 
                Sapien arcu elit in consectetur arcu quam augue. Amet id elit arcu volutpat
                adipiscing lorem erat in id. Suscipit imperdiet feugiat suspendisse sodales.
                Magna orci proin laoreet vitae egestas leo varius. Egestas amet suspendisse
                platea ante vitae sed vitae magna aenean. Pellentesque porttitor aliquam sit sit.`
  }

  return (
    <>
      <div className="mb-32">
          <ProfileHeader values={profile} />
          <ProfileActivity />
      </div>
    </>
  )
}