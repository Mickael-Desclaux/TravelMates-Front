import React, { createContext, useState } from 'react';

interface FormData {
	destination: string;
	// departureCity: string;
	dates: string;
}

interface FormContextType {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const FormContext = createContext<FormContextType | null>(null);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [formData, setFormData] = useState<FormData>({
		destination: '',
		// departureCity: '',
		dates: '',
	});

	return (
		<FormContext.Provider value={{ formData, setFormData }}>
			{children}
		</FormContext.Provider>
	);
};
