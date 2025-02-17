import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { object, string } from "yup";
import travelmatesLogo from "/Logo/travelmates.png";
import { HandleForgotPassword } from "../../api/Auth";

export default function ForgotPassword() {

    const [error, setError] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: object({
            email: string().email("Veuillez renseigner une adresse mail valide").required("Veuillez renseigner votre adresse email"),
        }),
        onSubmit: async values => {
            try {
                await HandleForgotPassword(values);
                setValidationMessage(`Nous avons envoyé un mail de réinitialisation à ${values.email}`)
            } catch (error: any) {
                setError(error)
            }
        }
    })

    return (
        <>
            <div className="md:mt-32">
                <div className="flex justify-center mt-10 mb-10">
                    <NavLink to="/">
                        <img  src={travelmatesLogo} alt="TravelMates" className="w-40" />
                    </NavLink>
                </div>

                <div className="flex justify-center mt-12">
                    <Card color="transparent" shadow={false}>
                        <Typography variant="h1" color="black" className="text-center text-2xl font-title">
                            Mot de passe oublié
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

                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-900 text-center">{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <Button className="bg-green mt-6" type="submit" fullWidth>
                                Envoyer
                            </Button>

                            {error && (
                                <div className="text-red-900 text-center">
                                    {error}
                                </div>
                            )}

                            {validationMessage && (
                                <div className="text-center bg-green mt-4 rounded-lg text-white">
                                    {validationMessage}
                                </div>
                            )}
                        </form>
                    </Card>
                </div>
            </div>
        </>
    )
}