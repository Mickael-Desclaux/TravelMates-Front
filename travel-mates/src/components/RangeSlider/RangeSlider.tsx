import React from 'react';
import Slider from '@mui/material/Slider';
import './RangeSlider.css';

interface RangeSliderProps {
	nameMin: string;
	nameMax: string;
	min: number;
	max: number;
	step?: number;
	value: number[];
	onChange: (value: number[]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
	min,
	max,
	step = 1,
	value,
	onChange,
}) => {
	const handleSliderChange = (newValue: number | number[]) => {
		if (Array.isArray(newValue)) {
			onChange(newValue);
		}
	};

	return (
		<div className="range-slider-container">
			{/* Valeurs sélectionnées (en haut) */}
			<div className="range-slider-values range-slider-values-top">
				<span>{value[0]} €</span>
				<span>{value[1]} €</span>
			</div>

			{/* Slider */}
			<Slider
				value={value}
				onChange={(_, newValue) => handleSliderChange(newValue)}
				valueLabelDisplay="auto"
				min={min}
				max={max}
				step={step}
				className="range-slider"
			/>

			{/* Valeurs minimum et maximum (en bas) */}
			<div className="range-slider-values range-slider-values-bottom">
				<span>{min} €</span>
				<span>{max} €</span>
			</div>
		</div>
	);
};

export default RangeSlider;
