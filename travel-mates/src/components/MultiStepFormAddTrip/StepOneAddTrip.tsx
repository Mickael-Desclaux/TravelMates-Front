import { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
// import DatePickerComponent from '../DatePicker.tsx/DatePicker';

import SearchIcon from '../../assets/Icons/search.svg';
import CalendarIcon from '../../assets/Icons/datepicker.svg';
// import PlaneIcon from '../../assets/Icons/plane.svg'; // Commentaire sur l'importation de PlaneIcon

import { Typography } from '@material-tailwind/react';
import DatePickerComponent from '../DatePicker.tsx/DatePicker';
import { FormValues } from '../../interfaces/FormInterfaces/FormInterfaces';
// import { fetchSuggestions } from '../../api/Mapbox';

const StepOne = () => {
	const [showCalendar, setShowCalendar] = useState(false);

	const { values, setFieldValue } = useFormikContext<FormValues>();

	// const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

	// const handleClearDates = (
	// 	setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
	// ) => {
	// 	setFieldValue('dates', ''); // Effacer les dates dans Formik
	// 	setFormData({ ...formData, dates: '' });
	// };

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

	// const handleDestinationChange = (
	// 	value: string,
	// 	setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
	// ) => {
	// 	// Appel de la fonction Mapbox pour les suggestions
	// 	// fetchSuggestionsFromAPI(value);

	// 	// Met à jour la valeur dans Formik
	// 	setFieldValue('destination', value);
	// };

	return (
		<section>
			<div className="mb-4">
				<Typography className="block text-black font-bold mb-1">
					Quel est votre destination ?
				</Typography>
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
						className="w-full pl-10 p-2 border border-gray-300 rounded"
					/>
					<ErrorMessage
						name="destination"
						component="div"
						className="text-red-500"
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
			</div>
			{/* <div className="mb-4">
						<Typography
							htmlFor="departureCity"
							className="block text-black font-bold mb-1"
						>
							Ville de départ
						</Typography>
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
						value={values.dates}
						placeholder="Ajouter des dates"
						className="border border-gray-300 p-2 rounded w-full pl-10 cursor-pointer"
						onClick={() => setShowCalendar(!showCalendar)}
						readOnly
					/>
					<ErrorMessage name="dates" component="div" className="text-red-500" />
				</div>

				{showCalendar && (
					<div className="mb-4">
						<DatePickerComponent
							onDateSelect={dates => {
								setFieldValue('dates', dates);
								const [startDate, endDate] = dates.split(' - ');
								if (startDate !== endDate) {
									setShowCalendar(false);
								}
							}}
							onClearDates={() => setFieldValue('dates', '')}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default StepOne;
