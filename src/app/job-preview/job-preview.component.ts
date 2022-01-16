import {Component, OnInit} from '@angular/core';
import {max} from 'rxjs';
import {JobDetails} from "../shared/interfaces/jobDetails.interface";

@Component({
	selector: 'app-job-preview',
	templateUrl: './job-preview.component.html',
	styleUrls: ['./job-preview.component.scss']
})
export class JobPreviewComponent implements OnInit {
	job: JobDetails | any = {
		salary: {min: 32000, max: 48000}
	};

	constructor() {

	}

	ngOnInit(): void {
	}

}
