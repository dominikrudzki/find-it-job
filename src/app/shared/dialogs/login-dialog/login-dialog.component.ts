import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { AuthService } from "../../../core/services/auth.service"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { SnackbarService } from "../../../core/services/snackbar.service"
import { Store } from "@ngrx/store"
import {
	setCompanyImage,
	setCompanyName,
	setEmail,
	setIsEmployer,
	setIsLogged
} from "../../../core/state/userInfo/userInfo.actions"
import { UserInfo } from "../../../core/interfaces/user-info"
import { LocalStorageService } from "../../../core/services/local-storage.service"
import jwtDecode from "jwt-decode"
import { jwtPayload } from "../../../core/interfaces/jwt-payload"
import { ConfirmPasswordValidator } from "../../../core/validators/confirm-password.validator"

@Component({
	selector: 'app-login-dialog',
	templateUrl: './login-dialog.component.html',
	styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
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

	registerGroup = this.fb.group({
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
	}, {
		validator: ConfirmPasswordValidator('password', 'repeatPassword')
	})

	constructor(
		public dialogRef: MatDialogRef<LoginDialogComponent>,
		private authService: AuthService,
		private snackbar: SnackbarService,
		private store: Store<{ userInfo: UserInfo }>,
		private localStorageService: LocalStorageService,
		private fb: FormBuilder
	) {
		this.registerGroup.get('company_name')?.disable()
	}

	ngOnInit(): void {
	}

	manageCompanyNameInput(enable: boolean): void {
		if (enable) {
			this.registerGroup.get('company_name')?.enable()
		} else {
			this.registerGroup.get('company_name')?.disable()
		}
	}

	register(form: HTMLFormElement, isEmployer: boolean): any {
		if (this.registerGroup.valid) {
			const obj = Object.assign(
				this.registerGroup.value,
				{employer: isEmployer}
			)

			this.authService.register(obj).subscribe({
				next: () => {
					form.reset()
					this.registerGroup.reset()
					this.snackbar.open('Account created!', '', true)
				},
				error: () => {
					this.snackbar.open('The error has been occurred. Please try again later', '', false)
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

					const jwtPayload: jwtPayload = jwtDecode(value.accessToken)

					this.store.dispatch(setIsLogged({isLogged: true}))
					this.store.dispatch(setIsEmployer({isEmployer: jwtPayload.employer!}))
					this.store.dispatch(setEmail({email: jwtPayload?.email}))
					this.store.dispatch(setCompanyName({companyName: jwtPayload?.companyName!}))
					this.store.dispatch(setCompanyImage({companyImage: jwtPayload?.companyImage!}))

					this.localStorageService.setItem('access-token', value.accessToken)
					this.localStorageService.setItem('refresh-token', value.refreshToken)

					this.snackbar.open('You are signed in!', '', true)
				},
				error: () => {
					this.snackbar.open('Invalid credentials', '', false)
				}
			})
		}
	}
}
