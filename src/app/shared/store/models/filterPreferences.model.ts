export interface Preferences {
	technologies?: Array<string>;
	remote?: boolean;
	minSalary?: number; //TODO: add logic to minSalary
	experience?: 'Junior' | 'Mid' | 'Senior';
}
