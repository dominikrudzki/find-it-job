import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AuthService } from "../../../core/services/auth.service"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { SnackbarService } from "../../../core/services/snackbar.service"
import { Store } from "@ngrx/store"
import {
	setCompanyImage,
	setCompanyName,
	setEmail,
	setIsEmployer,
	setIsLogged
} from "../../../core/state/userInfo/userInfo.actions"
import { Observable } from "rxjs"
import { UserInfo } from "../../../core/interfaces/user-info"
import { LocalStorageService } from "../../../core/services/local-storage.service"

@Component({
	selector: 'app-login-dialog',
	templateUrl: './login-dialog.component.html',
	styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
	role: string | undefined
	$isLogged: Observable<boolean> = this.store.select((state) => state.userInfo.isLogged)

	loginGroup = new FormGroup({
		email: new FormControl(
			'',
			[Validators.required, Validators.email]
		),
		password: new FormControl(
			'',
			[Validators.required, Validators.minLength(5), Validators.maxLength(64)]
		)
	})

	registerGroup = new FormGroup({
		email: new FormControl(
			'',
			[Validators.required, Validators.email]),
		password: new FormControl(
			'',
			[Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
		repeatPassword: new FormControl(
			'',
			[Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
		company_name: new FormControl(
			'',
			[Validators.minLength(3), Validators.maxLength(32)])
	})

	constructor(
		public dialogRef: MatDialogRef<LoginDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: string,
		private authService: AuthService,
		private snackbar: SnackbarService,
		private store: Store<{ userInfo: UserInfo }>,
		private localStorageService: LocalStorageService
	) {
		this.role = this.data
	}

	ngOnInit(): void {
		if (this.data) {
			this.registerGroup.get('company_name')?.setValidators(Validators.required)
		}
	}

	register() {
		if (this.registerGroup.valid) {
			const obj = Object.assign(this.registerGroup.value, {employer: this.data})

			this.authService.register(obj).subscribe({
				next: (value) => {
					console.log(value)
					this.registerGroup.reset()
					this.snackbar.open('Account created!')
				},
				error: () => {
					this.snackbar.open('The error has been occurred. Please try again later')
				}
			})
		}
	}

	login() {
		if (this.loginGroup.valid) {
			this.authService.login(this.loginGroup.value).subscribe({
				next: (value) => {
					this.loginGroup.reset()
					this.dialogRef.close()

					const jwtPayload = this.authService.decodeAccessToken(value.accessToken)

					this.store.dispatch(setIsLogged({isLogged: true}))
					this.store.dispatch(setIsEmployer({isEmployer: jwtPayload?.employer!}))
					this.store.dispatch(setEmail({email: jwtPayload?.email!}))
					this.store.dispatch(setCompanyName({companyName: jwtPayload?.companyName!}))
					this.store.dispatch(setCompanyImage({companyImage: jwtPayload?.companyImage!}))

					this.localStorageService.setItem('access-token', value.accessToken)
					this.localStorageService.setItem('refresh-token', value.refreshToken)
				},
				error: () => {
					this.snackbar.open('Invalid credentials')
				}
			})
		}
	}
}
