import { Injectable } from '@angular/core'
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {

	constructor(private _snackBar: MatSnackBar) {
	}

	open(message: string, action: string = '', valid: boolean) {
		this._snackBar.open(message, action, {
			duration: 6000,
			panelClass: [valid ? 'snackbar-valid' : 'snackbar-invalid']
		})
	}
}
