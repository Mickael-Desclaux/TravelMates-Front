import {
	Card,
	Typography,
	Input,
	Button,
	Checkbox,
} from '@material-tailwind/react';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import './TripConditions.css';
import { FormValues } from '../../interfaces/FormInterfaces/FormInterfaces';

export default function TripConditions() {
	// Use Formik context to access and update values
	const { values, setFieldValue } = useFormikContext<FormValues>();

	// Update the background color of the slider based on its value
	const updateSliderBackground = (
		value: number,
		min: number,
		max: number,
		slider: HTMLInputElement,
	) => {
		const percentage = ((value - min) / (max - min)) * 100;
		slider.style.background = `linear-gradient(to right, #185C22 ${percentage}%, #ccc ${percentage}%)`;
	};

	// Apply the slider design after component mounts
	useEffect(() => {
		const slider = document.querySelector(
			'input[type="range"]',
		) as HTMLInputElement;
		if (slider) {
			updateSliderBackground(
				values.condition_user_limit,
				+slider.min,
				+slider.max,
				slider,
			);
		}
	}, [values.condition_user_limit]);

	// Handle slider value change
	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10);
		setFieldValue('condition_user_limit', value);

		const slider = e.target as HTMLInputElement;
		updateSliderBackground(value, +slider.min, +slider.max, slider);
	};

	return (
		<Card color="transparent" shadow={false}>
			<div className="flex justify-center">
				<div className="mt-8 mb-2 w-80 sm:w-96">
					<div className="mb-1 flex flex-col gap-6">
						{/* condition_gender */}
						<div className="flex items-center">
							<Typography
								variant="paragraph"
								color="blue-gray"
								className="font-bold"
							>
								Je veux voyager uniquement avec des user.genre
							</Typography>
							<Checkbox
								name="condition_gender"
								onChange={e =>
									setFieldValue('condition_gender', e.target.checked)
								}
								color="green"
								className="custom-checkbox bg-green border border-gray-300 rounded p-2 w-full"
								checked={Boolean(values.condition_gender)}
								crossOrigin={undefined}
							/>
						</div>

						{/* condition_age_min && condition_age_max */}
						<Typography
							variant="paragraph"
							color="blue-gray"
							className="-mb-3 font-bold"
						>
							Âgés entre
						</Typography>
						<div className="flex items-center gap-4">
							<div>
								<Input
									name="condition_age_min"
									type="number"
									onChange={e =>
										setFieldValue('condition_age_min', Number(e.target.value))
									}
									className="border border-gray-300 rounded p-2 text-center"
									crossOrigin={undefined}
									placeholder="Age min"
								/>
							</div>
							<Typography className="ms-4 me-4">et</Typography>
							<div>
								<Input
									name="condition_age_max"
									type="number"
									onChange={e =>
										setFieldValue('condition_age_max', Number(e.target.value))
									}
									className="border border-gray-300 rounded p-2 text-center"
									crossOrigin={undefined}
									placeholder="Age max"
								/>
							</div>
							<Typography>ans</Typography>
						</div>

						{/* condition_physical */}
						<Typography
							variant="paragraph"
							color="blue-gray"
							className="-mb-3 font-bold"
						>
							Condition physique recommandée
						</Typography>
						<div className="flex justify-between space-x-2">
							<Button
								variant="outlined"
								type="button"
								className={`${
									values.condition_physical === 'none'
										? 'bg-green text-white'
										: 'bg-white text-black'
								}`}
								onClick={() => setFieldValue('condition_physical', 'none')}
							>
								Aucune
							</Button>
							<Button
								variant="outlined"
								type="button"
								className={`${
									values.condition_physical === 'normal'
										? 'bg-green text-white'
										: 'bg-white text-black'
								}`}
								onClick={() => setFieldValue('condition_physical', 'normal')}
							>
								Normal
							</Button>
							<Button
								variant="outlined"
								type="button"
								className={`${
									values.condition_physical === 'excellent'
										? 'bg-green text-white'
										: 'bg-white text-black'
								}`}
								onClick={() => setFieldValue('condition_physical', 'excellent')}
							>
								Excellent
							</Button>
						</div>

						{/* condition_user_limit */}
						<Typography
							variant="paragraph"
							color="blue-gray"
							className="-mb-3 font-bold"
						>
							Nombre limite de participants
						</Typography>
						<div className="flex justify-between -mb-3">
							<span className="text-start">2</span>
							<span className="text-center">
								{values.condition_user_limit + ' ' + "participants max"}
							</span>
							<span className="text-end">10</span>
						</div>
						<input
							type="range"
							min={2}
							max={10}
							step={1}
							name="condition_user_limit"
							className="w-full h-2 bg-green rounded-lg appearance-none cursor-pointer"
							onChange={e => {
								handleSliderChange(e);
								setFieldValue('condition_user_limit', Number(e.target.value));
							}}
						/>
					</div>
				</div>
			</div>
		</Card>
	);
}
