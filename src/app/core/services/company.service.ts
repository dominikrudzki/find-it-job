import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "../../../environments/environment"
import { LocalStorageService } from "./local-storage.service"
import { Observable } from "rxjs"
import { JobApplication } from "../interfaces/job-application"

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
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('access-token')}
				)
			}
		)
	}

	getJobApplications(jobId: number): Observable<Array<JobApplication>> {
		return this.http.get<Array<JobApplication>>(
			`${environment.apiUrl}/get-job-applications/${jobId}`,
			{
				headers: new HttpHeaders(
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('access-token')}
				)
			}
		)
	}
}
