import { Card, Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { number, object } from "yup";
import addTripConditions from "../../api/Trip";
import './TripConditions.css';
import { useEffect } from "react";

interface AgeRangeValues {
    ageMin: number;
    ageMax: number;
}

export default function TripConditions() {

    // Custom error message if ageMin > ageMax or ageMax < ageMin
    const validateAgeRange = (values: AgeRangeValues) => {
        const ageMin: number = values.ageMin;
        const ageMax: number = values.ageMax;

        if (ageMin > ageMax) {
            return {
                ageMin: "L'âge minimum ne peut pas être supérieur à l'âge maximum",
            };
        }

        if (ageMax < ageMin) {
            return {
                ageMax: "L'âge maximum ne peut pas être inférieur à l'âge minimum",
            };
        }

        return {};
    };

    // handle form with formik
    const formik = useFormik({
        initialValues: {
            gender: "",
            ageMin: 18,
            ageMax: 99,
            physicalCondition: "",
            userLimit: 5,
        },
        validate: validateAgeRange,
        validationSchema: object({
            ageMin: number().min(18, "L'âge minimum doit être supérieur à 18 ans").max(99, "L'âge minimum doit être inférieur à 99 ans"),
            ageMax: number().min(18, "L'âge maximum doit être supérieur à 18 ans").max(99, "L'âge maximum doit être inférieur à 100 ans"),
        }),
        onSubmit: values => {
            addTripConditions(values);
        }
    })

    // slider background color
    const updateSliderBackground = (value: number, min: number, max: number, slider: HTMLInputElement) => {
        const percentage = ((value - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #185C22 ${percentage}%, #ccc ${percentage}%)`;
    };

    // slider design application after page is mounted
    useEffect(() => {
        const slider = document.querySelector('input[type="range"]') as HTMLInputElement;
        if (slider) {
            updateSliderBackground(formik.values.userLimit, +slider.min, +slider.max, slider);
        }
    }, [formik.values.userLimit]);
    
    // handle slider dynamic colors
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);

        const slider = e.target as HTMLInputElement;
        const value = ((+slider.value - +slider.min) / (+slider.max - +slider.min)) * 100;

        slider.style.background = `linear-gradient(to right, #185C22 ${value}%, #ccc ${value}%)`;
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
                                <Checkbox crossOrigin={undefined} value={formik.values.gender} color="green" />
                            </div>

                            {/* condition_age_min && condition_age_max */}
                            <Typography variant="paragraph" color="blue-gray" className="-mb-3 font-bold">
                                Âgés entre
                            </Typography>
                            <div className="flex items-center gap-4">
                                <div>
                                    <Input
                                        name="ageMin"
                                        value={formik.values.ageMin}
                                        onChange={formik.handleChange}
                                        containerProps={{ className: "min-w-[48px]" }}
                                        placeholder="Âge min"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-center"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }} crossOrigin={undefined} />
                                </div>
                                <Typography>et</Typography>
                                <div>
                                    <Input
                                        name="ageMax"
                                        value={formik.values.ageMax}
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
                            {formik.touched.ageMin && formik.errors.ageMin ? (

                                <div>{formik.errors.ageMin}</div>

                            ) : null}
                            {formik.touched.ageMax && formik.errors.ageMax ? (

                                <div>{formik.errors.ageMax}</div>

                            ) : null}

                            {/* condition_physical */}
                            <Typography variant="paragraph" color="blue-gray" className="-mb-3 font-bold">
                                Condition physique recommandée
                            </Typography>
                            <div className="flex justify-between space-x-4">
                                <button
                                    type="button"
                                    className={`px-4 py-2 border rounded ${formik.values.physicalCondition === 'none' ? 'bg-green-900 text-white' : 'bg-white text-black'}`}
                                    onClick={() => formik.setFieldValue('physicalCondition', 'none')}>
                                    Aucune
                                </button>
                                <button
                                    type="button"
                                    className={`px-4 py-2 border rounded ${formik.values.physicalCondition === 'normal' ? 'bg-green-900 text-white' : 'bg-white text-black'}`}
                                    onClick={() => formik.setFieldValue('physicalCondition', 'normal')}>
                                    Normale
                                </button>
                                <button
                                    type="button"
                                    className={`px-4 py-2 border rounded ${formik.values.physicalCondition === 'excellent' ? 'bg-green-900 text-white' : 'bg-white text-black'}`}
                                    onClick={() => formik.setFieldValue('physicalCondition', 'excellent')}>
                                    Excellente
                                </button>
                            </div>

                            {/* condition_user_limit */}
                            <Typography variant="paragraph" color="blue-gray" className="-mb-3 font-bold">
                                Nombre limite de participants
                            </Typography>
                            <div className="flex justify-between -mb-3">
                                <span className="text-start">2</span>
                                <span className="text-center">{formik.values.userLimit} participants max</span>
                                <span className="text-end">10</span>
                            </div>
                            <input
                                type="range"
                                min={2}
                                max={10}
                                step={1}
                                name="userLimit"
                                value={formik.values.userLimit}
                                className="w-full h-2 bg-green-900 rounded-lg appearance-none cursor-pointer"
                                onChange={handleSliderChange} 
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
