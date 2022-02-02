import { Component } from '@angular/core'
import { LocalStorageService } from './core/services/local-storage.service'
import { Store } from "@ngrx/store"
import { UserInfo } from "./core/interfaces/user-info"
import { setEmail, setIsEmployer, setIsLogged } from "./core/state/userInfo/userInfo.actions"
import { AuthService } from './core/services/auth.service'


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		private localStorageService: LocalStorageService,
		private store: Store<{ userInfo: UserInfo }>,
		private authService: AuthService
	) {
		const body = document.body.classList // TODO: dark mode (handle in store)
		body.add('darkTheme')

		if (localStorageService.getItem('refreshToken')) {
			this.store.dispatch(setIsLogged({isLogged: true}))

			const jwtPayload = authService.decodeAccessToken(localStorageService.getItem('accessToken')!)

			this.store.dispatch(setEmail({
				email: jwtPayload?.email!
			}))

			this.store.dispatch(setIsEmployer({
				isEmployer: jwtPayload?.employer!
			}))
		}
	}
}
