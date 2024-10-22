import { useContext, useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import DatePickerComponent from '../DatePicker.tsx/DatePicker';

import SearchIcon from '../../assets/Icons/search.svg';
import CalendarIcon from '../../assets/Icons/datepicker.svg';
// import PlaneIcon from '../../assets/Icons/plane.svg'; // Commentaire sur l'importation de PlaneIcon

import {
	FormValues,
	// Suggestion,
} from '../../interfaces/FormInterfaces/FormInterfaces';
import { FormContext } from '../../context/FormContext';
// import { fetchSuggestions } from '../../api/Mapbox';

const StepOne = ({ next }: { next: () => void }) => {
	const [showCalendar, setShowCalendar] = useState(false);
	const { formData, setFormData } = useContext(FormContext)!;
	// const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

	const initialValues: FormValues = {
		destination: '',
		departureCity: '',
		dates: '',
	};

	const validationSchema = Yup.object({
		destination: Yup.string().required('La destination est obligatoire'),
		// departureCity: Yup.string().required('La ville de départ est obligatoire'), // Commentaire sur la validation de departureCity
		dates: Yup.string().required('Les dates de voyage sont obligatoires'),
	});

	const handleSubmit = (values: FormValues) => {
		setFormData(values);
		console.log(values);
		next();
	};

	const handleClearDates = (
		setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
	) => {
		setFieldValue('dates', ''); // Effacer les dates dans Formik
		setFormData({ ...formData, dates: '' });
	};

	// const fetchSuggestionsFromAPI = async (query: string) => {
	// 	try {
	// 		const suggestions = await fetchSuggestions(query.toUpperCase());
	// 		const formattedSuggestions = suggestions.map(
	// 			(suggestion: Suggestion) => ({
	// 				name: suggestion.name,
	// 				context: suggestion.context,
	// 				country: suggestion.context.country,
	// 				country_name: suggestion.context.country.name,
	// 			}),
	// 		);
	// 		setSuggestions(formattedSuggestions);
	// 	} catch (error) {
	// 		console.error('Error fetching suggestions from Mapbox API:', error);
	// 	}
	// };

	const handleDestinationChange = (
		value: string,
		setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
	) => {
		// Appel de la fonction Mapbox pour les suggestions
		// fetchSuggestionsFromAPI(value);

		// Met à jour la valeur dans Formik
		setFieldValue('destination', value);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
			validateOnChange={false}
			validateOnBlur={false}
		>
			{({ setFieldValue, errors, touched }) => (
				<Form>
					<div className="mb-4">
						<label
							htmlFor="destination"
							className="block text-black font-bold mb-1"
						>
							Quel est votre destination ?
						</label>
						<div className="relative">
							<img
								src={SearchIcon}
								alt="search"
								className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
							/>
							<Field
								id="destination"
								name="destination"
								placeholder="Où allez-vous ?"
								className={`w-full pl-10 p-2 border border-gray-300 rounded ${
									touched.destination && errors.destination
										? 'border-red-500'
										: ''
								}`}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									handleDestinationChange(e.target.value, setFieldValue)
								}
							/>
							{/* {suggestions.length > 0 && (
								<ul className="absolute z-10 bg-white border border-gray-200 mt-1 w-full max-h-40 overflow-y-auto">
									{suggestions.map((suggestion: Suggestion, index: number) => (
										<li
											key={index}
											className="p-2 hover:bg-gray-200 cursor-pointer"
											onClick={() => {
												setFieldValue(
													'destination',
													suggestion.name +
														', ' +
														suggestion.context.country.name,
												);
												setSuggestions([]);
											}}
										>
											{suggestion.name ? suggestion.name : 'Unknown'},{' '}
											{suggestion.context && suggestion.context.country
												? suggestion.context.country.name
												: 'Unknown'}
										</li>
									))}
								</ul>
							)} */}
						</div>
						{touched.destination && errors.destination && (
							<div className="text-red-500 text-sm">{errors.destination}</div>
						)}
					</div>
					{/* <div className="mb-4">
						<label
							htmlFor="departureCity"
							className="block text-black font-bold mb-1"
						>
							Ville de départ
						</label>
						<div className="relative">
							<img
								src={PlaneIcon}
								alt="plane"
								className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
							/>
							<Field
								id="departureCity"
								name="departureCity"
								placeholder="D'où partez-vous ?"
								className={`w-full pl-10 p-2 border border-gray-300 rounded ${
									touched.departureCity && errors.departureCity
										? 'border-red-500'
										: ''
								}`}
							/>
						</div>
						{touched.departureCity && errors.departureCity && (
							<div className="text-red-500 text-sm">{errors.departureCity}</div>
						)}
					</div> */}{' '}
					{/* Commentaire sur la section Ville de départ */}
					<div className="mb-4 relative">
						<label htmlFor="dates" className="block text-black font-bold mb-1">
							Dates
						</label>
						<div className="relative">
							<img
								src={CalendarIcon}
								alt="calendar"
								className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
							/>
							<Field
								id="dates"
								name="dates"
								placeholder="Ajouter des dates"
								className={`border border-gray-300 p-2 rounded w-full pl-10 cursor-pointer ${
									touched.dates && errors.dates ? 'border-red-500' : ''
								}`}
								onClick={() => setShowCalendar(!showCalendar)}
								readOnly
							/>
						</div>
						{touched.dates && errors.dates && (
							<div className="text-red-500 text-sm">{errors.dates}</div>
						)}

						{showCalendar && (
							<div className="mb-4">
								<DatePickerComponent
									onDateSelect={dates => setFieldValue('dates', dates)}
									onClearDates={() => handleClearDates(setFieldValue)}
								/>
							</div>
						)}
					</div>
					<button
						type="submit"
						className="bg-green text-white py-2 px-4 rounded w-full"
					>
						Continuer
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default StepOne;
