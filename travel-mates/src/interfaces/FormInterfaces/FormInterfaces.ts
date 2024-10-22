// src/interfaces/formInterfaces.ts

export interface FormValues {
	destination: string;
	departureCity: string;
	dates: string;
}

export interface Suggestion {
	name: string;
	context: {
		country: {
			name: string;
		};
	};
}
