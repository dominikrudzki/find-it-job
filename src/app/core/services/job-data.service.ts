import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobDetails} from "../interfaces/jobDetails.interface";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class JobDataService {
	private apiUrl: string = 'http://localhost:4400/api/v1'

	constructor(private http: HttpClient) {
	}

	getJob(id: number): Observable<JobDetails> {
		return this.http.get<JobDetails>(`${this.apiUrl}/get-job/${id}`)
	}

	getJobs(): Observable<Array<JobDetails>> {
		return this.http.get<any>(`${this.apiUrl}/get-jobs`)
	}
}
