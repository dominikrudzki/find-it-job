import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment"
import { RegisterData } from "../interfaces/register-data"
import { LoginData } from "../interfaces/login-data"
import { LocalStorageService } from "./local-storage.service"
import { resetUserInfo } from "../state/userInfo/userInfo.actions"
import { Store } from "@ngrx/store"
import { UserInfo } from "../interfaces/user-info"
import { Router } from "@angular/router"

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService,
		private store: Store<{ userInfo: UserInfo }>,
		private router: Router
	) {
	}

	register(data: RegisterData): Observable<any> {
		const {email, password, employer, company_name} = data
		return this.http.post(
			`${environment.apiUrl}/register`,
			{email, password, employer, company_name}
		)
	}

	login(data: LoginData): Observable<any> {
		const {email, password} = data
		return this.http.post(
			`${environment.apiUrl}/login`,
			{email, password}
		)
	}

	logout() {
		this.localStorageService.removeItem('access-token')
		this.localStorageService.removeItem('refresh-token')
		this.store.dispatch(resetUserInfo())
		this.router.navigate(['/'])
	}

	changePassword(password: string, newPassword: string): Observable<any> {
		return this.http.patch(
			`${environment.apiUrl}/change-password`,
			{password, newPassword},
			{
				headers: new HttpHeaders(
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('access-token')}
				)
			}
		)
	}

	refreshToken(): Observable<any> {
		return this.http.post(
			`${environment.apiUrl}/refresh-token`,
			{},
			{
				headers: new HttpHeaders(
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('refresh-token')}
				)
			}
		)
	}
}
