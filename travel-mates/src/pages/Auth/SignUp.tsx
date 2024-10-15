import { Typography, Button } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import travelMatesLogo from "../../assets/Logo/travelmates.png";
import { useState } from "react";
import StepOne from "../../components/SignUpMultiStepForm/SignUpStepOne";
import StepTwo from "../../components/SignUpMultiStepForm/SignUpStepTwo";
//import StepThree from "../../components/SignUpMultiStepForm/SignUpStepThree";

export default function SignUpMultiStepForm() {
  // Step of the form
  const [step, setStep] = useState(1);

  // Validation of the form
  const validationSchemas = [
    Yup.object().shape({
      email: Yup.string().email("Email invalide").required("L'email est requis"),
      password: Yup.string().min(8, "Le mot de passe doit contenir au moins 8 caractères").required("Le mot de passe est requis"),
      confirmedPassword: Yup.string().oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre").required("La confirmation du mot de passe est requise")
    }),
    Yup.object().shape({
      firstName: Yup.string().required("Le prénom est requis"),
      lastName: Yup.string().required("Le nom est requis"),
      birthDate: Yup.date().required("La date de naissance est requise"),
      gender: Yup.string().required("Le genre est requis"),
      address: Yup.string().required("L'adresse est requise"),
      profilePicture: Yup.mixed().required("La photo de profil est requise")
    })
  ];

  // Display the next or previous step
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <>
      <section className="grid text-center h-screen items-center p-8">
        <div>
          {/* TravelMates logo */} 
          <div className="flex justify-center mb-8">
            <img src={travelMatesLogo} alt="Logo TravelMates" className="w-40" />
          </div>

          <Typography variant="h1" className="mb-4 text-2xl font-title">
            Créer un compte
          </Typography>

          {/* Progress bar */}
          <ProgressBar />

          {/* Sign up form */}
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
              profilePicture: null
            }}

            validationSchema={validationSchemas[step - 1]}

            // On submit of the form it will go to the next step 
            onSubmit={(values) => {
              console.log('Form values at step:', step, values);
              if (step === 2) {
                alert(JSON.stringify(values, null, 1));
              } else {
                handleNext();
              }
            }}
          >

            {({ isSubmitting }) => (
              <Form>
                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo />}
                {/* {step === 3 && <StepThree />} */}

                <div className="flex justify-between text-left mt-2">
                  {/* Button previous to go back to the previous step */}
                  {step > 1 && (
                    <Button type="button" onClick={handleBack} className="bg-gray-900 mt-6 w-full" >
                      Précédent
                    </Button>
                  )}

                  {/* Button next to go to the next step */}
                  <Button type="submit" disabled={isSubmitting} className="bg-green mt-6 w-full" >
                    {step === 3 ? "Valider" : "Continuer"}
                  </Button>
                </div>

                {/* Link for the sign in page for an user who have already an account */}
                <Typography color="black" className="text-sm !mt-4 mb-8 text-center font-normal">
                  Vous avez déjà un compte ?{" "}
                  <a href="/SignIn" className="font-medium text-black-900 text-sm underline">
                    Me connecter
                  </a>
                </Typography>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};