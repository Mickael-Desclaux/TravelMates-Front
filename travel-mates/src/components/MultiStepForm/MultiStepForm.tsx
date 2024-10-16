import { useState } from 'react';
import StepOne from './StepOne';

const MultiStepForm = () => {
	const [step, setStep] = useState(1);

	// Move to the next step
	const nextStep = () => {
		setStep(prevStep => prevStep + 1);
	};

	// Conditional rendering based on the current step
	switch (step) {
		case 1:
			return <StepOne next={nextStep} />;
		default:
			return <div>Other Steps...</div>;
	}
};

export default MultiStepForm;
