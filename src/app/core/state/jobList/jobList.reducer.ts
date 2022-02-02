import { createReducer, on } from '@ngrx/store'
import { setJobList, getJobList } from './jobList.actions'
import { JobDetails } from "../../interfaces/job-details"

export const initialState: Array<JobDetails> = []

export const jobListReducer = createReducer(
	initialState,
	on(setJobList, (state, {jobList}) => jobList),
	on(getJobList, (state) => state)
)
