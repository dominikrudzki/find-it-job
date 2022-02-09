import { Component, OnInit } from '@angular/core'
import { JobDataService } from "../../core/services/job-data.service"
import { MatDialog } from "@angular/material/dialog"
import { ConfirmDialogComponent } from "../../shared/dialogs/confirm-dialog/confirm-dialog.component"
import { SnackbarService } from "../../core/services/snackbar.service"

interface Job {
	id: number,
	name: string,
	applications: number
}

@Component({
	selector: 'app-manage-jobs',
	templateUrl: './manage-jobs.component.html',
	styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent implements OnInit {
	displayedColumns: string[] = ['name', 'applications', 'options']
	jobList: Array<Job> = []

	constructor(
		private jobDataService: JobDataService,
		public dialog: MatDialog,
		private snackbarService: SnackbarService
	) {
	}

	ngOnInit(): void {
		this.jobDataService.getEmployerJobs().subscribe({
			next: (val) => {
				console.log(val)
				this.jobList = val
			},
			error: err => {
				console.log(err)
			}
		})
	}

	deleteJob(id: number): void {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {restoreFocus: false})
		dialogRef.afterClosed().subscribe((res: boolean) => {
			if (res) {
				this.jobDataService.deleteJob(id).subscribe({
					next: () => {
						this.jobList = this.jobList.filter(job => job.id !== id)
						this.snackbarService.open('Job deleted')
					},
					error: () => {
						this.snackbarService.open('Unable to delete job')
					}
				})
			}
		})
	}
}
