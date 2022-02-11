import { Component, OnInit } from '@angular/core'
import { JobDetails } from "../core/interfaces/job-details"
import { JobDataService } from '../core/services/job-data.service'
import { ActivatedRoute } from "@angular/router"
import { environment } from "../../environments/environment"
import { DeveloperService } from "../core/services/developer.service"
import { SnackbarService } from "../core/services/snackbar.service"

@Component({
	selector: 'app-job-preview',
	templateUrl: './job-preview.component.html',
	styleUrls: ['./job-preview.component.scss']
})
export class JobPreviewComponent implements OnInit {
	job?: JobDetails
	jobImageUrl = environment.imageUrl
	applied: boolean = false

	jobDataSub = this.jobData.getJob(Number(this.route.snapshot.paramMap.get('jobId'))).subscribe(val => {
		this.job = val
	})

	constructor(
		private jobData: JobDataService,
		private route: ActivatedRoute,
		private developerService: DeveloperService,
		private snackbarService: SnackbarService
	) {
	}

	ngOnInit(): void {
	}

	apply() {
		this.developerService.applyForJob(this.job?.id!).subscribe({
			next: () => {
				this.snackbarService.open('You applied this job')
				this.applied = true
			},
			error: (err) => {
				if (err.status = 401) {
					// TODO: open login modal
				}

				this.snackbarService.open('Server error')
			}
		})
	}

	ngOnDestroy() {
		this.jobDataSub.unsubscribe()
	}
}
