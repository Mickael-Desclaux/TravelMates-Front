import { Typography, Button } from "@material-tailwind/react";
import { ErrorMessage, Field, Formik } from 'formik';

/* interface SignUpProps {
    email: string,
    password: string,
    confirmedPassword: string
} */
export default function SignUp() {


  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Créer un compte
        </Typography>

        <Formik
            initialValues={{ email: '', password: '', confirmedPassword: '' }}
            validate={values => {
            const errors = {};
            if (!values.email) {
            errors.email = 'Required';
            } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
            errors.email = 'Email invalide';
            }
            if (!values.password) {
                errors.password = 'Required';
              }
              if (!values.confirmedPassword) {
                errors.confirmedPassword = 'Required';
              } else if (values.password !== values.confirmedPassword) {
                errors.confirmedPassword = 'Les mots de passe ne correspondent pas';
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
        {({ isSubmitting }) => (
            <form action="#" className="mx-auto mt-16 max-w-[24rem] text-left" onSubmit={(e) => e.preventDefault()} >
                <div className="mb-6">

                    <label htmlFor="email">
                    <Typography
                        variant="small"
                        className="mb-2 block font-medium text-gray-900"
                    >
                        {/* {email} */}
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
                    <ErrorMessage name="email" component="div" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password">
                    <Typography
                        variant="small"
                        className="mb-2 block font-medium text-gray-900"
                    >
                        {/* {password} */}
                        Mot de passe
                    </Typography>
                    </label>
                    <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="********"
                    className="w-full mb-2 bg-transparent placeholder:text-slate-400 text-gray-900 text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                    />
                    <ErrorMessage name="password" component="div" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password">
                    <Typography
                        variant="small"
                        className="mb-2 block font-medium text-gray-900"
                    >
                        {/* {confirmedPassword} */}
                        Confirmer votre mot de passe
                    </Typography>
                    </label>
                    <Field
                    id="confirmedPassword"
                    type="password"
                    name="confirmedPassword"
                    placeholder="********"
                    className="w-full mb-2 bg-transparent placeholder:text-slate-400 text-gray-900 text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                    />
                    <ErrorMessage name="password" component="div" />
                </div>
                <Button type="submit" disabled={isSubmitting} color="gray" size="lg" className="mt-6" fullWidth>
                    Continuer
                </Button>
                <Typography
                    variant="small"
                    color="gray"
                    className="!mt-4 text-center font-normal"
                >
                    Vous avez déjà un compte ?{" "}
                    <a href="#" className="font-medium text-gray-900">
                    Me connecter
                    </a>
                </Typography>
            </form>
            )}
        </Formik>
      </div>
    </section>
  );
}