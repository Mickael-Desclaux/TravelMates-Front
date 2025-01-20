import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Arrow from "/icons/arrow.svg";
import EditIcon from "/icons/edit-icon.svg";
import { Typography } from "@material-tailwind/react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import ProfileDeleteAccount from "../../components/Profile/ProfileDeleteAccount";
import ChangePasswordModal from "../../components/ProfilePassword/ProfilePasswordModal";
import { ProfileData, UpdateProfileData } from "../../interfaces/ProfileInterface";
import { Suggestion } from "../../interfaces/FormInterfaces/FormInterfaces";
import { GetProfile, UpdateProfile } from "../../api/Profile";
import { fetchSuggestions } from "../../api/Mapbox";
import * as Yup from "yup";
import useAuthStore from "../../utils/AuthStore";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const userId = useAuthStore(state => state.user_id);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userProfileData, setUserProfileData] = useState<ProfileData | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const mediaType = ['image/jpg', 'image/jpeg', 'image/png'];
  const mediaMaxSize = 10485760; // 10MB en bytes

  interface FormValues {
    address: string;
    description: string;
    activities: string[];
    language: string[];
  }

  useEffect(() => {
    const fetchEditProfileData = async () => {
      if (userId) {
        try {
          const profileData = await GetProfile(userId);
          setUserProfileData(profileData);
        } catch (error) {
          throw new Error(error as string)
        }
      }
    };

    fetchEditProfileData();
  }, [userId]);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const renderProfileImage = (values: Partial<ProfileData>) => {
    if (previewImage) {
      return <img
        src={previewImage}
        alt={`Photo de profil de ${values.firstname} ${values.lastname}`}
        className="w-full h-full cursor-pointer object-cover capitalize"
      />;
    }

    if (userProfileData?.media?.url) {
      return <img
        src={`${import.meta.env.VITE_API_BASE_URL}/${userProfileData.media.url}`}
        alt={`Photo de profil de ${values.firstname} ${values.lastname}`}
        className="w-full h-full cursor-pointer object-cover capitalize"
      />;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
      setFieldValue("profilePicture", file);
    }
  };

  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAddressChange = async (value: string, setFieldValue: (field: string, value: string) => void) => {
    setFieldValue('address', value.trim());

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
      const suggestions = await fetchSuggestions(value.toUpperCase());
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

  // Validation of the form : Step 1 Validate personal information fields
  const profileValidationSchema =
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
    });

  const handleSubmit = async (values: FormValues) => {
    if (!userId) return;
    setIsSubmitting(true);

    try {
      const updateData: UpdateProfileData = {
        address: values.address,
        bio: values.description,
        activities: values.activities,
        languages: values.language
      };

      if (fileInputRef.current?.files?.[0]) {
        updateData.file = fileInputRef.current.files[0];
      }

      await UpdateProfile(userId, updateData);
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    } finally {
      setIsSubmitting(false);
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

  if (!userProfileData) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  const initialValues = {
    profilePicture: userProfileData.media?.url || "",
    firstname: userProfileData.firstname,
    lastname: userProfileData.lastname,
    language: userProfileData.profileLanguages.map(lang => lang.language),
    address: userProfileData.address,
    activities: userProfileData.profileActivities.map(act => act.activity),
    description: userProfileData.bio || "",
  };

  return (
    <div className="mx-auto w-full max-w-3xl mb-36 md:mt-32">
      {/* Section profile header info */}
      <div className="px-4">
        <div className="flex">
          <NavLink to={"/profile/" + userId} className={"mr-4"} aria-current="page">
            <img
              src={Arrow}
              alt="Retour"
              className="lg:w-12 lg:h-12 sm:w-10 sm:h-10"
            />
          </NavLink>
          <Typography variant="h1" className="mb-4 flex-1 text-center text-2xl font-title">
            Modifier le profil
          </Typography>
        </div>

        {/* Updated profile info fields */}
        <Formik
          initialValues={initialValues}
          validationSchema={profileValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
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
                  accept={mediaType.join(',')}
                />
                <div className="w-32 h-32 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-300 mr-6 flex-shrink-0">
                  {renderProfileImage(values)}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center">
                  <img
                    src={EditIcon}
                    alt="Modifier"
                    className="w-8 h-8"
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
                  value={`${values.firstname} ${values.lastname}`}
                  disabled
                  className="w-full p-2 border rounded-md border-gray-300 text-gray-500 capitalize"
                />
              </div>

              {/* Address field */}
              <div className="relative mb-6">
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
                  className="w-full p-2 border rounded-md border-gray-300"
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
                            `${suggestion.name}, ${suggestion.context.country.name}`,
                          );
                          setSuggestions([]);
                        }}
                      >
                        {suggestion.name}, {suggestion.context.country.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Biography field */}
              <div className="mb-6">
                <label htmlFor="description">
                  <Typography
                    variant="h6"
                    className="mb-2 block text-black font-bold"
                  >
                    Bio
                  </Typography>
                </label>
                <Field
                  name="description"
                  id="description"
                  as="textarea"
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
                <Field name="activities" component={ActivityPicker} />
                <ErrorMessage name="activities" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Language field */}
              <div className="mb-8">
                <label htmlFor="language">
                  <Typography
                    variant="h6"
                    className="mb-2 block text-black font-bold"
                  >
                    Langues
                  </Typography>
                </label>
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full lg:w-2/4 mx-auto p-3 bg-green text-white rounded-md hover:bg-opacity-85 disabled:bg-opacity-50 block"
              >
                Valider les modifications
              </button>
            </Form>
          )}
        </Formik>

        {/* Grey dividing line */}
        <div className="relative left-0 right-0 bottom-0 w-full mx-auto my-8 h-1.5 bg-light-white shadow-md" />

        {/* Updated account info (email & password & delete account) */}
        <div className="space-y-6">
          <Typography variant="h4" className="lg:mt-14 mt-8 mb-2 text-center text-xl font-title">
            Modifier mon compte
          </Typography>

          {/* Password field */}
          <button
            onClick={() => setPasswordModalOpen(true)}
            className="w-full lg:w-2/4 mx-auto p-3 border border-gray-400 rounded-md hover:bg-gray-50 block"
          >
            Changer le mot de passe
          </button>

          {/* Delete account field */}
          <button
            onClick={handleDeleteAccount}
            className="w-full p-3 text-red-500 font-bold hover:text-red-600"
          >
            Supprimer mon compte
          </button>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onConfirm={(newPassword) => {
          console.log("Mot de passe changé :", newPassword);
          setPasswordModalOpen(false);
        }}
      />

      <ProfileDeleteAccount isOpen={isDeleteModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
    </div>
  );
}
