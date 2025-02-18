import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { object, string } from "yup";
import travelmatesLogo from "/Logo/travelmates.png";
import { HandleResetPassword } from "../../api/Auth";


export default function ResetPassword() {

    const [error, setError] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: object({
            password: string().required("Veuillez renseigner votre mot de passe")
        }),
        onSubmit: async values => {
            try {
                if (id && token) {
                    await HandleResetPassword(values, +id, token);
                    setValidationMessage("Votre mot de passe a bien été modifié");
                    setError("");
                }
            } catch (error: any) {
                if (error.response && error.response.data) {
                    setError(error.response.data.message);
                } else {
                    setError("Une erreur est survenue lors de la modification de votre mot de passe");
                }
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
                            Réinitialisation du mot de passe
                        </Typography>
                        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="h6" color="black" className="-mb-3">
                                    Nouveau mot de passe
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

                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-900 text-center">{formik.errors.password}</div>
                                ) : null}
                            </div>

                            <Button className="bg-green mt-6" type="submit" fullWidth>
                                Valider
                            </Button>

                            {error && (
                                <div className="text-red-900 mt-4 text-center">
                                    {error}
                                </div>
                            )}

                            {validationMessage && (
                                <div className="text-center text-green mt-4 rounded-lg">
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