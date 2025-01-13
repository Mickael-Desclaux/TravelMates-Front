import { Typography, Button } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import travelMatesLogo from "../../assets/Logo/travelmates.png";
import { useState } from "react";
import StepOne from "../../components/SignUpMultiStepForm/SignUpStepOne";
import StepTwo from "../../components/SignUpMultiStepForm/SignUpStepTwo";
import StepThree from "../../components/SignUpMultiStepForm/SignUpStepThree";
import SignUpStepFour from "../../components/SignUpMultiStepForm/SignUpStepFour";
import { subYears } from "date-fns";
import HandleRegister from "../../api/Auth";
import { Register } from "../../interfaces/Auth";

export default function SignUpMultiStepForm() {
  const [step, setStep] = useState(1);

  const minimumDate = subYears(new Date(), 18);
  const mediaType = ['image/jpg', 'image/jpeg', 'image/png'];
  const mediaMaxSize = 10485760;
 
  
  const genderMapping: { [key: string]: string } = {
    Femme: 'female',
    Homme: 'male',
    Autres: 'other',
  };
  
  const languageMapping = {
    Allemand: 'German',
    Anglais: 'English',
    Arabe: 'Arabic',
    Espagnol: 'Spanish',
    Français: 'French',
    Grec: 'Greek',
    Italien: 'Italian',
    Mandarin: 'Mandarin',
    Néerlandais: 'Dutch',
    Polonais: 'Polish',
    Portugais: 'Portuguese',
    Russe: 'Russian',
  };
  
  const validationSchemas = [
    Yup.object().shape({
      email: Yup.string().email("Email invalide").required("L'email est requis"),
      password: Yup.string().min(8, "Le mot de passe doit contenir au moins 8 caractères").required("Le mot de passe est requis"),
      confirmedPassword: Yup.string().oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre").required("La confirmation du mot de passe est requise")
    }),
    Yup.object().shape({
      firstName: Yup.string().required("Le prénom est requis"),
      lastName: Yup.string().required("Le nom est requis"),
      birthDate: Yup.date().max(minimumDate, "Vous devez avoir au moins 18 ans").required("La date de naissance est requise"),
      gender: Yup.string().required("Le genre est requis"),
      address: Yup.string().required("L'adresse est requise"),
      language: Yup.array().of(Yup.string()).min(1, 'Sélectionnez au moins une langue').required("Sélectionnez au moins une langue"),
      profilePicture: Yup.mixed()
        .test("fileType", "Seuls les formats jpg, jpeg et png sont autorisés", (value) => {
          if (!value) return false;
          return mediaType.includes((value as File).type);
        })
        .test("fileSize", "La taille de l'image doit être inférieure à 10Mo", (value) => {
          if (!value) return false;
          return (value as File).size <= mediaMaxSize;
        })
        .required("File is required")
        
    }),
    Yup.object().shape({
      activities: Yup.array().min(3, "Veuillez choisir au moins trois activités").required("Veuillez choisir au moins trois activités")
    })
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="md:mt-32 mb-24">
      <section className="grid text-center items-center">
        <div className="mt-8 mb-2 w-96 max-w-screen-lg sm:w-96 mx-auto">
          <div className="flex justify-center mb-8">
            <img src={travelMatesLogo} alt="Logo TravelMates" className="w-40" />
          </div>
          {step < 4 && <ProgressBar currentStep={step} totalSteps={3} />}
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmedPassword: "",
              firstName: "",
              lastName: "",
              birthDate: "",
              gender: "",
              address: "",
              language: [],
              profilePicture: null as unknown as File,
              activities: []
            }}
            validationSchema={validationSchemas[step - 1]}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (step < 3) {
                  handleNext();
                } else {
                  // Traduire les valeurs françaises en anglais pour le back-end
                  const translatedGender = genderMapping[values.gender];
                  const translatedLanguages = values.language.map((lang) => languageMapping[lang]);
                  if (!(values.profilePicture instanceof File)) {
                    throw new Error("La photo de profil doit être un fichier valide.");
                }
                
                  const payload: Register = {
                    email: values.email,
                    password: values.password,
                    firstname: values.firstName,
                    lastname: values.lastName,
                    birth_date: new Date(values.birthDate).toISOString().split('T')[0],
                    gender: translatedGender,
                    address: values.address,
                    languages: translatedLanguages,
                    activities: values.activities,
                    profile_picture: values.profilePicture,
                  };
            
                
                  await HandleRegister(payload);
            
                  // Aller à l'étape de confirmation
                  setStep(4);
                }
              } catch (error: any) {
                console.error("Erreur pendant l'inscription :", error.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo />}
                {step === 3 && <StepThree />}
                {step === 4 && <SignUpStepFour email={values.email} />}
                <div className="flex justify-between gap-x-8 mt-2 mb-8">
                  {step > 1 && step < 4 && (
                    <Button type="button" onClick={handleBack} className="bg-gray-900 mt-6 w-full">
                      Précédent
                    </Button>
                  )}
                  {step < 4 && (
                    <Button type="submit" disabled={isSubmitting} className="bg-green mt-6 w-full">
                      {step === 3 ? "Valider" : "Continuer"}
                    </Button>
                  )}
                </div>
                {step === 1 && (
                  <Typography color="black" className="text-sm !mt-4 mb-8 text-center font-normal">
                    Vous avez déjà un compte ?{" "}
                    <a href="/sign-in" className="font-medium text-black-900 text-sm underline">
                      Me connecter
                    </a>
                  </Typography>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
}
