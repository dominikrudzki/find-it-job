import {Component, OnInit} from '@angular/core';
import {Job} from "../core/interfaces/jobList.interface";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
	selector: 'app-jobs-page',
	templateUrl: './jobs-page.component.html',
	styleUrls: ['./jobs-page.component.scss']
})
export class JobsPageComponent implements OnInit {

	jobList$: Observable<Array<Job>>;

	constructor(private store: Store<{ jobList: Array<Job> }>) {
		this.jobList$ = this.store.select('jobList');
	}

	ngOnInit(): void {
	}

	loadMoreJobs() {
		//	TODO: create load more jobs
	}
}
