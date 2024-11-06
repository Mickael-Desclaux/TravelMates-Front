import { Button, Rating, Textarea, Typography } from "@material-tailwind/react";
import { Input } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Review } from "../../interfaces/Review";
import './ReviewCreate.css';

export default function ReviewCreate() {

    const defaultValues: Review = {
        rating: 5,
        description: "",
        medias: []
    };

    const mediaType = ['image/jpg', 'image/jpeg', 'image/png'];
    const mediaMaxSize: number = 10485760; // media max size = 10Mb
    const maxImages: number = 3;

    const validationSchema = Yup.object().shape({
        rating: Yup.number().required(),
        description: Yup.string(),
        medias: Yup.array()
            .of(
                Yup.mixed()
                    .test("fileType", "Seuls les formats jpg, jpeg et png sont autorisés", (value) => {
                        if (!value) return true;
                        return mediaType.includes((value as File).type);
                    })
                    .test("fileSize", "La taille de l'image doit être inférieure à 10Mo", (value) => {
                        if (!value) return true;
                        return (value as File).size <= mediaMaxSize;
                    })
            )
            .max(maxImages, `Vous ne pouvez pas ajouter plus de ${maxImages} images`)
    })

    function onSubmit(values: Review) {
        console.log(values)
    };

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
                                        Description
                                    </Typography>
                                    <Field
                                        component={Textarea}
                                        name="description"
                                        id="description"
                                        value={values.description}
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
                                        Images
                                    </Typography>
                                    <Field
                                        component={Input}
                                        id="medias"
                                        type="file"
                                        size="lg"
                                        multiple
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const newFiles = Array.from(event.currentTarget.files || []);
                                            const updatedMedias = [...values.medias, ...newFiles];
                                            setFieldValue("medias", updatedMedias);
                                        }}
                                        className="custom-input"
                                    />
                                    <ErrorMessage name="medias" component="div" className="text-red-500" />
                                    {values.medias && values.medias.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                            {values.medias.map((file, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt="Image"
                                                        className="w-full h-auto object-cover rounded-lg"
                                                    />
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        className="!bg-red-800 !text-white !p-2 !absolute !top-2 !right-2"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const updatedMedias = values.medias.filter((_f, i) => i !== index);
                                                            setFieldValue("medias", updatedMedias);
                                                        }}
                                                    >
                                                        &#10005;
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex justify-center">
                                        <Button type="submit" className="bg-green md:mb-8 mb-32 mt-8">
                                            Valider
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )

}