import {createAction, props} from '@ngrx/store';
import {Job} from "../../interfaces/jobList.interface";

export const setJobList = createAction(
	'[JobList] Set jobList',
	props<{ jobList: Array<Job> }>()
);

export const getJobList = createAction('[JobList] Get jobList');
