export interface Job {
	name: string;
	image: string;
	company: string;
	salary: { min: number, max: number };
	technologies: Array<string>;
}
