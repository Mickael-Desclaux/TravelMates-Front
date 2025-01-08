// src/interfaces/formInterfaces.ts

export interface FormValues {
	destination: string;
	// departureCity: string; // Commenté, si non utilisé
	dates: string;
	title: string; // Ajout du champ title
	description: string; // Ajout du champ description
	activities: number[]; // Ajout du champ pour les activités sélectionnées
	budgetRange: [number, number];
	condition_gender: string;
	condition_age_min: number;
	condition_age_max: number;
	condition_physical: string;
	condition_user_limit: number;
}

export interface Suggestion {
	name: string;
	context: {
		country: {
			name: string;
		};
	};
}
