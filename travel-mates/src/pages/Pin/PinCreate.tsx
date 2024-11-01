import { Button, Input, Typography, Textarea } from "@material-tailwind/react";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddPin } from "../../interfaces/Pin";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getPoiSuggestions, retrieveSuggestion } from "../../api/Mapbox";
import getUserAddressCoordinates from "../../api/User";

interface PoiSuggestion {
    name: string;
    address: string;
    mapbox_id: string;
    context: {
        country: {
            name: string;
        }
    }
}

export default function PinCreate() {

    // #region useState & const
    const [selectedSuggestion, setSelectedSuggestion] = useState<PoiSuggestion>();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [suggestions, setSuggestions] = useState<PoiSuggestion[]>([]);
    const [bbox, setBbox] = useState<string>('');
    const proximity: string = `${longitude},${latitude}`;

    // Coordinates box to display only suggestions that are 100km or less than current position
    const distanceKm = 100;
    const earthRadiusKm = 6371; // Average Earth radius in km
    // #endregion

    // #region useEffect
    // Get user coordinates
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    const coordinates = getUserAddressCoordinates();
                    const [defaultLongitude, defaultLatitude] = coordinates.split(',').map(Number);
                    setLatitude(defaultLatitude);
                    setLongitude(defaultLongitude);
                }
            );
        } else {
            const coordinates = getUserAddressCoordinates();
            const [defaultLongitude, defaultLatitude] = coordinates.split(',').map(Number);
            setLatitude(defaultLatitude);
            setLongitude(defaultLongitude);
        }
    }, []);

    // Set Bbox to limit suggestions around the user
    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            const latOffset = distanceKm / earthRadiusKm * (180 / Math.PI);
            const lonOffset = distanceKm / (earthRadiusKm * Math.cos(latitude * Math.PI / 180)) * (180 / Math.PI);
            const minLat = latitude - latOffset;
            const maxLat = latitude + latOffset;
            const minLon = longitude - lonOffset;
            const maxLon = longitude + lonOffset;

            setBbox(`${minLon},${minLat},${maxLon},${maxLat}`);
        }
    }, [latitude, longitude]);

    // Handle suggestions closing after click outside the div
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as Element)?.closest('.suggestions-container')) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    // #endregion

    // #region functions
    // Get suggestions data
    async function getSuggestions(query: string, proximity: string, bbox: string) {
        try {
            if (bbox) {
                const suggestions = await getPoiSuggestions(query, proximity, bbox);
                setSuggestions(suggestions);
                if (selectedSuggestion) {
                    const selectedSuggestionIndex = suggestions.findIndex((suggestion: PoiSuggestion) => suggestion.mapbox_id === selectedSuggestion.mapbox_id);
                    if (selectedSuggestionIndex !== -1) {
                        setSelectedSuggestion(suggestions[selectedSuggestionIndex]);
                    }
                }
            } else {
                console.log('bbox is undefined');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Handle suggestions display (on/off)
    function handleTitleChange(value: string, setFieldValue: (field: string, value: string) => void) {
        setShowSuggestions(true);
        setFieldValue('title', value);

        if (value.trim() === '') {
            setSuggestions([]);
            return;
        }

        getSuggestions(value, proximity, bbox);
    }
    // #endregion

    // #region form validation
    const defaultValues: AddPin = {
        title: "",
        description: "",
        longitude: null,
        latitude: null,
        medias: [] as File[],
        activities: [],
        selectedSuggestion: false,
    }

    // Validation const
    const mediaType = ['image/jpg', 'image/jpeg', 'image/png'];
    const mediaMaxSize: number = 10485760; // media max size = 10Mb
    const maxImages: number = 3;

    // Check if title is submitted through a suggestion
    const validateTitle = (values: AddPin) => {
        const errors: Record<string, string> = {};
        if (!values.selectedSuggestion || !values.longitude || !values.latitude) {
            errors.selectedSuggestion = 'Veuillez sélectionner un choix de la liste';
        }
        return errors;
    };

    // Validation schema
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Veuillez renseigner le titre du marqueur"),
        description: Yup.string().required("Veuillez renseigner une description du marqueur"),
        longitude: Yup.number().required("Une erreur est survenue lors de la récupération des coordonnées de votre marqueur"),
        latitude: Yup.number().required("Une erreur est survenue lors de la récupération des coordonnées de votre marqueur"),
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

    function onSubmit(values: AddPin) {
        console.log(values)
    }
    // #endregion

    return (
        <>
            <div className="md:mt-32">
                <Typography variant="h1" color="black" className="text-center mt-8 text-2xl font-title">
                    Créer un marqueur
                </Typography>
                <Formik
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
                    validate={validateTitle}
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
                                        <div className="relative">
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
                                            <ErrorMessage name="selectedSuggestion" component="div" className="text-red-500" />
                                            <ErrorMessage name="title" component="div" className="text-red-500" />
                                            <div className="suggestions-container">
                                                {showSuggestions && (
                                                    <ul className="absolute left-0 right-0 border border-gray-300 bg-white rounded shadow-lg z-10 max-h-40 overflow-auto top-full">
                                                        {suggestions.map((suggestion: PoiSuggestion, index: number) => (
                                                            <li
                                                                key={index}
                                                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                                                onClick={() => {
                                                                    const mapboxId = suggestion.mapbox_id;
                                                                    retrieveSuggestion(mapboxId)
                                                                        .then((response) => {
                                                                            setFieldValue('title', suggestion.name + ' ' + suggestion.context.country.name);
                                                                            if (response) {
                                                                                const coordinates = response.geometry.coordinates;
                                                                                setFieldValue('longitude', coordinates[0]);
                                                                                setFieldValue('latitude', coordinates[1]);
                                                                                setFieldValue('selectedSuggestion', true);
                                                                            }
                                                                        })
                                                                        .catch((error) => {
                                                                            console.error('Erreur lors de la récupération:', error);
                                                                        });
                                                                    setSelectedSuggestion(suggestion);
                                                                    setSuggestions([]);
                                                                }}


                                                            >
                                                                {suggestion.name ? suggestion.name : 'Unknown'},{' '}
                                                                {suggestion.address ? suggestion.address : 'Unknown'}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
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
                                <Button type="submit" size="lg" disabled={isSubmitting} className="bg-green md:mb-8 mb-32 -mt-10">
                                    Valider
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}