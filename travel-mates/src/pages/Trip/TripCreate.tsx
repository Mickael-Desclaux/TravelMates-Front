import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import StepOne from '../../components/MultiStepFormAddTrip/StepOneAddTrip';
import StepTwo from '../../components/MultiStepFormAddTrip/StepTwoAddTrip';
import { Button } from '@material-tailwind/react';
import StepThree from '../../components/MultiStepFormAddTrip/StepThreeAddTip';
import useAuthStore from '../../utils/AuthStore';
import { createTrip } from '../../api/Trip';

interface Media {
	url: string;
	authorFirstName: string;
	authorLastName: string;
	authorProfilePicture: string;
};

export default function TripCreateMultiStepForm() {
	const [step, setStep] = useState(1);
	const userId = useAuthStore(state => state.user_id);

	function handleDatesSplit(dates: string): { date_from: Date, date_to: Date} {
		const [date_from, date_to] = dates.split(' - ');
		return {
			date_from: new Date(date_from.trim()),
			date_to: new Date(date_to.trim()),
		}
	}

	const validationSchema = [
		Yup.object({
			destination: Yup.string().required('La destination est obligatoire'),
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
	const navigate = useNavigate();

	return (
		<Formik
			initialValues={{
				destination: '',
				dates: '',
				date_from: new Date,
				date_to: new Date,
				title: '',
				description: '',
				activities: [],
				conditions_budget_min: 50,
				conditions_budget_max: 5000,
				medias: [] as Media[],
				condition_user_limit: 10,
				condition_gender: 'all',
				condition_age_min: 18,
				condition_age_max: 99,
				condition_physical: 'normal',

			}}
			validationSchema={validationSchema[step - 1]}
			onSubmit={async (values, { setSubmitting }) => {
				if (step === 3) {
					if (userId) {
						try {
							const { date_from, date_to } = handleDatesSplit(values.dates);
							const trip = {
								destination: values.destination,
								date_from: values.date_to,
								date_to: values.date_to,
								title: values.title,
								description: values.description,
								budget_min: values.conditions_budget_min,
								budget_max: values.conditions_budget_max,
								condition_age_min: values.condition_age_min,
								condition_age_max: values.condition_age_max,
								condition_physical: values.condition_physical,
								condition_user_limit: values.condition_user_limit,
								condition_gender: values.condition_gender,
								activities: values.activities,
								medias: values.medias
							}
							values.date_from = date_from;
							values.date_to = date_to;
							await createTrip(trip);
							navigate('/');
						} catch (error: any) {
							return error;
						}
					}
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
