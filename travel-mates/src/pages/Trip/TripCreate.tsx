import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import StepTwo from '../../components/MultiStepFormAddTrip/StepTwoAddTrip';
import StepOne from '../../components/MultiStepFormAddTrip/StepOneAddTrip';
import { Button } from '@material-tailwind/react';

export default function TripCreateMultiStepForm() {
	const [step, setStep] = useState(1);

	const validationSchema = [
		Yup.object({
			destination: Yup.string().required('La destination est obligatoire'),
			// departureCity: Yup.string().required('La ville de départ est obligatoire'),
			dates: Yup.string().required('Les dates de voyage sont obligatoires'),
		}),
		Yup.object().shape({
			title: Yup.string().required('Le titre est obligatoire'),
			description: Yup.string().required('La description est obligatoire'),
			activities: Yup.array().min(
				1,
				'Vous devez choisir au moins une activité',
			),
			conditions_budget_min: Yup.number()
				.min(50, 'Le budget minimum doit être au moins de 50')
				.required('Veuillez indiquer un budget minimum'),
			conditions_budget_max: Yup.number()
				.max(5000, 'Le budget maximum ne peut dépasser 5000')
				.required('Veuillez indiquer un budget maximum')
				.moreThan(
					Yup.ref('conditions_budget_min'),
					'Le budget maximum doit être supérieur au budget minimum',
				),
			condition_gender: Yup.boolean(),
			condition_age_min: Yup.number()
				.min(18, "L'âge minimum doit être de 18 ans")
				.required("L'âge minimum est requis"),
			condition_age_max: Yup.number()
				.max(100, "L'âge maximum doit être de 100 ans")
				.required("L'âge maximum est requis")
				.moreThan(
					Yup.ref('condition_age_min'),
					"L'âge maximum doit être supérieur à l'âge minimum",
				),
			condition_physical: Yup.string()
				.oneOf(
					['none', 'normal', 'excellent'],
					'Choisissez une condition physique valide',
				)
				.required('La condition physique est requise'),
			condition_user_limit: Yup.number()
				.min(2, 'Le nombre limite de participants doit être au moins 2')
				.max(10, 'Le nombre limite de participants ne doit pas dépasser 10')
				.required('Le nombre limite de participants est requis'),
		}),
	];

	const handleNext = () => setStep(step + 1);
	const handleBack = () => setStep(step - 1);

	return (
		<>
			<Formik
				initialValues={{
					destination: '',
					// departureCity: '',
					dates: '',
					title: '',
					description: '',
					activities: [],
					conditions_budget_min: 50,
					conditions_budget_max: 5000,
					condition_gender: false,
					condition_age_min: 18,
					condition_age_max: 99,
					condition_physical: '',
					condition_user_limit: 10,
				}}
				validationSchema={validationSchema[step - 1]}
				onSubmit={(values, { setSubmitting }) => {
					try {
						console.log('Form values at step:', step, values);
						if (step === 2) {
							alert('All fields validated successfully for step 2.');
						}
						handleNext();
					} catch (error) {
						console.error('Error during submission', error);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						{step === 1 && <StepOne />}
						{step === 2 && <StepTwo />}
						
						<div className="flex justify-center text-left gap-x-8 mt-2 mb-8">
							{/* Button previous to go back to the previous step */}
							{step > 1 && (
								<Button
									type="button"
									onClick={handleBack}
									className="bg-gray-900 mt-6 w-[20%]"
								>
									Précédent
								</Button>
							)}

							{/* Button next to go to the next step */}
							<Button
								type="submit"
								disabled={isSubmitting}
								className="bg-green text-white mt-6 hover:bg-green w-[20%]"
							>
								{step === 3 ? 'Valider' : 'Continuer'}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
