export interface JobDetails {
	id: number;
	name: string;
	image: string;
	company: string;
	salary: { min: number, max: number };
	technologies: Array<string>;
}
