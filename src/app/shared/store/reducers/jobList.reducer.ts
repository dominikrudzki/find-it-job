import {createReducer, on} from '@ngrx/store';
import {setJobList, getJobList} from '../actions/jobList.actions';
import {Job} from "../models/jobList.model";

export const initialState: Array<Job> = [
	{
		name: 'Junior Frontend Developer',
		image: 'https://cdn.pixabay.com/photo/2012/04/13/01/51/hamburger-31775_960_720.png',
		company: 'Very Nice Dev Company',
		salary: {min: 2000, max: 5000},
		technologies: ['JavaScript', 'Styled Components', 'React']
	},
	{
		name: 'Mid Backend Developer',
		image: 'https://cdn.pixabay.com/photo/2012/04/24/16/15/broccoli-40295_960_720.png',
		company: 'New Backend Company',
		salary: {min: 12000, max: 20000},
		technologies: ['Python', 'Ruby']
	},
	{
		name: 'Senior Fullstack Developer',
		image: 'https://cdn.pixabay.com/photo/2013/07/13/10/41/hat-157581_960_720.png',
		company: 'Fullstack Company',
		salary: {min: 32000, max: 48000},
		technologies: ['Angular', '.Net', 'AWS', 'Blockchain']
	},
	{
		name: 'Intern React Developer',
		image: 'https://cdn.pixabay.com/photo/2013/07/12/15/55/laurel-wreath-150577_960_720.png',
		company: 'New Company',
		salary: {min: 1200, max: 2200},
		technologies: ['React']
	}
];

export const jobListReducer = createReducer(
	initialState,
	on(setJobList, (state, {jobList}) => state),
	on(getJobList, (state) => state)
);
