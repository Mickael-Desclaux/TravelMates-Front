import ProfilePicture from "../../assets/profile/profil1.jpg";
import { NavLink } from "react-router-dom";
import Arrow from "../../assets/icons/arrow.svg";
import EditIcon from "../../assets/icons/edit-icon.svg";
import { Typography } from "@material-tailwind/react";
import { Field, Formik, Form } from "formik";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import { useRef } from "react";

export default function ProfileEdit() {
  // Reference to the hidden file input so it can be clicked through the profile picture
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Function to handle file input change
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (e.target.files) {
      const file = URL.createObjectURL(e.target.files[0]);
      setFieldValue("profilePicture", file);
    }
  };

  // Trigger file input on profile picture click
  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // List of language options for the custom select dropdown of profile
  const listOptionsLanguageProfile = [
    "Allemand",
    "Anglais",
    "Arabe",
    "Espagnol",
    "Français",
    "Grec",
    "Italien",
    "Mandarin",
    "Néerlandais",
    "Polonais",
    "Portugais",
    "Russe",
  ];

  return (
    <div className="mx-auto w-full max-w-3xl mb-36 md:mt-32">
      <div className="px-4">
        <div className="flex">
          <NavLink to={"/profile"} aria-current="page">
            <img
              src={Arrow}
              alt="Croix de fermeture de la page"
              className="lg:w-12 lg:h-12 sm:w-10 sm:h-10"
            />
          </NavLink>
          <Typography
            variant="h1"
            className="mb-4 flex-1 text-center text-2xl font-title"
          >
            Modifier le profil
          </Typography>
        </div>

        {/* Updated profile info fields */}
        <Formik
          initialValues={{
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
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              {/* Profile picture section with overlay for edit */}
              <div
                className="relative flex items-center mx-auto w-32 h-32 lg:mt-12 mb-4 rounded-full cursor-pointer"
                onClick={handleProfileClick}
              >
                <input
                  type="file"
                  name="profilePicture"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />
                <img
                  src={values.profilePicture}
                  alt="Photo de profil"
                  className="w-full h-full rounded-full cursor-pointer"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center">
                  <img
                    src={EditIcon}
                    alt="Modifier"
                    className="w-8 h-8 text-white"
                  />
                </div>
              </div>

              {/* Firstname and lastname field */}
              <div className="mb-6">
                <label htmlFor="firstNameAndLastName">
                  <Typography
                    variant="h6"
                    className="mb-2 block text-black font-bold"
                  >
                    Prénom et Nom
                  </Typography>
                </label>
                <input
                  type="text"
                  name="firstNameAndLastName"
                  id="firstNameAndLastName"
                  value={`${values.firstName} ${values.lastName}`}
                  disabled
                  className="w-full p-2 border rounded-md border-gray-300 text-gray-500"
                />
              </div>

              {/* Address field */}
              <div className="mb-6">
                <label htmlFor="address">
                  <Typography
                    variant="h6"
                    className="mb-2 block text-black font-bold"
                  >
                    Adresse
                  </Typography>
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={values.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300"
                />
              </div>

              {/* Biography field */}
              <div className="mb-6">
                <label htmlFor="biography">
                  <Typography
                    variant="h6"
                    className="mb-2 block text-black font-bold"
                  >
                    Bio
                  </Typography>
                </label>
                <textarea
                  name="description"
                  id="biography"
                  value={values.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300"
                  rows={10}
                  placeholder="Votre biographie"
                  maxLength={1000}
                />
              </div>

              {/* Activities field */}
              <div className="my-8">
                <label htmlFor="activities">
                  <Typography
                    variant="h6"
                    className="mb-2 block text-black font-bold"
                  >
                    Activités
                  </Typography>
                </label>
                <ActivityPicker />
              </div>

              {/* Language field */}
              <div className="mb-8 relative">
                <label htmlFor="language" className="relative z-10">
                  <Typography
                    variant="h6"
                    className="mb-2 block text-black font-bold"
                  >
                    Langue
                  </Typography>
                </label>
                <div className="relative z-20">
                  <Field
                    name="language"
                    id="language"
                    component={CustomSelect}
                    options={listOptionsLanguageProfile}
                    multiple={true}
                    className="max-h-60 overflow-y-auto"
                  />
                </div>

                {/* Submit button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="p-2 lg:w-2/4 w-3/4 bg-green text-white rounded hover:bg-opacity-85 mx-auto block"
                  >
                    Valider les modifications
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Grey dividing line */}
      <div className="relative left-0 right-0 bottom-0 w-full h-1.5 bg-light-white shadow-md" />

      {/* Updated account info (email & password & delete account) */}
      <div className="px-4">
        <Formik
          initialValues={{ email: "eloisedebordeaux@gmail.com" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <div>
                <Typography
                  variant="h4"
                  className="lg:mt-14 mt-8 mb-4 text-center text-xl font-title"
                >
                  Modifier mon compte
                </Typography>

                {/* Email field */}
                <div className="mt-4 mb-6">
                  <label htmlFor="email">
                    <Typography
                      variant="h6"
                      className="mb-2 block text-black font-bold"
                    >
                      Email
                    </Typography>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300"
                  />
                </div>

                {/* Submit button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="p-2 lg:w-2/4 w-3/4 bg-green text-white rounded hover:bg-opacity-85 mx-auto block"
                  >
                    Valider les modifications
                  </button>
                </div>

                {/* Password field */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="p-2 lg:w-2/4 w-3/4 border border-gray-400 text-black rounded hover:bg-opacity-85 mx-auto block"
                  >
                    Mot de passe
                  </button>
                </div>

                {/* Delete account field */}
                <div>
                  <button
                    type="submit"
                    className="mt-8 text-red-500 font-bold mx-auto block"
                  >
                    Supprimer mon compte
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
