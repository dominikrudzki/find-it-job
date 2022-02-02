import {createAction, props} from '@ngrx/store';
import {JobDetails} from "../../interfaces/jobDetails.interface";

export const setJobList = createAction(
	'[JobList] Set jobList',
	props<{ jobList: Array<JobDetails> }>()
);

export const getJobList = createAction('[JobList] Get jobList');