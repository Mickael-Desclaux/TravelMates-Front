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

export default function SignUpMultiStepForm() {
  // Step of the form
  const [step, setStep] = useState(1);

  // Validation const
  const minimumDate = subYears(new Date(), 18);
  const mediaType = ['image/jpg', 'image/jpeg', 'image/png'];
  const mediaMaxSize: number = 10485760; // media max size = 10Mb

  // Validation of the form
  const validationSchemas = [
    // Step 1: Validate email, password, and password confirmation
    Yup.object().shape({
      email: Yup.string().email("Email invalide").required("L'email est requis"),
      password: Yup.string().min(8, "Le mot de passe doit contenir au moins 8 caractères").required("Le mot de passe est requis"),
      confirmedPassword: Yup.string().oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre").required("La confirmation du mot de passe est requise")
    }),
    // Step 2: Validate personal information fields
    Yup.object().shape({
      firstName: Yup.string().required("Le prénom est requis"),
      lastName: Yup.string().required("Le nom est requis"),
      birthDate: Yup.date().max(minimumDate, "Vous devez avoir au moins 18 ans").required("La date de naissance est requise"),
      gender: Yup.string().required("Le genre est requis"),
      address: Yup.string().required("L'adresse est requise"),
      language: Yup.array().of(Yup.string()).min(1, 'Sélectionnez au moins une langue').required("Sélectionnez au moins une langue"),
      profilePicture: Yup.mixed()
        .test("fileType", "Seuls les formats jpg, jpeg et png sont autorisés", (value) => {
            if (!value) return true;
            return mediaType.includes((value as File).type);
        })
        .test("fileSize", "La taille de l'image doit être inférieure à 10Mo", (value) => {
            if (!value) return true;
            return (value as File).size <= mediaMaxSize;
        }).required("Ajoutez une photo de profil")
    }),
    // Step 3: Validate the selection of at least three activities
    Yup.object().shape({
      activities: Yup.array().min(3, "Veuillez choisir au moins trois activités ").required("Veuillez choisir au moins trois activités")
    })
  ];

  // Display the next or previous step
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <>
      <div className="md:mt-32 mb-24">
        <section className="grid text-center items-center">
          <div className="mt-8 mb-2 w-96 max-w-screen-lg sm:w-96 mx-auto">
            {/* TravelMates logo */}
            <div className="flex justify-center mb-8">
              <img src={travelMatesLogo} alt="Logo TravelMates" className="w-40" />
            </div>

            {/* Progress bar */}
            {step < 4 && (
              <ProgressBar currentStep={step} totalSteps={3} />
            )}

            {/* Formik form for handling form state, validation, and submission */}
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
                profilePicture: null,
                activities: []
              }}

              // Load the validation schema based on the current step
              validationSchema={validationSchemas[step - 1]}

              // Handle form submission
              onSubmit={(values, { setSubmitting }) => {
                try {
                  console.log('Form values at step:', step, values);
                  handleNext();
                } catch (error) {
                  console.error("Error during submission", error);
                } finally {
                  setSubmitting(false);
                }
              }}
            >

              {({ values, isSubmitting }) => (
                <Form>
                  {/* Render the appropriate step component based on the current step */}
                  {step === 1 && <StepOne />}
                  {step === 2 && <StepTwo />}
                  {step === 3 && <StepThree />}
                  {step === 4 && <SignUpStepFour email={values.email} />}

                  <div className="flex justify-between text-left gap-x-8 mt-2 mb-8">
                    {/* Button previous to go back to the previous step */}
                    {step > 1 && step < 4 && (
                      <Button type="button" onClick={handleBack} className="bg-gray-900 mt-6 w-full" >
                        Précédent
                      </Button>
                    )}

                    {/* Button next to go to the next step */}
                    {step < 4 && (
                      <Button type="submit" disabled={isSubmitting} className="bg-green mt-6 w-full" >
                        {step === 3 ? "Valider" : "Continuer"}
                      </Button>
                    )}
                  </div>

                  {/* Link for the sign in page for an user who have already an account */}
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
    </>
  );
};