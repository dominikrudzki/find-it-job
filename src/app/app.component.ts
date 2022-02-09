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
		const accessToken = localStorageService.getItem('access-token')

		if (accessToken) {
			const jwtPayload = this.authService.decodeAccessToken(accessToken)

			this.store.dispatch(setIsLogged({isLogged: true}))
			this.store.dispatch(setIsEmployer({isEmployer: jwtPayload?.employer!}))

			this.getToken()
			setInterval(this.getToken, 1000 * 60 * 29) // 29min
		}
	}

	private getToken() {
		this.authService.refreshToken().subscribe({
			next: ({accessToken}) => {
				const jwtPayload = this.authService.decodeAccessToken(accessToken)

				this.localStorageService.setItem('access-token', accessToken)

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

			},
			error: (err) => {
				console.log(err)
				this.localStorageService.removeItem('access-token')
				this.localStorageService.removeItem('refresh-token')
			}
		})
	}
}
