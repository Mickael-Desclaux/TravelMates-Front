import ProfilePicture from "../../assets/profile/profil1.jpg";
import { NavLink } from "react-router-dom";
import Arrow from "../../assets/icons/arrow.svg";
import EditIcon from "../../assets/icons/edit-icon.svg";
import { Typography } from "@material-tailwind/react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import { useRef, useState } from "react";
import { Suggestion } from "../../interfaces/FormInterfaces/FormInterfaces";
import { fetchSuggestions } from "../../api/Mapbox";
import * as Yup from "yup";
import ProfileDeleteAccount from "../../components/Profile/ProfileDeleteAccount";
import ChangePasswordModal from "../../components/ProfilePassword/ProfilePasswordModal";

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

  // Function to fetch suggestions from Mapbox
  const fetchSuggestionsFromAPI = async (query: string) => {
    try {
      const suggestions = await fetchSuggestions(query.toUpperCase());
      const formattedSuggestions = suggestions.map(
        (suggestion: Suggestion) => ({
          name: suggestion.name,
          context: suggestion.context,
          country: suggestion.context.country,
          country_name: suggestion.context.country.name,
        }),
      );
      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions from Mapbox API:', error);
    }
  };

  const handleAddressChange = (value: string, setFieldValue: (field: string, value: string) => void) => {
    setFieldValue('address', value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }
    fetchSuggestionsFromAPI(value);
  }
  // Function to handle the change for password
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  // Function to handle the modal delete account
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    setDeleteModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Compte supprimé !");
    setDeleteModalOpen(false);
  };

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const mediaType = ['image/jpg', 'image/jpeg', 'image/png'];
  const mediaMaxSize: number = 10485760; // media max size = 10Mb

  // Validation of the form : Step 1 Validate personal information fields
  const profileValidationSchema = [
    Yup.object().shape({
      profilePicture: Yup.mixed()
        .test("fileType", "Seuls les formats jpg, jpeg et png sont autorisés", (value) => {
          if (!value || typeof value === "string") return true;
          return mediaType.includes((value as File).type);
        })
        .test("fileSize", "La taille de l'image doit être inférieure à 10Mo", (value) => {
          if (!value || typeof value === "string") return true;
          return (value as File).size <= mediaMaxSize;
        }).required("Ajoutez une photo de profil"),
      address: Yup.string().required("L'adresse est requise"),
      description: Yup.string().required("La biographie est requise"),
      activities: Yup.array().min(3, "Veuillez choisir au moins trois activités ").required("Veuillez choisir au moins trois activités"),
      language: Yup.array().of(Yup.string()).min(1, 'Sélectionnez au moins une langue').required("Sélectionnez au moins une langue"),
    })
  ];
    
  // Validation of the form : Step 2 Validate email
  const accountValidationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("L'email est requis"),
  });

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
      {/* Section profile header info */}
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
            if (currentStep < profileValidationSchema.length - 1) {
              setCurrentStep((prev) => prev + 1);
            }
          }}
          validationSchema={profileValidationSchema[currentStep]}
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
                <ErrorMessage name="profilePicture" component="div" className="text-red-500 text-sm mt-1" />
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
                <ErrorMessage name="firstNameAndLastName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Address field */}
              <div className="relative">
                <label htmlFor="address">
                  <Typography
                    variant="h6"
                    className="mb-2 block text-black font-bold"
                  >
                    Adresse
                  </Typography>
                </label>
                <Field
                  id="address"
                  name="address"
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAddressChange(e.target.value, setFieldValue)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />

                {suggestions.length > 0 && (
                  <ul className="absolute z-10 bg-light-white border border-gray-200 rounded-md left-0 w-full max-h-50 overflow-y-auto shadow-md">
                    {suggestions.map((suggestion: Suggestion, index: number) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setFieldValue(
                            'address',
                            suggestion.name +
                            ', ' +
                            suggestion.context.country.name,
                          );
                          setSuggestions([]);
                        }}
                      >
                        {suggestion.name ? suggestion.name : 'Unknown'},{' '}
                        {suggestion.context && suggestion.context.country
                          ? suggestion.context.country.name
                          : 'Unknown'}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Biography field */}
              <div className="relative mt-6 mb-6">
                <label htmlFor="description">
                  <Typography
                    variant="h6"
                    className="mb-2 block text-black font-bold"
                  >
                    Bio
                  </Typography>
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300"
                  rows={10}
                  placeholder="Votre biographie"
                  maxLength={1000}
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
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
                <ErrorMessage name="activities" component="div" className="text-red-500 text-sm mt-1" />
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
                <div className="relative z-10">
                  <Field
                    name="language"
                    id="language"
                    component={CustomSelect}
                    options={listOptionsLanguageProfile}
                    multiple={true}
                  />
                  <ErrorMessage name="language" component="div" className="text-red-500 text-sm mt-1" />
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
          onSubmit={(values) => console.log(values)}
          validationSchema={accountValidationSchema}
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
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
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

        <div>
          {/* Password field */}
          <div className="mt-8">
            <button
              type="submit"
              className="p-2 lg:w-2/4 w-3/4 border border-gray-400 text-black rounded hover:bg-opacity-85 mx-auto block"
              onClick={() => setPasswordModalOpen(true)}
            >
              Mot de passe
            </button>
            <ChangePasswordModal
              isOpen={isPasswordModalOpen}
              onClose={() => setPasswordModalOpen(false)}
              onConfirm={(newPassword) => console.log("Mot de passe changé :", newPassword)}
            />
          </div>

          {/* Delete account field */}
          <div>
            <button
              type="submit"
              className="mt-8 text-red-500 font-bold mx-auto block"
              onClick={handleDeleteAccount}
            >
              Supprimer mon compte
            </button>
            <ProfileDeleteAccount isOpen={isDeleteModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}
