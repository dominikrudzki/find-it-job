import { Component, Inject, OnInit } from '@angular/core'
import { EmployerService } from "../../../core/services/employer.service"
import { MAT_DIALOG_DATA } from "@angular/material/dialog"
import { SnackbarService } from "../../../core/services/snackbar.service"
import { JobApplication } from "../../../core/interfaces/job-application"

@Component({
	selector: 'app-applications',
	templateUrl: './applications.component.html',
	styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
	displayedColumns: string[] = ['name', 'applications', 'options']
	userList: Array<JobApplication> = []

	constructor(
		private companyService: EmployerService,
		@Inject(MAT_DIALOG_DATA) public data: { jobId: number },
		private snackbarService: SnackbarService
	) {
	}

	ngOnInit(): void {
		this.companyService.getJobApplications(this.data.jobId).subscribe({
			next: val => this.userList = val,
			error: () => this.snackbarService.open('Unable to load applications', '', false)
		})
	}
}
