import {
	Card,
	Typography,
	Input,
	Button,
	Checkbox,
} from '@material-tailwind/react';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import './TripConditions.css';
import { FormValues } from '../../interfaces/FormInterfaces/FormInterfaces';
import useAuthStore from '../../utils/AuthStore';
import { GetProfile } from '../../api/Profile';
import { ProfileData } from '../../interfaces/ProfileInterface';

export default function TripConditions({ currentParticipantsCount = 0 }) {
	// Use Formik context to access and update values
	const { values, setFieldValue } = useFormikContext<FormValues>();
	const userId = useAuthStore(state => state.user_id);
	const [profile, setProfile] = useState<ProfileData>();
	const minParticipants = Math.max(2, currentParticipantsCount);

	// Update the background color of the slider based on its value
	const updateSliderBackground = (
		value: number,
		min: number,
		max: number,
		slider: HTMLInputElement,
	) => {
		if (!slider) return;

		const percentage = ((value - min) / (max - min)) * 100;
		slider.style.background = `linear-gradient(to right, #185C22 ${percentage}%, #ccc ${percentage}%)`;
	};

	useEffect(() => {
		const fetchLoginProfile = async () => {
			if (!userId) return;

			try {
				const data = await GetProfile(userId);
				setProfile(data);

				const isChecked = values.condition_gender !== "all";
				if (isChecked) {
					setFieldValue('condition_gender', data.gender);
				} else {
					setFieldValue('condition_gender', "all");
				}
			} catch (error) {
				throw new Error;
			}
		};

		fetchLoginProfile();
	}, [userId]);

	useEffect(() => {
        // Ensure the user limit is never less than current participants
        if (values.condition_user_limit < currentParticipantsCount) {
            setFieldValue('condition_user_limit', currentParticipantsCount);
        }

        const slider = document.querySelector(
            'input[type="range"]',
        ) as HTMLInputElement;

        if (slider) {
            requestAnimationFrame(() => {
                updateSliderBackground(
                    values.condition_user_limit || minParticipants,
                    minParticipants,
                    +slider.max || 10,
                    slider
                );
            });
        }
    }, [values.condition_user_limit, currentParticipantsCount]);

	// Handle slider value change
	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(parseInt(e.target.value, 10), minParticipants);
        setFieldValue('condition_user_limit', value);

        const slider = e.target as HTMLInputElement;
        updateSliderBackground(value, minParticipants, +slider.max, slider);
    };

	const handleGenderCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const genderValue = !e.target.checked ? "all" : profile?.gender || "";
		setFieldValue('condition_gender', genderValue);
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
								color="black"
								className="font-bold"
							>
								Je veux voyager uniquement avec des {profile?.gender === "male" ? "hommes" : "femmes"}
							</Typography>
							<Checkbox
								name="condition_gender"
								className={`border border-gray-300 rounded p-2 w-full ${values.condition_gender !== "all" ? "bg-green" : "bg-slate-50"
									}`}
								onChange={handleGenderCheckboxChange}
								value={values.condition_gender}
								crossOrigin={undefined}
								checked={values.condition_gender !== "all"}
								color='green'
							/>

						</div>

						{ }
						<Typography
							variant="paragraph"
							color="black"
							className="-mb-3 font-bold"
						>
							Âgés entre
						</Typography>
						<div className="flex items-center gap-4">
							<div className='max-w-[25vw] md:max-w-[5vw]'>
								<Input
									name="condition_age_min"
									type="number"
									containerProps={{ className: "min-w-full" }}
									onChange={e =>
										setFieldValue('condition_age_min', Number(e.target.value))
									}
									className="border border-gray-300 rounded p-2 text-center max-w-[25vw] md:max-w-[5vw]"
									crossOrigin={undefined}
									placeholder="Age min"
									value={values.condition_age_min}
								/>
							</div>
							<Typography className="ms-4 me-4">et</Typography>
							<div className='max-w-[25vw] md:max-w-[5vw]'>
								<Input
									name="condition_age_max"
									type="number"
									containerProps={{ className: "min-w-full" }}
									onChange={e =>
										setFieldValue('condition_age_max', Number(e.target.value))
									}
									className="border border-gray-300 rounded p-2 text-center max-w-[25vw] md:max-w-[5vw]"
									crossOrigin={undefined}
									placeholder="Age max"
									value={values.condition_age_max}
								/>
							</div>
							<Typography>ans</Typography>
						</div>

						{/* condition_physical */}
						<Typography
							variant="paragraph"
							color="black"
							className="-mb-3 font-bold"
						>
							Condition physique recommandée
						</Typography>
						<div className="flex justify-between space-x-2">
							<Button
								variant="outlined"
								type="button"
								className={`${values.condition_physical === 'none'
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
								className={`${values.condition_physical === 'normal'
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
								className={`${values.condition_physical === 'excellent'
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
							color="black"
							className="-mb-3 font-bold"
						>
							Nombre limite de participants
						</Typography>
						<div className="flex justify-between -mb-3">
							<span className="text-start">{minParticipants}</span>
							<span className="text-center">
								{values.condition_user_limit + ' ' + "participants max"}
							</span>
							<span className="text-end">10</span>
						</div>
						<input
							type="range"
							min={minParticipants}
							max={10}
							step={1}
							name="condition_user_limit"
							className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-green"
							value={Math.max(values.condition_user_limit, minParticipants)}
							onChange={handleSliderChange}
						/>
					</div>
				</div>
			</div>
		</Card>
	);
}
