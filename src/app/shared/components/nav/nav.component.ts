import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'
import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component'
import { UserInfo } from "../../../core/interfaces/user-info"
import { LocalStorageService } from "../../../core/services/local-storage.service"
import { Router } from '@angular/router'
import { ConfirmDialogComponent } from "../../dialogs/confirm-dialog/confirm-dialog.component"
import { AuthService } from "../../../core/services/auth.service"

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
	$isLogged: Observable<boolean> = this.store.select((state) => state.userInfo.isLogged)
	$isEmployer: Observable<boolean | undefined> = this.store.select((state) => state.userInfo.isEmployer)
	isOpen: boolean = false
	darkTheme = new BehaviorSubject<boolean>(false)

	constructor(
		private readonly store: Store<{ userInfo: UserInfo }>,
		public dialog: MatDialog,
		private localStorageService: LocalStorageService,
		private router: Router,
		private authService: AuthService
	) {
		const darkThemeValue = this.localStorageService.getItem('dark-theme') === 'true'

		router.events.subscribe(() => this.isOpen = false)

		if (darkThemeValue) {
			this.darkTheme.next(darkThemeValue)
		}
	}

	ngOnInit(): void {
		const body = document.body.classList

		this.darkTheme.subscribe(val => {
			this.localStorageService.setItem('dark-theme', val.toString())
			if (val) {
				body.add('darkTheme')
			} else {
				body.remove('darkTheme')
			}
		})
	}

	toggleNav(): void {
		this.isOpen = !this.isOpen
	}

	openDialog(): void {
		this.dialog.open(LoginDialogComponent)
	}

	toggleTheme(): void {
		this.darkTheme.next(!this.darkTheme.value)
	}

	logout() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {restoreFocus: false})
		dialogRef.afterClosed().subscribe((res: boolean) => {
			if (res) {
				this.authService.logout()
			}
		})
	}
}
