import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'
import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component'
import { UserInfo } from "../../../core/interfaces/user-info"
import { resetUserInfo } from "../../../core/state/userInfo/userInfo.actions"
import { LocalStorageService } from "../../../core/services/local-storage.service"
import { Router } from '@angular/router'

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
	$isLogged: Observable<boolean> = this.store.select((state) => state.userInfo.isLogged)
	$isEmployer: Observable<boolean | undefined> = this.store.select((state) => state.userInfo.isEmployer)
	isOpen: boolean = false
	darkTheme = new BehaviorSubject<boolean>(true)

	constructor(
		private readonly store: Store<{ userInfo: UserInfo }>,
		public dialog: MatDialog,
		private localStorageService: LocalStorageService,
		private router: Router
	) {
		router.events.subscribe(val => this.isOpen = false)
	}

	ngOnInit(): void {
	}

	toggleNav(): void {
		this.isOpen = !this.isOpen
	}

	openDialog(employer: boolean): void {
		this.dialog.open(LoginDialogComponent, {
			data: employer
		})
	}

	toggleTheme(): void {
		this.darkTheme.next(!this.darkTheme.value)
	}

	logout() {
		this.localStorageService.removeItem('accessToken')
		this.localStorageService.removeItem('refreshToken')
		this.store.dispatch(resetUserInfo())
	}
}
