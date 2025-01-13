import { Typography, Input, Button, Textarea, Dialog, DialogBody, DialogFooter, DialogHeader, Avatar } from "@material-tailwind/react";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import TripConditions from "../../components/TripConditions/TripConditions";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { banParticipant, updateTrip } from "../../api/Trip";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { GetTripById } from "../../api/Trips";
import { ParticipantBasicInfos, ParticipantBasicInfosWithStatus, UpdateTrip } from "../../interfaces/Trip";
import CalendarIcon from '../../assets/Icons/datepicker.svg';
import DatePickerComponent from "../../components/DatePicker.tsx/DatePicker";
import { convertDateToISO, formatApiDate } from "../../utils/DateService";
import { calculateAge } from "../../utils/AgeService";

export default function TripEdit() {

    const [data, setData] = useState<UpdateTrip>();
    const [globalError, setGlobalError] = useState<string>();
    const [activityPicker, setActivityPicker] = useState<boolean>(false);
    const [tripConditions, setTripConditions] = useState<boolean>(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [formValues, setFormValues] = useState<UpdateTrip | null>(null);
    const [affectedUsers, setAffectedUsers] = useState<ParticipantBasicInfos[]>([]);
    const [participants, setParticipants] = useState<ParticipantBasicInfosWithStatus[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const [showCalendar, setShowCalendar] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await GetTripById(parseInt(id));

                    const tripParticipants: ParticipantBasicInfosWithStatus[] = response.participants.map(participant => ({
                        id: participant.user.id,
                        firstname: participant.user.profile.firstname,
                        lastname: participant.user.profile.lastname,
                        birth_date: participant.user.profile.birth_date,
                        media: { url: participant.user.profile.media.url },
                        status: participant.status
                    }));

                    setParticipants(tripParticipants);

                    const updateTripData: UpdateTrip = {
                        title: response.title,
                        description: response.description,
                        activities: response.tripActivities.map(activity => activity.activity),
                        destination: response.destination,
                        date_from: new Date(response.date_from).toISOString(),
                        date_to: new Date(response.date_to).toISOString(),
                        budget_min: response.budget_min,
                        budget_max: response.budget_max,
                        condition_gender: response.condition_gender,
                        condition_age_min: response.condition_age_min,
                        condition_age_max: response.condition_age_max,
                        condition_physical: response.condition_physical,
                        condition_user_limit: response.condition_user_limit,
                    };
                    setData(updateTripData);

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
        date_from: data?.date_from || new Date().toISOString(),
        date_to: data?.date_to || new Date().toISOString(),
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
        date_from: Yup.string().required("La date de début est obligatoire"),
        date_to: Yup.string().required("La date de fin est obligatoire"),
        title: Yup.string().required('Le titre est obligatoire'),
        description: Yup.string().required("Veuillez renseigner une description"),
        activities: Yup.array().min(1, "Veuillez sélectionner au moins une activité"),
        budget_min: Yup.number()
            .min(50, 'Le budget minimum doit être au moins de 50')
            .required('Veuillez indiquer un budget minimum'),
        budget_max: Yup.number().moreThan(
            Yup.ref('budget_min'),
            'Le budget maximum doit être supérieur au budget minimum',
        ),
    })

    async function onSubmit(values: UpdateTrip) {
        console.log(values);
        if (id) {
            try {
                const updatedValues = {
                    ...values,
                    date_from: new Date(values.date_from).toISOString(),
                    date_to: new Date(values.date_to).toISOString(),
                };
                await updateTrip(updatedValues, parseInt(id));
                navigate(`/trip-detail/${id}`);
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

    async function submitTripAndExcludeUsers(values: UpdateTrip) {
        setIsProcessing(true);
        setGlobalError("");

        if (id) {
            try {
                // 1. D'abord mettre à jour le trip
                await updateTrip(values, parseInt(id));

                // 2. Ensuite exclure les participants
                const exclusionPromises = affectedUsers.map(user =>
                    banParticipant(parseInt(id), user.id)
                );
                await Promise.all(exclusionPromises);

                // 3. Rediriger vers la page de détail
                navigate(`/trip-detail/${id}`);
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
                setIsProcessing(false);
            }
        }
    }

    async function handleSubmitWithConfirmation(values: UpdateTrip) {
        const ageConditionsChanged = data && (
            values.condition_age_min !== data.condition_age_min ||
            values.condition_age_max !== data.condition_age_max
        );

        if (ageConditionsChanged && data) {
            const affected = await getAffectedUsers(
                Number(values.condition_age_min),
                Number(values.condition_age_max),
                participants
            );

            if (affected.length > 0) {
                setAffectedUsers(affected);
                setFormValues(values);
                setShowConfirmDialog(true);
            } else {
                await onSubmit(values);
            }
        } else {
            await onSubmit(values);
        }
    }

    async function handleConfirmSubmit() {
        if (formValues) {
            setShowConfirmDialog(false);
            await submitTripAndExcludeUsers(formValues);
        }
    }

    async function getAffectedUsers(newAgeMin: number, newAgeMax: number, participants: ParticipantBasicInfosWithStatus[]): Promise<ParticipantBasicInfos[]> {
        return participants
            .filter(participant => {
                const age = calculateAge(new Date(participant.birth_date));
                return age < newAgeMin || age > newAgeMax;
            })
            .map(participant => ({
                id: participant.id,
                firstname: participant.firstname,
                lastname: participant.lastname,
                media: { url: participant.media.url },
                age: calculateAge(new Date(participant.birth_date))
            }));
    }

    return (
        <div className="md:mt-32">
            <Typography variant="h1" color="black" className="text-center mt-8 text-2xl font-title">
                Modifier le trip
            </Typography>
            <Formik
                initialValues={defaultValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmitWithConfirmation}
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

                                <div className="mt-4">
                                    <Typography className="block text-black font-bold mb-1">
                                        Dates
                                    </Typography>
                                    <div className="relative">
                                        <img
                                            src={CalendarIcon}
                                            alt="calendar"
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                                        />
                                        <Field
                                            id="dates"
                                            name="dates"
                                            value={`${formatApiDate(values.date_from)} - ${formatApiDate(values.date_to)}`}
                                            placeholder="Ajouter des dates"
                                            className="border border-gray-300 p-2 rounded w-full pl-10 cursor-pointer"
                                            onClick={() => setShowCalendar(!showCalendar)}
                                            readOnly
                                        />
                                        <ErrorMessage name="date_from" component="div" className="text-red-500" />
                                        <ErrorMessage name="date_to" component="div" className="text-red-500" />
                                    </div>
                                    {showCalendar && (
                                        <div className="flex justify-center mt-2 z-50">
                                            <DatePickerComponent
                                                onDateSelect={(dates) => {
                                                    const [startDate, endDate] = dates.split(' - ');

                                                    const startDateISO = convertDateToISO(startDate);
                                                    const endDateISO = convertDateToISO(endDate);

                                                    setFieldValue('date_from', startDateISO);
                                                    setFieldValue('date_to', endDateISO);
                                                }}
                                                onClearDates={() => {
                                                    setFieldValue('date_from', '');
                                                    setFieldValue('date_to', '');
                                                }}
                                            />
                                        </div>
                                    )}
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
                                        type="button"
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
                                            type="button"
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
                                        type="button"
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
                                    <TripConditions currentParticipantsCount={participants.length + 1} />
                                    <Typography variant="small" className="mb-6 text-center" color="gray">
                                        Il y a déjà {participants.length + 1} participants dans votre trip
                                    </Typography>

                                    {/* Validation button */}
                                    <Button
                                        type="button"
                                        size="lg"
                                        className="mt-6 bg-green"
                                        onClick={() => setTripConditions(false)}
                                    >
                                        Valider
                                    </Button>
                                </div>
                            )}

                            <Dialog open={showConfirmDialog} handler={() => setShowConfirmDialog(false)} size="md">
                                <DialogHeader>Attention</DialogHeader>
                                <DialogBody>
                                    <Typography color="black" className="font-normal mb-4">
                                        Les participants suivants ne correspondent plus aux nouvelles conditions d'âge
                                        ({formValues?.condition_age_min} - {formValues?.condition_age_max} ans)
                                        et seront exclus du trip :
                                    </Typography>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {affectedUsers.map((user) => (
                                            <div key={user.id} className="flex items-center gap-4 mb-4 p-2 border rounded">
                                                <Avatar
                                                    src={import.meta.env.VITE_API_BASE_URL + user.media.url}
                                                    alt={`${user.firstname} ${user.lastname}`}
                                                    className="w-12 h-12"
                                                />
                                                <div>
                                                    <Typography variant="h6" color="black">
                                                        {user.firstname} {user.lastname}
                                                    </Typography>
                                                    <Typography variant="small" color="black">
                                                        {user.age} ans
                                                    </Typography>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Typography color="red" className="font-normal mt-4">
                                        Êtes-vous sûr de vouloir continuer ?
                                    </Typography>
                                </DialogBody>
                                <DialogFooter className="flex justify-center gap-4">
                                    <Button
                                        variant="text"
                                        
                                        onClick={() => setShowConfirmDialog(false)}
                                        className="mr-1 bg-red-700 text-white"
                                        disabled={isProcessing}
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        className="bg-green text-white"
                                        onClick={handleConfirmSubmit}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center gap-2">
                                                <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></span>
                                                Traitement en cours...
                                            </div>
                                        ) : (
                                            'Confirmer'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </Dialog>

                            {globalError && (
                                <div className="text-red-500 text-center mt-4">
                                    {globalError}
                                </div>
                            )}

                            <div className="flex justify-center mb-28 md:mb-4">
                                <Button type="submit" className="mt-4 mb-4 bg-green text-white p-3 rounded-lg mb-4">
                                    Enregistrer
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}