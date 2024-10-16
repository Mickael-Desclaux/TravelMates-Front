import { DayPicker, DateRange } from 'react-day-picker';
import { fr } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import './daypicker-overrides.css';

interface DatePickerComponentProps {
	selectedRange: DateRange | undefined; // The selected date range
	onDateSelect: (range: DateRange | undefined) => void; // Function to handle date selection
	onClearDates: () => void; // Function to clear the selected dates
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
	selectedRange,
	onDateSelect,
	onClearDates,
}) => {
	return (
		<div className="absolute z-10 bg-white border p-2 mt-2">
			{/* DayPicker component for selecting a range of dates */}
			<DayPicker
				mode="range"
				selected={selectedRange} // The current selected range
				onSelect={onDateSelect} // Handler when a date range is selected
				locale={fr} // Setting the locale to French
				disabled={{ before: new Date() }} // Disable dates before today
			/>

			{/* Button to clear the selected dates */}
			<button
				type="button"
				onClick={onClearDates} // Calls the onClearDates function when clicked
				className="mt-2 text-red-500 underline"
			>
				Effacer les dates
			</button>
		</div>
	);
};

export default DatePickerComponent;
