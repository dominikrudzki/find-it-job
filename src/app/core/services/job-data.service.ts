import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { JobDetails } from "../interfaces/job-details"
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment"
import { LocalStorageService } from "./local-storage.service"
import { Filters } from "../interfaces/filters"

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

	getJobs(offset: number = 0, params?: Filters): Observable<Array<JobDetails>> {
		return this.http.post<Array<JobDetails>>(
			`${environment.apiUrl}/get-jobs/${offset}`,
			params
		)
	}

	getEmployerJobs() {
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
