export interface JobDetails {
	id: number;
	name: string;
	image: string;
	company: string;
	remote: boolean;
	salary?: { min: number, max: number };
	description?: string;
	benefits?: Array<string>;
	requirements?: Array<string>;
	experience: 'Junior' | 'Mid' | 'Senior';
	skills?: any; // FIXME: fix type
}
