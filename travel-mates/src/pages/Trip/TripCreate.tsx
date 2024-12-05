import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import StepOne from '../../components/MultiStepFormAddTrip/StepOneAddTrip';
import StepTwo from '../../components/MultiStepFormAddTrip/StepTwoAddTrip';
import { Button } from '@material-tailwind/react';
import StepThree from '../../components/MultiStepFormAddTrip/StepThreeAddTip';

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
			conditions_budget_max: Yup.number().moreThan(
				Yup.ref('conditions_budget_min'),
				'Le budget maximum doit être supérieur au budget minimum',
			),
		}),
		Yup.object().shape({
			urls: Yup.array()
				.min(1, 'Veuillez sélectionner au moins une image')
				.max(3, 'Veuillez sélectionner 3 images maximum'),
		}),
	];

	const handleNext = () => setStep(step + 1);
	const handleBack = () => setStep(step - 1);
	const navigate = useNavigate(); // 

	return (
		<Formik
			initialValues={{
				destination: '',
				dates: '',
				title: '',
				description: '',
				activities: [],
				conditions_budget_min: 50,
				conditions_budget_max: 5000,
				urls: [],
				condition_user_limit: 10,
				condition_age_min: 18,
				condition_age_max: 99,
				condition_physical: 'normal',

			}}
			validationSchema={validationSchema[step - 1]}
			onSubmit={(values, { setSubmitting }) => {
				if (step === 3) {
					// Redirect to homepage after submission
					console.log('Final form values:', values);
					navigate('/'); // Redirect to homepage
				} else {
					handleNext();
				}
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					{step === 1 && <StepOne />}
					{step === 2 && <StepTwo />}
					{step === 3 && <StepThree />}
					<div className="flex justify-center text-left gap-x-8 mt-2 mb-8">
						{/* Button to go back to the previous step */}
						{step > 1 && (
							<Button
								type="button"
								onClick={handleBack}
								className="bg-gray-900 mt-6"
							>
								Précédent
							</Button>
						)}

						{/* Button to go to the next step or submit on the last step */}
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
	);
}
