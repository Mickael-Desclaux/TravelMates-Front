import { Button, Rating, Textarea, Typography } from "@material-tailwind/react";
import { Input } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AddReview } from "../../interfaces/Review";
import './ReviewCreate.css';
import { addReview } from "../../api/Pin";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function ReviewCreate() {

    const navigate = useNavigate();
    const [globalError, setGlobalError] = useState<string>();
    const {id} = useParams();

    const defaultValues: AddReview = {
        rating: 5,
        comment: "",
        media: null,
    };

    const mediaType = ['image/jpg', 'image/jpeg', 'image/png'];
    const mediaMaxSize: number = 10485760; // media max size = 10Mb

    const validationSchema = Yup.object().shape({
        rating: Yup.number().required(),
        comment: Yup.string(),
        media: Yup.mixed()
            .test("fileType", "Seuls les formats jpg, jpeg et png sont autorisés", (value) => {
                if (!value) return true;
                return mediaType.includes((value as File).type);
            })
            .test("fileSize", "La taille de l'image doit être inférieure à 10Mo", (value) => {
                if (!value) return true;
                return (value as File).size <= mediaMaxSize;
            })
    })

    async function onSubmit(values: AddReview) {
        if (id !== undefined) {
            try {
                const response = await addReview(+id, values);
                navigate(`/pin/${response.pin_id}`);
            } catch (error: any) {
                
                if (error.response) {
                    const errorMessage = error.response.data.message || 
                        "Une erreur est survenue, veuillez réessayer.";
                    setGlobalError(errorMessage);
                } else if (error.message) {
                    setGlobalError(error.message);
                } else {
                    setGlobalError("Une erreur est survenue, veuillez réessayer.");
                }
            }
        } else {
            navigate(`/map`);
        }
    }

    return (
        <div className="md:mt-32 m-4">
            <Typography variant="h1" color="black" className="text-center mt-8 text-2xl font-title">
                Déposer un avis
            </Typography>
            <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, setFieldValue, values }) => (
                    <Form>
                        <div className="flex justify-center">
                            <div className="mt-8 mb-2 md:max-w-screen-md w-full">
                                <div className="m-4 flex flex-col gap-4">
                                    <Typography variant="h6" className="-mb-3">Note</Typography>
                                    <Field
                                        component={Rating}
                                        name="note"
                                        id="note"
                                        value={values.rating}
                                        onChange={(value: number) => setFieldValue("rating", value)}
                                        className="custom-rating"
                                    />
                                    <ErrorMessage name="rating" component="div" className="text-red-500 -mt-4" />
                                    <Typography variant="h6" className="mt-4 -mb-3">
                                        Commentaire
                                    </Typography>
                                    <Field
                                        component={Textarea}
                                        name="comment"
                                        id="comment"
                                        value={values.comment}
                                        onChange={handleChange}
                                        type="text"
                                        size="lg"
                                        placeholder="Décrivez votre expérience"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }} />
                                    <ErrorMessage name="description" component="div" className="text-red-500 -mt-4" />
                                    <Typography variant="h6" className="mt-4 -mb-3">
                                        Image
                                    </Typography>
                                    <Field
                                        component={Input}
                                        id="media"
                                        type="file"
                                        size="lg"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                            setFieldValue("media", file);
                                        }}
                                        className="custom-input"
                                    />
                                    <ErrorMessage name="media" component="div" className="text-red-500" />
                                    {values.media && (
                                        <div className="mt-4">
                                            <div className="relative">
                                                <img
                                                    src={URL.createObjectURL(values.media)}
                                                    alt="Image"
                                                    className="w-full h-auto object-cover rounded-lg"
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    className="!bg-red-800 !text-white !p-2 !absolute !top-2 !right-2"
                                                    onClick={() => setFieldValue("media", null)}
                                                >
                                                    &#10005;
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-center">
                                        <Button type="submit" className="bg-green md:mb-8 mb-32 mt-8">
                                            Valider
                                        </Button>
                                    </div>
                                    {globalError && (
                                        <div className="text-red-500 text-center mb-4">
                                            {globalError}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )

}
