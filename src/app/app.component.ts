import { Component } from '@angular/core'
import { LocalStorageService } from './core/services/local-storage.service'
import { Store } from "@ngrx/store"
import { UserInfo } from "./core/interfaces/user-info"
import {
	setCompanyImage,
	setCompanyName,
	setEmail,
	setIsEmployer,
	setIsLogged
} from "./core/state/userInfo/userInfo.actions"
import { AuthService } from './core/services/auth.service'
import { take } from "rxjs"


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

		if (localStorageService.getItem('refresh-token')) {
			this.store.dispatch(setIsLogged({isLogged: true}))

			this.authService.refreshToken().pipe(take(1)).subscribe({
				next: ({accessToken}) => {
					this.localStorageService.setItem('access-token', accessToken)

					const jwtPayload = authService.decodeAccessToken(accessToken)

					this.store.dispatch(setEmail({
						email: jwtPayload?.email!
					}))

					this.store.dispatch(setIsEmployer({
						isEmployer: jwtPayload?.employer!
					}))

					this.store.dispatch(setCompanyName({
						companyName: jwtPayload?.companyName!
					}))

					this.store.dispatch(setCompanyImage({
						companyImage: jwtPayload?.companyImage!
					}))
					// setInterval(() => {
					// // TODO: silent access-token refresh
					// }, 1000 * 60 * 29) // 29min
				},
				error: (err) => {
					console.log(err)
					this.localStorageService.removeItem('access-token')
					this.localStorageService.removeItem('refresh-token')
				}
			})
		}
	}
}
