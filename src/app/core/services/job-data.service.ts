import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { JobDetails } from "../interfaces/job-details"
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment"

@Injectable({
	providedIn: 'root'
})
export class JobDataService {

	constructor(private http: HttpClient) {
	}

	getJob(id: number): Observable<JobDetails> {
		return this.http.get<JobDetails>(`${environment.apiUrl}/get-job/${id}`)
	}

	getJobs(): Observable<Array<JobDetails>> {
		return this.http.get<any>(`${environment.apiUrl}/get-jobs`)
	}
}
