import { Typography, Button } from "@material-tailwind/react";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
//import travelMatesLogo from "../../assets/Logo/travelmates.png";

export default function SignUp() {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email invalide")
      .required("L'email est requis"),
    password: Yup.string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Le mot de passe est requis"),
    confirmedPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "Les mots de passe doivent correspondre"
      )
      .required("La confirmation du mot de passe est requise"),
  });

  return (
    <>
      <section className="grid text-center h-screen items-center p-8">
        <div>
          {/* TravelMates logo 
          <div className="flex justify-center mb-8">
            <img
              src={travelMatesLogo}
              alt="Logo TravelMates"
              className="w-40"
            />
          </div> */}

          <Typography variant="h3" color="blue-gray" className="mb-4">
            Créer un compte
          </Typography>

          {/* Progress bar */}
          <ProgressBar />

          {/* Sign up form */}
          <Formik
            initialValues={{ email: "", password: "", confirmedPassword: "" }}
            validationSchema={SignupSchema}
            validate={(values) => {
              const errors = {};

              // Verified if all fields are empty
              if (!values.email && !values.password && !values.confirmedPassword) {
                errors.general = "Tous les champs sont requis";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ errors, isSubmitting }) => (
              <form
                action="#"
                className="mx-auto mt-16 max-w-[24rem] text-left"
              >
                {/* Display of general errors */}
                {errors.general && (
                  <div className="text-red-500 mb-4">{errors.general}</div>
                )}

                <div className="mb-6">
                  <label htmlFor="email">
                    <Typography
                      variant="h6"
                      className="mb-2 block font-medium text-gray-900"
                    >
                      Email
                    </Typography>
                  </label>
                  <Field
                    id="email"
                    color="gray"
                    type="email"
                    name="email"
                    placeholder="Votre email"
                    className="w-full mb-2 bg-transparent placeholder:text-slate-400 text-gray-900 text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password">
                    <Typography
                      variant="h6"
                      className="mb-2 block font-medium text-gray-900"
                    >
                      Mot de passe
                    </Typography>
                  </label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Choisir un mot de passe"
                    className="w-full mb-2 bg-transparent placeholder:text-slate-400 text-gray-900 text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password">
                    <Typography
                      variant="h6"
                      className="mb-2 block font-medium text-gray-900"
                    >
                      Confirmer votre mot de passe
                    </Typography>
                  </label>
                  <Field
                    id="confirmedPassword"
                    type="password"
                    name="confirmedPassword"
                    placeholder="Confirmer votre mot de passe"
                    className="w-full mb-2 bg-transparent placeholder:text-slate-400 text-gray-900 text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                  />
                  <ErrorMessage
                    name="confirmedPassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="bg-green mt-6"
                  fullWidth
                >
                  Continuer
                </Button>
                <Typography color="gray" className="text-sm !mt-4 text-center font-normal">
                  Vous avez déjà un compte ?{" "}
                  <a href="/SignIn" className="font-medium text-gray-900 underline">
                    Me connecter
                  </a>
                </Typography>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}
