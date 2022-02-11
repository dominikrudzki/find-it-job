import { Component, OnInit } from '@angular/core'
import { DeveloperService } from "../../core/services/developer.service"
import { SnackbarService } from "../../core/services/snackbar.service"

@Component({
	selector: 'app-user-applications',
	templateUrl: './user-applications.component.html',
	styleUrls: ['./user-applications.component.scss']
})
export class UserApplicationsComponent implements OnInit {
	displayedColumns: string[] = ['name', 'options']
	applicationList: Array<{ id: number, name: string }> = [
		{id: 1, name: 'template job'}
	]

	constructor(
		private developerService: DeveloperService,
		private snackbarService: SnackbarService
	) {
	}

	ngOnInit(): void {
		this.developerService.getUserApplications().subscribe({
			next: val => this.applicationList = val,
			error: () => this.snackbarService.open('Server error')
		})
	}

	deleteApplication(id: number) {
		this.developerService.deleteUserApplication(id).subscribe({
			next: () => this.applicationList = this.applicationList.filter(value => value.id !== id),
			error: () => this.snackbarService.open('Server error')
		})
	}
}
