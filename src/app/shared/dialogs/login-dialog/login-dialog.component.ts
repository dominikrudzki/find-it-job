import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-login-dialog',
	templateUrl: './login-dialog.component.html',
	styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
	role: string | undefined;

	constructor(
		public dialogRef: MatDialogRef<LoginDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: string
	) {}

	ngOnInit(): void {
		this.role = this.data;
	}
}
