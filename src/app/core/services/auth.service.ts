import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment"
import { RegisterData } from "../interfaces/register-data"
import { LoginData } from "../interfaces/login-data"
import jwt_decode from 'jwt-decode'
import { jwtPayload } from "../interfaces/jwt-payload"

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) {
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

	decodeAccessToken(token: string): jwtPayload | null {
		try {
			return jwt_decode(token)
		} catch (err) {
			return null
		}
	}
}
