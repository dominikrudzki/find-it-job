import { Component, OnInit } from '@angular/core'
import { JobDataService } from "../core/services/job-data.service"
import { JobDetails } from "../core/interfaces/job-details"
import { Filters } from "../core/interfaces/filters"

@Component({
	selector: 'app-jobs-page',
	templateUrl: './jobs-page.component.html',
	styleUrls: ['./jobs-page.component.scss']
})
export class JobsPageComponent implements OnInit {
	jobList: Array<JobDetails> = []
	jobsOffset: number = 0

	constructor(private jobData: JobDataService) {
	}

	ngOnInit(): void {
		// this.loadJobs(false)
	}

	loadMoreJobs() {
		this.jobsOffset += 5
		this.loadJobs(true)
	}

	loadJobs(concat: boolean, event?: Filters) {
		console.log('EVENT', event)
		this.jobData.getJobs(this.jobsOffset, event).subscribe({
			next: (val) => {
				console.log('VALUES:', val)
				this.jobList = concat ? this.jobList.concat(val) : val
			}
		})
	}
}
