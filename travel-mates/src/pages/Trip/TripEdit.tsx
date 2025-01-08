import { Typography, Input, Button, Textarea } from "@material-tailwind/react";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import TripConditions from "../../components/TripConditions/TripConditions";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { updateTrip } from "../../api/Trip";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { GetTripById } from "../../api/Trips";
import { UpdateTrip } from "../../interfaces/Trip";

export default function TripEdit() {

    const [data, setData] = useState<UpdateTrip>();
    const [globalError, setGlobalError] = useState<string>();
    const [activityPicker, setActivityPicker] = useState<boolean>(false);
    const [tripConditions, setTripConditions] = useState<boolean>(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await GetTripById(parseInt(id));
                    const updateTripData: UpdateTrip = {
                        title: response.title,
                        description: response.description,
                        activities: response.tripActivities.map(activity => activity.activity),
                        destination: response.destination,
                        date_from: response.date_from,
                        date_to: response.date_to,
                        budget_min: response.budget_min,
                        budget_max: response.budget_max,
                        condition_gender: response.condition_gender,
                        condition_age_min: response.condition_age_min,
                        condition_age_max: response.condition_age_max,
                        condition_physical: response.condition_physical,
                        condition_user_limit: response.condition_user_limit,
                    };
                    setData(updateTripData);
                    console.log("🚀 ~ fetchData ~ response:", response)
                } catch (error) {
                    setGlobalError("Une erreur est survenue, veuillez réessayer");
                }
            }
        }
        fetchData();
    }, [id]);

    const defaultValues: UpdateTrip = {
        title: data?.title || "",
        description: data?.description || "",
        activities: data?.activities || [],
        destination: data?.destination || "",
        date_from: data?.date_from || "",
        date_to: data?.date_to || "",
        budget_min: data?.budget_min || 50,
        budget_max: data?.budget_max || 5000,
        condition_gender: data?.condition_gender || "",
        condition_age_min: data?.condition_age_min || "",
        condition_age_max: data?.condition_age_max || "",
        condition_physical: data?.condition_physical || "",
        condition_user_limit: data?.condition_user_limit || 0,
    };

    const validationSchema = Yup.object().shape({
        destination: Yup.string().required("Veuillez renseigner une destination"),
        dates: Yup.string().required('Les dates du trip sont obligatoires'),
        title: Yup.string().required('Le titre est obligatoire'),
        description: Yup.string().required("Veuillez renseigner une description"),
        activities: Yup.array().min(1, "Veuillez sélectionner au moins une activité"),
        budget_min: Yup.number()
            .min(50, 'Le budget minimum doit être au moins de 50')
            .required('Veuillez indiquer un budget minimum'),
        budget_max: Yup.number().moreThan(
            Yup.ref('conditions_budget_min'),
            'Le budget maximum doit être supérieur au budget minimum',
        ),

    })

    async function onSubmit(values: UpdateTrip) {
        if (id) {
            try {               
                await updateTrip(values, parseInt(id));
                navigate(`/trip/${id}`);
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
    
    const handleValidation = (values: UpdateTrip) => {
        if ((values.activities ?? []).length > 0) {
            setActivityPicker(false);
        } else {
            throw Error('Please select at least one activity.');
        }
    };

    return (
        <div className="md:mt-32">
            <Typography variant="h1" color="black" className="text-center mt-8 text-2xl font-title">
                Modifier le trip
            </Typography>
            <Formik
                initialValues={defaultValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue, values, handleChange }: FormikProps<UpdateTrip>) => (
                    <Form>
                        <div className="flex flex-col gap-6">
                            <section className="mt-4 max-w-lg mx-auto md:min-w-[25vw]">

                                {/* Trip title */}
                                <div className="mt-4">
                                    <Typography className="block text-black font-bold mb-1">
                                        Titre du voyage
                                    </Typography>
                                    <Field
                                        id="title"
                                        name="title"
                                        as={Input}
                                        value={values.title}
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500" />
                                </div>

                                {/* Trip description */}
                                <div className="mt-4">
                                    <Typography className="block text-black font-bold mb-1">
                                        Décrivez votre voyage
                                    </Typography>
                                    <Field
                                        component={Textarea}
                                        id="description"
                                        name="description"
                                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:border-blue-500"
                                        onChange={handleChange}
                                        value={values.description}
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500" />
                                </div>

                                {/* Activity selection with burger menu */}
                                <div className="mt-4">
                                    <Typography className="block text-black font-bold mb-1">
                                        Choisir les activités
                                    </Typography>
                                    <div
                                        onClick={() => setActivityPicker(true)}
                                        className="flex items-center border border-gray-300 rounded p-2 w-full bg-white cursor-pointer"
                                    >
                                        <span className="text-gray-700">Activités</span>
                                        <Bars3Icon className="ml-auto h-6 w-6 text-gray-500" />
                                    </div>
                                    <ErrorMessage name="activities" component="div" className="text-red-500" />
                                </div>
                                {/* Budget slider */}
                                <div className="mt-4">
                                    <Typography className="block text-black font-bold mb-1">
                                        Budget hors transport
                                    </Typography>
                                    <div className='mt-4'>
                                        <RangeSlider
                                            nameMin="budget_min"
                                            nameMax="budget_max"
                                            min={50}
                                            max={5000}
                                            step={50}
                                            value={[values.budget_min ?? 0, values.budget_max ?? 0]}
                                            onChange={(newValues: number[]) => {
                                                if (newValues.length >= 2) {
                                                    setFieldValue('budget_min', newValues[0]);
                                                    setFieldValue('budget_max', newValues[1]);
                                                }
                                            }}
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="conditions_budget_min"
                                        component="div"
                                        className="text-red-500"
                                    />
                                    <ErrorMessage
                                        name="conditions_budget_max"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>

                                {/* Travel conditions selection */}
                                <div className="mt-4">
                                    <Typography className="block text-black font-bold mb-1">
                                        Avec qui voulez-vous partir ?
                                    </Typography>
                                    <div
                                        onClick={() => setTripConditions(true)}
                                        className="flex items-center border border-gray-300 rounded p-2 w-full bg-white cursor-pointer"
                                    >
                                        <span className="text-gray-700">Faites votre choix</span>
                                        <Bars3Icon className="ml-auto h-6 w-6 text-gray-500" />
                                    </div>
                                </div>
                                <ErrorMessage name="condition_gender" component="div" className="text-red-500" />
                            </section>

                            {/* ActivityPicker displayed as full-screen modal */}
                            {activityPicker && (
                                <div className="fixed inset-0 z-50 bg-white flex flex-col justify-center">
                                    {/* Button to close the ActivityPicker */}
                                    <button
                                        onClick={() => setActivityPicker(false)}
                                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
                                    >
                                        <XMarkIcon className='w-4 aspect-ratio-1 text-white' />
                                    </button>

                                    <div>
                                        {/* Title */}
                                        <Typography variant="h2" className="mb-6 text-center font-title text-2xl -mt-12">
                                            Activités de votre trip
                                        </Typography>

                                        {/* Display ActivityPicker */}
                                        <ActivityPicker />
                                    </div>
                                    <div className='flex justify-center'>
                                        {/* Validation button */}
                                        <Button
                                            size="lg"
                                            className="mt-6 bg-green"
                                            onClick={() => handleValidation(values)}
                                        >
                                            Valider
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* TripConditions displayed as full-screen modal */}
                            {tripConditions && (
                                <div className="fixed inset-0 z-50 bg-white flex flex-col justify-center items-center">
                                    {/* Button to close TripConditions */}
                                    <button
                                        onClick={() => setTripConditions(false)}
                                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
                                    >
                                        Fermer
                                    </button>

                                    {/* Title */}
                                    <Typography variant="h4" className="mb-6 text-center">
                                        Conditions de votre trip
                                    </Typography>

                                    {/* Display TripConditions */}
                                    <TripConditions />

                                    {/* Validation button */}
                                    <Button
                                        size="lg"
                                        className="mt-6 bg-green"
                                        onClick={() => setTripConditions(false)}
                                    >
                                        Valider
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center ">
                            <Button type="submit" className="mt-4 md:mt-8 mb-4 bg-green text-white p-3 rounded-lg mb-32">
                                Enregistrer
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
    )
}