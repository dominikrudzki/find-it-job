import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { ConfirmPasswordValidator } from "../../core/validators/confirm-password.validator"
import { SnackbarService } from "../../core/services/snackbar.service"
import { AuthService } from "../../core/services/auth.service"
import { Store } from "@ngrx/store"
import { UserInfo } from "../../core/interfaces/user-info"
import { setIsLogged } from "../../core/state/userInfo/userInfo.actions"

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	changePasswordGroup = new FormGroup({})

	constructor(
		private fb: FormBuilder,
		private snackbarService: SnackbarService,
		private authService: AuthService,
		private store: Store<{ userInfo: UserInfo }>
	) {
		this.changePasswordGroup = fb.group({
			password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(64)]],
			newPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(64)]],
			confirmNewPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(64)]]
		}, {
			validator: ConfirmPasswordValidator('newPassword', 'confirmNewPassword')
		})
	}

	ngOnInit(): void {
	}

	submitForm(): void {
		if (this.changePasswordGroup.valid) {
			this.authService.changePassword(
				this.changePasswordGroup.get('password')!.value,
				this.changePasswordGroup.get('newPassword')!.value
			).subscribe({
				next: res => {
					this.snackbarService.open(res.message)
					this.store.dispatch(setIsLogged({isLogged: false}))
				},
				error: (err) => this.snackbarService.open(err.error.message)
			})
		}
	}
}
