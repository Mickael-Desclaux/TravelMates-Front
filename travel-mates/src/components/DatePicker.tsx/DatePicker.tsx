import { DayPicker, DateRange } from 'react-day-picker';
import { fr } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import './daypicker-overrides.css';
import { useState } from 'react';
import { format } from 'date-fns';

interface DatePickerComponentProps {
	onDateSelect: (dates: string) => void;
	onClearDates: () => void;
}

const DatePickerComponent = ({
	onDateSelect,
	onClearDates,
}: DatePickerComponentProps) => {
	const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
		undefined,
	);

	const handleDateSelect = (range: DateRange | undefined) => {
		setSelectedRange(range);

		if (!range?.from || !range?.to) {
			onDateSelect('');
		} else {
			const formattedFrom = format(range.from, 'dd/MM/yyyy');
			const formattedTo = format(range.to, 'dd/MM/yyyy');
			const formattedDates = `${formattedFrom} - ${formattedTo}`;
			onDateSelect(formattedDates);
		}
	};

	const handleClearDates = () => {
		setSelectedRange(undefined);
		onClearDates();
	};

	return (
		<div className="absolute z-10 bg-white border p-2 mt-2">
			<DayPicker
				mode="range"
				selected={selectedRange}
				onSelect={handleDateSelect}
				locale={fr}
				disabled={{ before: new Date() }}
			/>

			<button
				type="button"
				onClick={handleClearDates}
				className="mt-2 text-red-500 underline"
			>
				Effacer les dates
			</button>
		</div>
	);
};

export default DatePickerComponent;
