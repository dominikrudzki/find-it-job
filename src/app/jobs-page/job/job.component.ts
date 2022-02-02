import { Component, Input, OnInit } from '@angular/core'
import { JobDetails } from "../../core/interfaces/job-details"
import { environment } from "../../../environments/environment"

@Component({
	selector: 'app-job',
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
	@Input() job?: JobDetails
	jobImageUrl = environment.imageUrl

	constructor() {
	}

	ngOnInit(): void {
	}
}
