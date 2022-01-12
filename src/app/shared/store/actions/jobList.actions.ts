import {createAction, props} from '@ngrx/store';
import {Job} from "../models/jobList.model";

export const setJobList = createAction(
	'[JobList] Set jobList',
	props<{ jobList: Array<Job> }>()
);

export const getJobList = createAction('[JobList] Get jobList');
