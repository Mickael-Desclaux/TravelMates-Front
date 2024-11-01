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
				.moreThan(
					Yup.ref('conditions_budget_min'),
					'Le budget maximum doit être supérieur au budget minimum',
				),
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
									className="bg-gray-900 mt-6"
								>
									Précédent
								</Button>
							)}

							{/* Button next to go to the next step */}
							<Button
								type="submit"
								disabled={isSubmitting}
								className="bg-green text-white mt-6 hover:bg-green"
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
