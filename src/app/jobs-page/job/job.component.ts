import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../shared/store/models/jobList.model";

@Component({
	selector: 'app-job',
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
	@Input() job?: Job;

	constructor() {
	}

	ngOnInit(): void {
	}

}