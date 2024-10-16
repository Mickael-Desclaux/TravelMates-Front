import { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormContext } from '../../context/FormContext';
import { DateRange } from 'react-day-picker';
import DatePicker from '../DatePicker.tsx/DatePicker';

import SearchIcon from '../../assets/Icons/search.svg';
import CalendarIcon from '../../assets/Icons/datepicker.svg';
import PlaneIcon from '../../assets/Icons/plane.svg';

const StepOne = ({ next }: { next: () => void }) => {
	// Access form data and setFormData function from the context
	const { formData, setFormData } = useContext(FormContext)!;

	// States for selected date range and calendar toggle
	const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
		undefined,
	);
	const [showCalendar, setShowCalendar] = useState(false);

	// Define initial values for the form fields
	const initialValues = {
		destination: formData.destination || '',
		departureCity: formData.departureCity || '',
		dates: formData.dates || '',
	};

	// Define validation schema using Yup
	const validationSchema = Yup.object({
		destination: Yup.string().required('La destination est obligatoire'),
		departureCity: Yup.string().required('La ville de départ est obligatoire'),
		dates: Yup.string().required('Les dates de voyage sont obligatoires'),
	});

	// Handle form submission
	const handleSubmit = (values: typeof initialValues) => {
		setFormData(values); // Store form data in the context
		next(); // Move to the next step
	};

	// Handle date selection and form field update
	const handleDateSelect = (
		range: DateRange | undefined,
		setFieldValue: (
			field: string,
			value: string,
			shouldValidate?: boolean,
		) => void,
		validateField: (field: string) => void, // Validate field after selection
	) => {
		setSelectedRange(range);

		// If no dates are selected, reset the input and validation
		if (!range?.from || !range?.to) {
			setFieldValue('dates', '');
			setFormData({ ...formData, dates: '' });
			validateField('dates');
		} else {
			const formattedDates = `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
			setFieldValue('dates', formattedDates);
			setFormData({ ...formData, dates: formattedDates });
		}
	};

	// Handle clearing selected dates
	const handleClearDates = (
		setFieldValue: (
			field: string,
			value: string,
			shouldValidate?: boolean,
		) => void,
		validateField: (field: string) => void,
	) => {
		setSelectedRange(undefined);
		setFieldValue('dates', '');
		setFormData({ ...formData, dates: '' });
		validateField('dates');
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
			validateOnChange={false} // Validate only on submit
			validateOnBlur={false}
		>
			{({ setFieldValue, errors, touched, validateField }) => (
				<Form>
					{/* Destination Input */}
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
							/>
						</div>
						{touched.destination && errors.destination && (
							<div className="text-red-500 text-sm">{errors.destination}</div>
						)}
					</div>

					{/* Departure City Input */}
					<div className="mb-4">
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
					</div>

					{/* Date Selection */}
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
								value={
									selectedRange?.from && selectedRange?.to
										? `${selectedRange.from.toLocaleDateString()} - ${selectedRange.to.toLocaleDateString()}`
										: ''
								}
								className={`border border-gray-300 p-2 rounded w-full pl-10 cursor-pointer ${
									touched.dates && errors.dates ? 'border-red-500' : ''
								}`}
								onClick={() => setShowCalendar(!showCalendar)} // Toggle to show/hide calendar
								readOnly
							/>
						</div>
						{touched.dates && errors.dates && (
							<div className="text-red-500 text-sm">{errors.dates}</div>
						)}

						{/* DatePicker Component */}
						{showCalendar && (
							<DatePicker
								selectedRange={selectedRange}
								onDateSelect={range =>
									handleDateSelect(range, setFieldValue, validateField)
								}
								onClearDates={() =>
									handleClearDates(setFieldValue, validateField)
								}
							/>
						)}
					</div>

					{/* Continue Button */}
					<div className={`mt-${showCalendar ? '[24.5rem]' : '6'}`}>
						<button
							type="submit"
							className="bg-green text-white py-2 px-4 rounded w-full"
						>
							Continuer
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default StepOne;
