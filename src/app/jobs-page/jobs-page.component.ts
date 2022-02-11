import { Component, OnInit } from '@angular/core'
import { JobDataService } from "../core/services/job-data.service"
import { JobDetails } from "../core/interfaces/job-details"

@Component({
	selector: 'app-jobs-page',
	templateUrl: './jobs-page.component.html',
	styleUrls: ['./jobs-page.component.scss']
})
export class JobsPageComponent implements OnInit {
	jobList: Array<JobDetails> = []
	jobsOffset: number = 0
	btnVisible: boolean = true

	constructor(private jobData: JobDataService) {
	}

	ngOnInit(): void {
		// TODO: check if array of jobs is empty, if yes send request to get jobs
		this.loadJobs()
	}

	loadMoreJobs() {
		//	TODO: load few more jobs
		this.jobsOffset += 5
		this.loadJobs()
	}

	loadJobs() {
		this.jobData.getJobs(this.jobsOffset).subscribe({
			next: (val) => {
				this.jobList = this.jobList.concat(val)
				if (val.length < 5) {
					this.btnVisible = false
				}
			}
		})
	}
}
