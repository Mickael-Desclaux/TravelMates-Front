import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import { object, string } from "yup";
import travelmatesLogo from "../../assets/Logo/travelmates.png";
import HandleSignIn from "../../api/Auth";

export default function SignIn() {

    const [loginError, setLoginError] = useState("");

    // Validation du formulaire
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: object({
            email: string().email("Veuillez renseigner une adresse mail valide").required("Veuillez renseigner votre adresse email"),
            password: string().required("Veuillez renseigner votre mot de passe")
        }),
        onSubmit: values => {
            try {
                HandleSignIn(values);
            } catch (error) {
                setLoginError(error as string)
            }
        }
    })

    return (
        <>
            {/* TravelMates logo */}
            <div className="flex justify-center mt-10 mb-10">
                <img src={travelmatesLogo} alt="TravelMates" className="w-40" />
            </div>

            {/* Sign in form */}
            <div className="flex justify-center mt-12">
                <Card color="transparent" shadow={false}>
                    <Typography variant="h1" color="black" className="text-center text-2xl font-title">
                        Connexion
                    </Typography>
                    <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="black" className="-mb-3">
                                Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Votre email"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }} crossOrigin={undefined}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                name="email"
                                />                                

                            {/* Email error message display */}
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-900 text-center">{formik.errors.email}</div>
                            ) : null}

                            <Typography variant="h6" color="black" className="-mb-3">
                                Mot de passe
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }} crossOrigin={undefined}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                name="password"
                                />

                            <div className="flex flex-col items-end">
                                <a href="/forgot-password" className="text-sm text-black underline -mt-3">
                                    Mot de passe oublié ?
                                </a>
                            </div>


                            {/* Password error message display */}
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-900 text-center">{formik.errors.password}</div>
                            ) : null}

                        </div>
                        <Button className="bg-green mt-6" type="submit" fullWidth>
                            Connexion
                        </Button>

                        {/* Login error message display */}
                        {loginError && (
                            <div className="text-red-900 text-center">
                                {loginError}
                            </div>
                        )}

                        <Typography color="black" className="mt-4 text-center font-normal text-sm">
                            Vous n'avez pas de compte?{" "}
                            <a href="/sign-up" className="font-medium text-black-900 underline text-sm">
                                Créer un compte
                            </a>
                        </Typography>
                    </form>
                </Card>
            </div>
        </>
    )
}