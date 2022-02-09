import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { JobDetails } from "../interfaces/job-details"
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment"
import { LocalStorageService } from "./local-storage.service"

@Injectable({
	providedIn: 'root'
})
export class JobDataService {

	constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService
	) {
	}

	getJob(id: number): Observable<JobDetails> {
		return this.http.get<JobDetails>(`${environment.apiUrl}/get-job/${id}`)
	}

	getJobs(): Observable<Array<JobDetails>> {
		return this.http.get<any>(`${environment.apiUrl}/get-jobs`)
	}

	getEmployerJobs() {
		console.log(this.localStorageService.getItem('access-token'))
		return this.http.get<any>(
			`${environment.apiUrl}/get-company-jobs`,
			{
				headers: new HttpHeaders(
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('access-token')}
				)
			}
		)
	}

	addJob(jobData: JobDetails) {
		return this.http.put(
			`${environment.apiUrl}/add-job`,
			jobData,
			{
				headers: new HttpHeaders(
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('access-token')}
				)
			}
		)
	}

	deleteJob(jobId: number) {
		return this.http.delete(
			`${environment.apiUrl}/delete-job`,
			{
				body: {jobId},
				headers: new HttpHeaders(
					{'Authorization': 'Bearer ' + this.localStorageService.getItem('access-token')}
				)
			}
		)
	}
}
