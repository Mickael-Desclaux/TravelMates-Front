import { Typography, Input, Textarea } from "@material-tailwind/react";
import ActivityPicker from "../../components/ActivityPicker/ActivityPicker";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import TripConditions from "../../components/TripConditions/TripConditions";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { UpdateTrip } from "../../interfaces/Trip";
import { updateTrip } from "../../api/Trip";

export default function TripEdit() {

    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [globalError, setGlobalError] = useState<string>("");
    const { tripId } = useParams();

    const navigate = useNavigate();

    const defaultValues: UpdateTrip = {
        title: "",
        description: "",
        activities: [],
        destination: "",
        date_from: "",
        date_to: "",
        condition_budget_min: 0,
        condition_budget_max: 0,
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
        conditions_budget_min: Yup.number()
            .min(50, 'Le budget minimum doit être au moins de 50')
            .required('Veuillez indiquer un budget minimum'),
        conditions_budget_max: Yup.number().moreThan(
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
                {({ handleChange, values }: FormikProps<UpdateTrip>) => (
                    <Form>
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="black" className="-mb-3">
                                Quelle est votre destination?
                            </Typography>
                            <Field
                                size="lg"
                                component={Input}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }} crossOrigin={undefined}
                                onChange={handleChange}
                                value={values.destination}
                                name="destination"
                            />
                            <Typography variant="h6" color="black" className="-mb-3">
                                Dates
                            </Typography>
                            <div>
                                <Field
                                    type="date"
                                    name="date_from"
                                    className="border rounded-lg p-2 w-full"
                                />
                                <ErrorMessage name="date_from" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <Field
                                    type="date"
                                    name="date_to"
                                    className="border rounded-lg p-2 w-full"
                                />
                                <ErrorMessage name="date_to" component="div" className="text-red-500 text-sm" />
                            </div>
                            <Typography variant="h6" color="black" className="-mb-3">
                                Titre
                            </Typography>
                            <Field
                                size="lg"
                                component={Input}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }} crossOrigin={undefined}
                                onChange={handleChange}
                                value={values.title}
                                name="title"
                            />
                            <Typography variant="h6" color="black" className="-mb-3">
                                Description
                            </Typography>
                            <Field
                                size="lg"
                                component={Textarea}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                            />
                            <Typography variant="h6" color="black" className="-mb-3">
                                Activités
                            </Typography>
                            <ActivityPicker />
                            <Typography variant="h6" color="black" className="-mb-3">
                                Budget hors transport
                            </Typography>
                            <RangeSlider nameMin={""} nameMax={""} min={0} max={0} value={[]} onChange={function (value: number[]): void {
                                throw new Error("Function not implemented.");
                            }} />
                            <Typography variant="h6" color="black" className="-mb-3">
                                Avec qui voulez-vous partir?
                            </Typography>
                            <TripConditions />
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