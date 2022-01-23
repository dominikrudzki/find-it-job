import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {JobDataService} from "../core/services/job-data.service";
import {setJobList} from "../core/state/jobList/jobList.actions";
import {JobDetails} from "../core/interfaces/jobDetails.interface";

@Component({
	selector: 'app-jobs-page',
	templateUrl: './jobs-page.component.html',
	styleUrls: ['./jobs-page.component.scss']
})
export class JobsPageComponent implements OnInit {

	jobList$: Observable<Array<JobDetails>>;

	constructor(private jobData: JobDataService, private store: Store<{ jobList: Array<JobDetails> }>) {
		this.jobList$ = this.store.select('jobList');
	}

	ngOnInit(): void {
		// TODO: check if array of jobs is empty, if yes send request to get jobs
		this.jobData.getJobs().subscribe({
			next: (val) => {
				this.store.dispatch(setJobList({jobList: val}))
			}
		})
	}

	loadMoreJobs() {
		//	TODO: load few more jobs
	}
}
