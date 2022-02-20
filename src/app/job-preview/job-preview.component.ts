import { Component, OnInit } from '@angular/core'
import { JobDetails } from "../core/interfaces/job-details"
import { JobDataService } from '../core/services/job-data.service'
import { ActivatedRoute } from "@angular/router"
import { environment } from "../../environments/environment"
import { DeveloperService } from "../core/services/developer.service"
import { SnackbarService } from "../core/services/snackbar.service"
import { Store } from "@ngrx/store"
import { UserInfo } from "../core/interfaces/user-info"
import { Observable } from "rxjs"

@Component({
	selector: 'app-job-preview',
	templateUrl: './job-preview.component.html',
	styleUrls: ['./job-preview.component.scss']
})
export class JobPreviewComponent implements OnInit {
	job?: JobDetails
	jobImageUrl = environment.imageUrl
	applied: boolean = false
	isLogged: Observable<boolean> = this.store.select(state => state.userInfo.isLogged)
	isEmployer: Observable<boolean> = this.store.select(state => state.userInfo.isEmployer)

	jobDataSub = this.jobData.getJob(Number(this.route.snapshot.paramMap.get('jobId'))).subscribe(val => {
		this.job = val
	})

	constructor(
		private jobData: JobDataService,
		private route: ActivatedRoute,
		private developerService: DeveloperService,
		private snackbarService: SnackbarService,
		private store: Store<{ userInfo: UserInfo }>
	) {
	}

	ngOnInit(): void {
	}

	apply() {
		this.developerService.applyForJob(this.job?.id!).subscribe({
			next: () => {
				this.snackbarService.open('You applied this job', '', true)
				this.applied = true
			},
			error: () => {
				this.snackbarService.open('Server error', '', false)
			}
		})
	}

	ngOnDestroy() {
		this.jobDataSub.unsubscribe()
	}
}
