import { Button, Input, Typography, Textarea } from "@material-tailwind/react";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Pin } from "../../interfaces/Pin";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import getPoiSuggestions from "../../api/Mapbox";

interface PoiSuggestion {
    name: string;
    address: string;
}

export default function PinCreate() {

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [suggestions, setSuggestions] = useState<PoiSuggestion[]>([]);
    const proximity: string = `${longitude},${latitude}`;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        }
    }, [latitude, longitude]);

    async function getSuggestions(query: string, proximity: string) {
        try {
            const suggestions = await getPoiSuggestions(query, proximity);
            setSuggestions(suggestions);
        } catch (error) {
            console.error(error);
        };
    };

    function handleTitleChange(value: string, setFieldValue: (field: string, value: string) => void) {
        getSuggestions(value, proximity);
        setFieldValue('title', value);
    }

    const defaultValues: Pin = {
        title: "",
        description: "",
        medias: [] as File[],
        activities: []
    }

    const mediaType = ['image/jpg', 'image/jpeg', 'image/png'];
    const mediaMaxSize: number = 10485760; // media max size = 10Mb
    const maxImages: number = 3;

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Veuillez renseigner le titre du marqueur"),
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
            .required("Veuillez ajouter au moins une image"),
        activities: Yup.array().min(1, "Veuillez sélectionner au moins une activité").max(6, "Veuillez sélectionner moins de 6 activités")
        })

    function onSubmit(values: Pin) {
        console.log(values)
    }

    return (
        <>
            <Button type="button" onClick={() => console.log(proximity)}>test</Button>
            <Typography variant="h1" color="black" className="text-center mt-8 text-2xl font-title">
                Créer un marqueur
            </Typography>
            <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, handleChange, setFieldValue, values }) => (
                    <Form>
                        <div className="flex justify-center">
                            <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                                <div className="mb-1 flex flex-col gap-6">
                                    <Typography variant="h6" className="-mb-3">
                                        Titre
                                    </Typography>
                                    <Field
                                        component={Input}
                                        name="title"
                                        id="title"
                                        value={values.title}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value, setFieldValue)}
                                        type="text"
                                        size="lg"
                                        placeholder="Tour Eiffel, Kilimandjaro, etc..."
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900" />
                                    <ErrorMessage name="title" component="div" className="text-red-500" />
                                    {suggestions.length > 0 && (
                                        <ul className="absolute left-0 right-0 border border-gray-300 bg-white rounded shadow-lg z-10 max-h-40 overflow-auto">
                                            {suggestions.map((suggestion: PoiSuggestion, index: number) => (
                                                <li
                                                    key={index}
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => {
                                                        setFieldValue('destination',suggestion.name + ', ' + suggestion.address,);
                                                        setSuggestions([]);
                                                    }}
                                                >
                                                    {suggestion.name ? suggestion.name : 'Unknown'},{' '}
                                                    {suggestion.address ? suggestion.address : 'Unknown'}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <Typography variant="h6" className="-mb-3">
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
                                        }} />
                                        <ErrorMessage name="description" component="div" className="text-red-500" />
                                    <Typography variant="h6" className="-mb-3">
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
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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

                                    <Typography variant="h6" className="-mb-3">
                                        Activités
                                    </Typography>
                                    <ActivityPicker />
                                    <ErrorMessage name="activities" component="div" className="text-red-500" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit" size="lg" disabled={isSubmitting} className="bg-green -mb-3 mb-12">
                                Valider
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}