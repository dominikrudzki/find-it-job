import { Component, OnInit } from '@angular/core'
import { JobDetails } from "../core/interfaces/job-details"
import { JobDataService } from '../core/services/job-data.service'
import { ActivatedRoute } from "@angular/router"
import { environment } from "../../environments/environment"

@Component({
	selector: 'app-job-preview',
	templateUrl: './job-preview.component.html',
	styleUrls: ['./job-preview.component.scss']
})
export class JobPreviewComponent implements OnInit {
	job?: JobDetails
	jobImageUrl = environment.imageUrl

	jobDataSub = this.jobData.getJob(Number(this.route.snapshot.paramMap.get('jobId'))).subscribe(val => {
		this.job = val
	})

	constructor(private jobData: JobDataService, private route: ActivatedRoute) {
	}

	ngOnInit(): void {
	}

	apply() {
		//	TODO: apply using this job.id
	}

	ngOnDestroy() {
		this.jobDataSub.unsubscribe()
	}
}
