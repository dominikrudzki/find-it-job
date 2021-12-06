import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'src/app/core/services/cookie.service';
import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	isLogged: boolean = false;
	isOpen: boolean = false;
	darkTheme = new BehaviorSubject<boolean>(false);

	constructor(
		private cookieService: CookieService,
		public dialog: MatDialog
	) {
		const darkThemeValue = cookieService.getCookie('darkTheme');

		if (darkThemeValue === '') {
			cookieService.setCookie('darkTheme', 'false');
		} else {
			JSON.parse(darkThemeValue.toLowerCase());
			this.darkTheme.next(JSON.parse(darkThemeValue.toLowerCase()));
		}

		const body = document.body.classList;
		this.darkTheme.subscribe((obs) => {
			obs ? body.add('darkTheme') : body.remove('darkTheme');
			cookieService.setCookie('darkTheme', obs.toString());
		});
	}

	ngOnInit(): void {}

	toggleNav(): void {
		this.isOpen = !this.isOpen;
	}

	openDialog(role: string): void {
		this.dialog.open(LoginDialogComponent, {
			data: role,
		});
	}

	toggleTheme(): void {
		this.darkTheme.next(!this.darkTheme.value);
	}
}
