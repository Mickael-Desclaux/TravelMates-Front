import { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import SearchIcon from '../../assets/Icons/search.svg';
import CalendarIcon from '../../assets/Icons/datepicker.svg';
import { Typography } from '@material-tailwind/react';
import DatePickerComponent from '../DatePicker.tsx/DatePicker';
import { FormValues } from '../../interfaces/FormInterfaces/FormInterfaces';

const StepOne = () => {
	const [showCalendar, setShowCalendar] = useState(false);
	const { values, setFieldValue } = useFormikContext<FormValues>();

	return (
		<section className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
			<h2 className="text-xl font-semibold text-center mb-6">
				Ajouter un trip
			</h2>

			{/* Destination */}
			<div className="mb-6">
				<Typography className="block text-black font-bold mb-2">
					Quel est votre destination ?
				</Typography>
				<div className="relative">
					<img
						src={SearchIcon}
						alt="search"
						className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
					/>
					<Field
						id="destination"
						name="destination"
						placeholder="Où allez-vous ?"
						className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-700"
					/>
					<ErrorMessage
						name="destination"
						component="div"
						className="text-red-500 mt-1 text-sm"
					/>
				</div>
			</div>

			{/* Dates */}
			<div className="mb-6 relative">
				<Typography className="block text-black font-bold mb-2">
					Dates
				</Typography>
				<div className="relative">
					<img
						src={CalendarIcon}
						alt="calendar"
						className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
					/>
					<Field
						id="dates"
						name="dates"
						value={values.dates}
						placeholder="Ajouter des dates"
						className="border border-gray-300 p-2 rounded w-full pl-10 cursor-pointer focus:outline-none focus:border-green-700"
						onClick={() => setShowCalendar(!showCalendar)}
						readOnly
					/>
					<ErrorMessage
						name="dates"
						component="div"
						className="text-red-500 mt-1 text-sm"
					/>
				</div>

				{showCalendar && (
					<div className="mt-4">
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
