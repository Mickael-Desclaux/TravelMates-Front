import { Typography, Input, Textarea, Button } from "@material-tailwind/react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import { useEffect, useState } from "react";
import { EditPin } from "../../interfaces/Pin";
import * as Yup from "yup";
import { GetPinById, UpdatePin } from "../../api/Pin";

export default function PinEdit() {

    const navigate = useNavigate();
    const [globalError, setGlobalError] = useState<string>();
    const { id } = useParams();

    const defaultValues: EditPin = {
        description: "",
        newMedias: [],
        existingMedias: [],
        activities: [],
    }

    const [initialValues, setInitialValues] = useState<EditPin>(defaultValues);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await GetPinById(parseInt(id));

                    setInitialValues({
                        description: response.description,
                        existingMedias: response.pinMedias.map(url => url.media.url),
                        newMedias: [],
                        activities: response.pinActivities.map(activity => activity.activity),
                    });

                } catch (error) {
                    setGlobalError("Une erreur est survenue, veuillez réessayer");
                }
            }
        }
        fetchData();
    }, [id]);

    // Validation const
    const mediaType = ['image/jpg', 'image/jpeg', 'image/png'];
    const mediaMaxSize: number = 10485760; // media max size = 10Mb
    const maxImages: number = 3;
    const minImages: number = 1;

    const validationSchema = Yup.object().shape({
        description: Yup.string().required("Veuillez renseigner une description du marqueur"),
        newMedias: Yup.array()
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
            .min(minImages, "Veuillez ajouter au moins une image")
            .max(maxImages, `Vous ne pouvez pas ajouter plus de ${maxImages} images`)
            .required("Veuillez ajouter au moins une image"),
        activities: Yup.array().min(1, "Veuillez sélectionner au moins une activité").max(6, "Veuillez sélectionner moins de 6 activités")
    })

    async function onSubmit(values: EditPin) {
        if (id) {
            try {
                const response = await UpdatePin(values, parseInt(id));
                navigate(`/pin/${response.id}`);
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
        }
    }

    return (
        <div className="md:mt-32">
            <Typography variant="h1" color="black" className="text-center mt-8 text-2xl font-title">
                Modifier le marqueur
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ handleChange, setFieldValue, values }) => (
                    <Form>
                        <div className="flex justify-center md:max-w-[40vw] mx-auto">
                            <div className="mt-8 mb-2 max-w-screen-lg">
                                <div className="m-4 flex flex-col gap-6">
                                    <Typography className="-mb-3 font-bold font-title">
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
                                        placeholder="Décrivez le marqueur"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500 -mt-4" />

                                    <Typography className="-mb-3 font-bold font-title">
                                        Ajouter des images
                                    </Typography>
                                    <Field
                                        component={Input}
                                        id="newMedias"
                                        type="file"
                                        size="lg"
                                        multiple
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const newFiles = Array.from(event.currentTarget.files || []);
                                            setFieldValue("newMedias", [...values.newMedias, ...newFiles]);
                                        }}
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                    />
                                    <ErrorMessage name="newMedias" component="div" className="text-red-500 -mt-4" />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                        {/* Affichage des images existantes */}
                                        {values.existingMedias.map((url, index) => (
                                            <div key={`existing-${index}`} className="relative">
                                                <img
                                                    src={import.meta.env.VITE_API_BASE_URL + url}
                                                    alt="Image existante"
                                                    className="w-full h-auto object-cover rounded-lg"
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    className="!bg-red-800 !text-white !p-2 !absolute !top-2 !right-2"
                                                    onClick={() => {
                                                        const updatedMedias = values.existingMedias.filter((_u, i) => i !== index);
                                                        setFieldValue("existingMedias", updatedMedias);
                                                    }}
                                                >
                                                    &#10005;
                                                </Button>
                                            </div>
                                        ))}

                                        {/* Affichage des nouvelles images */}
                                        {values.newMedias.map((file, index) => (
                                            <div key={`new-${index}`} className="relative">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt="Nouvelle image"
                                                    className="w-full h-auto object-cover rounded-lg"
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    className="!bg-red-800 !text-white !p-2 !absolute !top-2 !right-2"
                                                    onClick={() => {
                                                        const updatedMedias = values.newMedias.filter((_f, i) => i !== index);
                                                        setFieldValue("newMedias", updatedMedias);
                                                    }}
                                                >
                                                    &#10005;
                                                </Button>
                                            </div>
                                        ))}
                                    </div>

                                    <Typography className="-mb-3 font-bold font-title">
                                        Activités
                                    </Typography>
                                    <ActivityPicker />
                                </div>
                                <ErrorMessage name="activities" component="div" className="text-red-500 mb-8" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit" size="lg" className="bg-green md:mb-8 mb-32">
                                Valider
                            </Button>
                        </div>
                        {globalError && (
                            <div className="text-red-500 text-center mb-4">
                                {globalError}
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}