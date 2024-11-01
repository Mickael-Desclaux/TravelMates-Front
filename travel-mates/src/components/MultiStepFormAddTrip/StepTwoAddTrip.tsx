import { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import RangeSlider from '../RangeSlider/RangeSlider';
import { Typography, Button } from '@material-tailwind/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import ActivityPicker from '../ActivityPicker/ActivityPicker';
import TripConditions from '../TripConditions/TripConditions';

const StepTwo = () => {
	const [isActivityPickerOpen, setIsActivityPickerOpen] = useState(false);
	const [isTripConditionsOpen, setIsTripConditionsOpen] = useState(false);

	// Access Formik values
	const { values, setFieldValue } = useFormikContext<{
		activities: number[];
		conditions_budget_min: number;
		conditions_budget_max: number;
	}>();

	// Function to open the ActivityPicker modal
	const openActivityPicker = () => {
		setIsActivityPickerOpen(true);
	};

	// Function to close the ActivityPicker modal
	const closeActivityPicker = () => {
		setIsActivityPickerOpen(false);
	};

	// Function to open the TripConditions modal
	const openTripConditions = () => {
		setIsTripConditionsOpen(true);
	};

	// Function to close the TripConditions modal
	const closeTripConditions = () => {
		setIsTripConditionsOpen(false);
	};

	// Validate activity selection and close ActivityPicker if at least one activity is selected
	const handleValidation = () => {
		if (values.activities.length > 0) {
			closeActivityPicker();
		} else {
			alert('Please select at least one activity.');
		}
	};

	// Handle budget slider value change and update Formik values
	const handleBudgetChange = (value: number[]) => {
		setFieldValue('conditions_budget_min', value[0]);
		setFieldValue('conditions_budget_max', value[1]);
	};

	return (
		<>
			{/* StepTwo form section */}
			<section className="p-4 max-w-lg mx-auto bg-white shadow rounded-lg">
				<h2 className="text-xl font-bold mb-4">Parlez-nous de votre trip</h2>

				{/* Trip title */}
				<div className="mb-4">
					<Typography className="block text-black font-bold mb-1">
						Titre du voyage
					</Typography>
					<Field
						id="title"
						name="title"
						placeholder="Titre du voyage"
						className="w-full p-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:border-blue-500"
					/>
					<ErrorMessage name="title" component="div" className="text-red-500" />
				</div>

				{/* Trip description */}
				<div className="mb-4">
					<Typography className="block text-black font-bold mb-1">
						Décrivez votre voyage
					</Typography>
					<Field
						as="textarea"
						id="description"
						name="description"
						placeholder="Décrivez votre voyage"
						className="w-full p-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:border-blue-500"
					/>
					<ErrorMessage
						name="description"
						component="div"
						className="text-red-500"
					/>
				</div>

				{/* Activity selection with burger menu */}
				<div className="mb-4">
					<Typography className="block text-black font-bold mb-1">
						Choisir les activités
					</Typography>
					<div
						onClick={openActivityPicker}
						className="flex items-center border border-gray-300 rounded p-2 w-full bg-white cursor-pointer"
					>
						<span className="text-gray-700">Activités</span>
						<Bars3Icon className="ml-auto h-6 w-6 text-gray-500" />
					</div>
				</div>

				{/* Budget slider */}
				<div className="mb-4">
					<Typography className="block text-black font-bold mb-1">
						Budget hors transport
					</Typography>
					<RangeSlider
						nameMin="conditions_budget_min"
						nameMax="conditions_budget_max"
						min={50}
						max={5000}
						step={50}
						value={[values.conditions_budget_min, values.conditions_budget_max]}
						onChange={handleBudgetChange}
					/>
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
				<div className="mb-4">
					<Typography className="block text-black font-bold mb-1">
						Avec qui voulez-vous partir ?
					</Typography>
					<div
						onClick={openTripConditions}
						className="flex items-center border border-gray-300 rounded p-2 w-full bg-white cursor-pointer"
					>
						<span className="text-gray-700">Faites votre choix</span>
						<Bars3Icon className="ml-auto h-6 w-6 text-gray-500" />
					</div>
				</div>
			</section>

			{/* ActivityPicker displayed as full-screen modal */}
			{isActivityPickerOpen && (
				<div className="fixed inset-0 z-50 bg-white flex flex-col justify-center items-center">
					{/* Button to close the ActivityPicker */}
					<button
						onClick={closeActivityPicker}
						className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
					>
						Fermer
					</button>

					{/* Title */}
					<Typography variant="h4" className="mb-6 text-center">
						Sélectionner les activités de votre trip
					</Typography>

					{/* Display ActivityPicker */}
					<ActivityPicker />

					{/* Validation button */}
					<Button
						size="lg"
						className="mt-6 bg-green"
						onClick={handleValidation}
					>
						Valider
					</Button>
				</div>
			)}

			{/* TripConditions displayed as full-screen modal */}
			{isTripConditionsOpen && (
				<div className="fixed inset-0 z-50 bg-white flex flex-col justify-center items-center">
					{/* Button to close TripConditions */}
					<button
						onClick={closeTripConditions}
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
						onClick={closeTripConditions}
					>
						Valider
					</Button>
				</div>
			)}
		</>
	);
};

export default StepTwo;
