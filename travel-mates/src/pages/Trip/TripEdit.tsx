import { Typography, Input, Button, Textarea } from "@material-tailwind/react";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import TripConditions from "../../components/TripConditions/TripConditions";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { UpdateTrip } from "../../interfaces/Trip";
import { updateTrip } from "../../api/Trip";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function TripEdit() {

    const [globalError, setGlobalError] = useState<string>("");
    const [activityPicker, setActivityPicker] = useState<boolean>(false);
    const [tripConditions, setTripConditions] = useState<boolean>(false);
    const { tripId } = useParams();
    const navigate = useNavigate();

    const defaultValues: UpdateTrip = {
        title: "",
        description: "",
        activities: [],
        destination: "",
        date_from: "",
        date_to: "",
        budget_min: 0,
        budget_max: 0,
        condition_gender: "",
        condition_age_min: "",
        condition_age_max: "",
        condition_physical: "",
        condition_user_limit: 0
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
        if (tripId) {
            try {
                await updateTrip(values, parseInt(tripId));
                navigate(`/trip/${tripId}`);
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
		if (values.activities.length > 0) {
			setActivityPicker(false);
		} else {
			throw Error('Please select at least one activity.');
		}
	};

    return (
        <div className="m-4 md:mt-32">
            <Typography variant="h1" color="black" className="text-center mt-8 mb-8 text-2xl font-title">
                Modifier le trip
            </Typography>
            <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue, handleChange, values }: FormikProps<UpdateTrip>) => (
                    <Form>
                        <div className="mb-1 flex flex-col gap-6">
                            <section className="mt-8 max-w-lg mx-auto md:mt-32">
                                <h2 className="font-title text-center text-2xl font-bold mb-12">Parlez-nous de votre trip</h2>

                                {/* Trip title */}
                                <div className="m-4">
                                    <Typography className="block text-black font-bold mb-1">
                                        Titre du voyage
                                    </Typography>
                                    <Field
                                        id="title"
                                        name="title"
                                        as={Input}
                                        placeholder="Titre du voyage"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500" />
                                </div>

                                {/* Trip description */}
                                <div className="m-4">
                                    <Typography className="block text-black font-bold mb-1">
                                        Décrivez votre voyage
                                    </Typography>
                                    <Field
                                        component={Textarea}
                                        id="description"
                                        name="description"
                                        placeholder="Décrivez votre voyage"
                                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500" />
                                </div>

                                {/* Activity selection with burger menu */}
                                <div className="m-4">
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
                                <div className="m-4">
                                    <Typography className="block text-black font-bold mb-1">
                                        Budget hors transport
                                    </Typography>
                                    <div className='m-4'>
                                        <RangeSlider
                                            nameMin="budget_min"
                                            nameMax="budget_max"
                                            min={50}
                                            max={5000}
                                            step={50}
                                            value={[values.budget_min, values.budget_max]}
                                            onChange={() => {
                                                setFieldValue('conditions_budget_min', values.budget_min);
                                                setFieldValue('conditions_budget_max', values.budget_max);
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
                                <div className="m-4">
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
                                            Sélectionner les activités de votre trip
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
                                        Sélectionner les conditions de votre trip
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
                            <button type="submit" className="bg-green text-white p-2 rounded-lg mb-32">
                                Enregistrer
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}