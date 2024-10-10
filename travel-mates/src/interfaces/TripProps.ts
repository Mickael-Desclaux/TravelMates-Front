export interface Activity {
	id: number;
	type: string;
	icon: string;
}

export interface Trip {
	id: number;
	title: string;
	destination: string;
	dateFrom: string;
	dateTo: string;
	description: string;
	budgetMin: number;
	budgetMax: number;
	media: string;
	activities: Activity[];
}
