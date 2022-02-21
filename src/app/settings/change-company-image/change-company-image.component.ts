import { Component, OnInit } from '@angular/core'
import { EmployerService } from 'src/app/core/services/employer.service'
import { SnackbarService } from "../../core/services/snackbar.service"
import { Router } from "@angular/router"
import { Store } from "@ngrx/store"
import { UserInfo } from "../../core/interfaces/user-info"
import { LocalStorageService } from "../../core/services/local-storage.service"
import { setCompanyImage } from "../../core/state/userInfo/userInfo.actions"
import { environment } from "../../../environments/environment"

@Component({
	selector: 'app-change-company-image',
	templateUrl: './change-company-image.component.html',
	styleUrls: ['./change-company-image.component.scss']
})
export class ChangeCompanyImageComponent implements OnInit {
	updateBtnDisabled: boolean = true
	inputFile?: File
	imgSrc?: string | ArrayBuffer | null

	constructor(
		private companyService: EmployerService,
		private snackbarService: SnackbarService,
		private router: Router,
		private store: Store<{ userInfo: UserInfo }>,
		private localStorageService: LocalStorageService
	) {
	}

	ngOnInit(): void {
	}

	onFileSelected(event: Event | any) {
		if (event.target !== null || event.target?.files.length === 0) {

			if (event.target.files[0].size < environment.companyLogoMaxSize) {

				const reader = new FileReader()
				reader.readAsDataURL(event.target.files[0])
				reader.onload = () => this.imgSrc = reader.result

				this.inputFile = event.target.files[0]
				this.updateBtnDisabled = false

			} else {
				this.snackbarService.open(`File size must be less than ${environment.companyLogoMaxSize / 1000} kb`, '', false)
			}
		}
	}

	updateLogo() {
		if (this.inputFile) {
			this.companyService.changeCompanyImage(this.inputFile).subscribe({
				next: (val) => {
					this.snackbarService.open('Company logo updated', '', true)
					this.localStorageService.setItem('c_img', val)
					this.store.dispatch(setCompanyImage({companyImage: val}))
					this.router.navigate(['/settings'])
				},
				error: () => {
					this.snackbarService.open('Failed to update company logo', '', false)
				}
			})
		}
	}
}
