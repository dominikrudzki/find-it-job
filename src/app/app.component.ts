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
import { interval, mergeMap, Subscription } from "rxjs"
import jwt_decode from "jwt-decode"
import { jwtPayload } from "./core/interfaces/jwt-payload"

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	private tokenSubscription: Subscription = new Subscription()

	constructor(
		private localStorageService: LocalStorageService,
		private store: Store<{ userInfo: UserInfo }>,
		private authService: AuthService
	) {
		const accessToken = localStorageService.getItem('access-token')
		const refreshToken = localStorageService.getItem('refresh-token')

		if (accessToken) {
			this.store.dispatch(setIsLogged({isLogged: true}))
			this.setDataFromToken(accessToken)

			if (refreshToken) {
				this.authService.refreshToken().subscribe({
					next: (val) => {
						this.setDataFromToken(val.accessToken)
					}
				})
			}
		}

		this.store.select(state => state.userInfo.isEmployer).subscribe(
			val => {
				if (val) {
					this.tokenSubscription =
						interval(1000 * 60 * 28).pipe(
							mergeMap(() => this.authService.refreshToken())
						).subscribe({
							next: ({accessToken}) => this.setDataFromToken(accessToken),
							error: () => this.authService.logout()
						})
				} else {
					this.tokenSubscription.unsubscribe()
				}
			}
		)
	}

	setDataFromToken(accessToken: string) {
		const jwtPayload: jwtPayload = jwt_decode(accessToken)

		this.store.dispatch(setIsEmployer({isEmployer: jwtPayload?.employer!}))
		this.store.dispatch(setEmail({email: jwtPayload?.email!}))
		this.store.dispatch(setCompanyName({companyName: jwtPayload?.companyName!}))
		this.store.dispatch(setCompanyImage({companyImage: jwtPayload?.companyImage!}))

		this.localStorageService.setItem('access-token', accessToken)
	}
}
