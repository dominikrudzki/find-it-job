import {Component, Input, OnInit} from '@angular/core';
import {JobDetails} from "../../core/interfaces/jobDetails.interface";

@Component({
	selector: 'app-job',
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
	@Input() job?: JobDetails;

	constructor() {
	}

	ngOnInit(): void {
	}
}
