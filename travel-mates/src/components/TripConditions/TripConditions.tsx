import { Card, Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { number, object } from "yup";
import addTripConditions from "../../api/Trip";
import './TripConditions.css';
import { useEffect } from "react";
import type { TripConditions } from "../../interfaces/TripConditions";

export default function TripConditions() {

    // Default form values
    const defaultValues: TripConditions = {
        condition_gender: "",
        condition_age_min: 18,
        condition_age_max: 99,
        condition_physical: "none",
        condition_user_limit: 5,
    };

    // Custom error message if ageMin > ageMax or ageMax < ageMin
    const validateAgeRange = (values: TripConditions) => {
        if (values.condition_age_min > values.condition_age_max) {
            return { condition_age_min: "L'âge minimum ne peut pas être supérieur à l'âge maximum" };
        }
        if (values.condition_age_max < values.condition_age_min) {
            return { condition_age_max: "L'âge maximum ne peut pas être inférieur à l'âge minimum" };
        }
        return {};
    };

    // Handle form with formik
    const formik = useFormik({
        initialValues: defaultValues,
        validate: validateAgeRange,
        validationSchema: object({
            ageMin: number().min(18, "L'âge minimum doit être supérieur à 18 ans").max(99, "L'âge minimum doit être inférieur à 99 ans"),
            ageMax: number().min(18, "L'âge maximum doit être supérieur à 18 ans").max(99, "L'âge maximum doit être inférieur à 100 ans"),
        }),
        onSubmit: values => {
            addTripConditions(values);
        }
    })

    // Update slider background color
    const updateSliderBackground = (value: number, min: number, max: number, slider: HTMLInputElement) => {
        const percentage = ((value - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #185C22 ${percentage}%, #ccc ${percentage}%)`;
    };

    // Compute slider value in percentage
    const calculateSliderValue = (slider: HTMLInputElement) => {
        return ((+slider.value - +slider.min) / (+slider.max - +slider.min)) * 100;
    };

    // Apply slider design after page is mounted
    useEffect(() => {
        const slider = document.querySelector('input[type="range"]') as HTMLInputElement;

        if (slider) {
            updateSliderBackground(formik.values.condition_user_limit, +slider.min, +slider.max, slider);
        }
    }, [formik.values.condition_user_limit]);

    // Handle slider value on change
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // Get slider element and it's value
        const slider = e.target as HTMLInputElement;
        const value = calculateSliderValue(slider);

        // Slider value and color update
        updateSliderBackground(value, +slider.min, +slider.max, slider);
    };

    return (
        <>
            <Card color="transparent" shadow={false}>
                <div className="flex justify-center">
                    <form className="mt-8 mb-2 w-80 sm:w-96" onSubmit={formik.handleSubmit}>
                        <div className="mb-1 flex flex-col gap-6">

                            {/* condition_gender */}
                            <div className="flex items-center">
                                <Typography variant="paragraph" color="blue-gray" className="font-bold">
                                    Je veux voyager uniquement avec des user.genre
                                </Typography>
                                <Checkbox crossOrigin={undefined} value={formik.values.condition_gender} color="green" />
                            </div>

                            {/* condition_age_min && condition_age_max */}
                            <Typography variant="paragraph" color="blue-gray" className="-mb-3 font-bold">
                                Âgés entre
                            </Typography>
                            <div className="flex items-center gap-4">
                                <div>
                                    <Input
                                        name="condition_age_min"
                                        value={formik.values.condition_age_min}
                                        onChange={formik.handleChange}
                                        containerProps={{ className: "min-w-[48px]" }}
                                        placeholder="Âge min"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-center"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }} crossOrigin={undefined} />
                                </div>
                                <Typography className="ms-4 me-4">et</Typography>
                                <div>
                                    <Input
                                        name="condition_age_max"
                                        value={formik.values.condition_age_max}
                                        onChange={formik.handleChange}
                                        containerProps={{ className: "min-w-[48px]" }}
                                        placeholder="Âge max"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-center"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }} crossOrigin={undefined} />
                                </div>
                                <Typography>ans</Typography>
                            </div>

                            {/* ageMin and ageMax errors display */}
                            {formik.touched.condition_age_min && formik.errors.condition_age_min ? (

                                <div>{formik.errors.condition_age_min}</div>

                            ) : null}
                            {formik.touched.condition_age_max && formik.errors.condition_age_max ? (

                                <div>{formik.errors.condition_age_max}</div>

                            ) : null}

                            {/* condition_physical */}
                            <Typography variant="paragraph" color="blue-gray" className="-mb-3 font-bold">
                                Condition physique recommandée
                            </Typography>
                            <div className="flex justify-between space-x-2">
                                <Button
                                    variant="outlined"
                                    type="button"
                                    className={`${formik.values.condition_physical === 'none' ? 'bg-green-900 text-white' : 'bg-white text-black'}`}
                                    onClick={() => formik.setFieldValue('condition_physical', 'none')}>
                                    Aucune
                                </Button>
                                <Button
                                    variant="outlined"
                                    type="button"
                                    className={`${formik.values.condition_physical === 'normal' ? 'bg-green-900 text-white' : 'bg-white text-black'}`}
                                    onClick={() => formik.setFieldValue('condition_physical', 'normal')}>
                                    Normale
                                </Button>
                                <Button
                                    variant="outlined"
                                    type="button"
                                    className={`${formik.values.condition_physical === 'excellent' ? 'bg-green-900 text-white' : 'bg-white text-black'}`}
                                    onClick={() => formik.setFieldValue('condition_physical', 'excellent')}>
                                    Excellente
                                </Button>
                            </div>

                            {/* condition_user_limit */}
                            <Typography variant="paragraph" color="blue-gray" className="-mb-3 font-bold">
                                Nombre limite de participants
                            </Typography>
                            <div className="flex justify-between -mb-3">
                                <span className="text-start">2</span>
                                <span className="text-center">{formik.values.condition_user_limit} participants max</span>
                                <span className="text-end">10</span>
                            </div>
                            <input
                                type="range"
                                min={2}
                                max={10}
                                step={1}
                                name="condition_user_limit"
                                value={formik.values.condition_user_limit}
                                className="w-full h-2 bg-green-900 rounded-lg appearance-none cursor-pointer"
                                onChange={(e) => {handleSliderChange(e); formik.handleChange(e)} }
                            />
                        </div>
                        <div className="flex justify-between gap-12 mt-12">
                            <Button onClick={() => formik.resetForm()} className="w-1/2" type="button" fullWidth>
                                Réinitialiser
                            </Button>
                            <Button type="submit" className="w-1/2 bg-green-900" fullWidth>
                                Valider
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </>
    )
}
