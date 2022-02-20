import { Component, OnInit } from '@angular/core'
import { JobDataService } from "../core/services/job-data.service"
import { JobDetails } from "../core/interfaces/job-details"
import { Filters } from "../core/interfaces/filters"
import { ActivatedRoute } from "@angular/router"
import { Subscription } from "rxjs"

@Component({
	selector: 'app-jobs-page',
	templateUrl: './jobs-page.component.html',
	styleUrls: ['./jobs-page.component.scss']
})
export class JobsPageComponent implements OnInit {
	jobList: Array<JobDetails> = []
	jobsOffset: number = 0

	routeSub$: Subscription

	constructor(
		private jobData: JobDataService,
		private route: ActivatedRoute
	) {
		this.routeSub$ =
			this.route.queryParams.subscribe(params => {
				this.jobsOffset = params['page'] ? params['page'] : 0
			})
	}

	ngOnInit(): void {
	}

	setJobsOffset(event: number): void {
		this.jobsOffset = event
		this.loadJobs(false)
	}

	loadJobs(concat: boolean, event?: Filters) {
		console.log("offset", this.jobsOffset)
		this.jobData.getJobs(this.jobsOffset * 5, event).subscribe({
			next: (val) => {
				this.jobList = concat ? this.jobList.concat(val) : val
			}
		})
	}

	ngOnDestroy(): void {
		this.routeSub$.unsubscribe()
	}
}
