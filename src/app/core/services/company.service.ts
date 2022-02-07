import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "../../../environments/environment"
import { LocalStorageService } from "./local-storage.service"
import { Observable } from "rxjs"

@Injectable({
	providedIn: 'root'
})
export class CompanyService {

	constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService
	) {
	}

	changeCompanyImage(file: File): Observable<any> {
		const formData = new FormData()
		formData.append('company_logo', file)

		return this.http.patch(
			`${environment.apiUrl}/change-company-image`,
			formData,
			{
				headers: new HttpHeaders(
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('accessToken')}
				)
			}
		)
	}

	deleteJob(id: number) {
	}
}
