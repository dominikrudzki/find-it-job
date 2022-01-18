export interface Job {
	id: number;
	name: string;
	image: string;
	company: string;
	salary: { min: number, max: number };
	technologies: Array<string>;
}
