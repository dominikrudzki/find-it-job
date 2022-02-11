import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { LocalStorageService } from "./local-storage.service"
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment"

@Injectable({
	providedIn: 'root'
})
export class DeveloperService {
	constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService
	) {
	}

	getUserApplications(): Observable<any> {
		return this.http.get(
			`${environment.apiUrl}/get-user-applications`,
			{
				headers: new HttpHeaders(
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('access-token')}
				)
			}
		)
	}

	applyForJob(jobId: number) {
		return this.http.post(
			`${environment.apiUrl}/apply-for-job/${jobId}`,
			{},
			{
				headers: new HttpHeaders(
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('access-token')}
				)
			}
		)
	}

	deleteUserApplication(jobId: number): Observable<any> {
		return this.http.delete(
			`${environment.apiUrl}/delete-apply-for-job/${jobId}`,
			{
				headers: new HttpHeaders(
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('access-token')}
				)
			}
		)
	}
}
