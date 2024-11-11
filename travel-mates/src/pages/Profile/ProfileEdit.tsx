import { useState, useRef } from "react";
import { ProfileData } from "../../interfaces/ProfileInterface";
import ProfilePicture from "../../assets/profile/profil1.jpg";
import { NavLink } from "react-router-dom";
import Arrow from "../../assets/icons/arrow.svg";
import EditIcon from "../../assets/icons/edit-icon.svg";

export default function ProfileEdit() {
  // Fake profileEdit data
  const [profile, setProfile] = useState<ProfileData>({
    id: 1,
    profilePicture: ProfilePicture,
    firstName: "Éloïse",
    lastName: "DeBordeaux",
    age: 25,
    gender: "Femme",
    language: ["Français", "Anglais"],
    address: "11 Avenue d'Eysines, Bordeaux",
    activities: [3, 5, 6, 4],
    description: `Lorem ipsum dolor sit amet consectetur. Massa ut ac amet tempor mi.
                Porttitor neque cras lacus morbi cras tortor velit aliquam libero. 
                Sapien arcu elit in consectetur arcu quam augue. Amet id elit arcu volutpat
                adipiscing lorem erat in id. Suscipit imperdiet feugiat suspendisse sodales.
                Magna orci proin laoreet vitae egestas leo varius. Egestas amet suspendisse
                platea ante vitae sed vitae magna aenean. Pellentesque porttitor aliquam sit sit.`,
  });

  // Reference to the hidden file input so it can be clicked through the profile picture
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Trigger file input on profile picture click
  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Update profile picture upon file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = URL.createObjectURL(e.target.files[0]);
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: file,
      }));
    }
  };

  // Handle changes for editable fields for address and bio
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4 md:mt-32">
      <div className="flex">
        <NavLink
          to={"/profile"}
          className="text-gray-900 dark:text-white"
          aria-current="page"
        >
          <img
            src={Arrow}
            alt="Croix de fermeture de la page"
            className="w-10 h-10 md:w-8 md:h-8"
          />
        </NavLink>
        <h1 className="flex-1 text-center text-2xl font-title font-bold mb-4">
          Modifier le profil
        </h1>
      </div>

      {/* Profile picture section with overlay for edit */}
      <div
        className="relative flex items-center mx-auto w-32 h-32 mb-4 rounded-full cursor-pointer"
        onClick={handleProfileClick}
      >
        <input
          type="file"
          name="profilePicture"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <img
          src={profile.profilePicture}
          alt="Photo de profil"
          className="w-full h-full rounded-full cursor-pointer"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
          <img src={EditIcon} alt="Modifier" className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Full name field */}
      <div className="mb-6">
        <label className="mb-2 block text-black font-bold">Nom et Prénom</label>
        <input
          type="text"
          value={`${profile.firstName} ${profile.lastName}`}
          disabled
          className="w-full p-2 border rounded-md border-gray-300 text-gray-500"
        />
      </div>

      {/* Address field */}
      <div className="mb-6">
        <label className="mb-2 block text-black font-bold">Adresse</label>
        <input
          type="text"
          name="address"
          value={profile.address}
          onChange={handleChange}
          className="w-full p-2 border rounded-md border-gray-300"
        />
      </div>

      {/* Biography field */}
      <div className="mb-6">
        <label className="mb-2 block text-black font-bold">Bio</label>
        <textarea
          name="description"
          value={profile.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md border-gray-300"
          rows={10}
        />
      </div>
    </div>
  );
}
