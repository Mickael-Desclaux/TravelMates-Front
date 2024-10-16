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
	const { formData, setFormData } = useContext(FormContext)!;
	const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
		undefined,
	);
	const [showCalendar, setShowCalendar] = useState(false);

	const initialValues = {
		destination: formData.destination || '',
		departureCity: formData.departureCity || '',
		dates: formData.dates || '',
	};

	const validationSchema = Yup.object({
		destination: Yup.string().required('La destination est obligatoire'),
		departureCity: Yup.string().required('La ville de départ est obligatoire'),
		dates: Yup.string().required('Les dates de voyage sont obligatoires'),
	});

	const handleSubmit = (values: typeof initialValues) => {
		setFormData(values);
		next();
	};

	const handleDateSelect = (
		range: DateRange | undefined,
		setFieldValue: (
			field: string,
			value: string,
			shouldValidate?: boolean,
		) => void,
		validateField: (field: string) => void,
	) => {
		setSelectedRange(range);

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
			validateOnChange={false}
			validateOnBlur={false}
		>
			{({ setFieldValue, errors, touched, validateField }) => (
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
							/>
						</div>
						{touched.destination && errors.destination && (
							<div className="text-red-500 text-sm">{errors.destination}</div>
						)}
					</div>

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
								onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar
								readOnly
							/>
						</div>
						{touched.dates && errors.dates && (
							<div className="text-red-500 text-sm">{errors.dates}</div>
						)}

						{/* DatePicker */}
						{showCalendar && (
							<div className="mb-4">
								<DatePicker
									selectedRange={selectedRange}
									onDateSelect={range =>
										handleDateSelect(range, setFieldValue, validateField)
									}
									onClearDates={() =>
										handleClearDates(setFieldValue, validateField)
									}
								/>
							</div>
						)}
					</div>

					{/* Button Wrapper */}
					<div className={`mt-6 ${showCalendar ? 'mt-[24rem]' : 'mt-6'}`}>
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
