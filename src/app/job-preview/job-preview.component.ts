import {Component, OnInit} from '@angular/core';
import {JobDetails} from "../core/interfaces/jobDetails.interface";

@Component({
	selector: 'app-job-preview',
	templateUrl: './job-preview.component.html',
	styleUrls: ['./job-preview.component.scss']
})
export class JobPreviewComponent implements OnInit {
	job: JobDetails = {
		id: 3,
		name: 'Senior Fullstack Developer',
		image: 'https://cdn.pixabay.com/photo/2013/07/13/10/41/hat-157581_960_720.png',
		company: 'Fullstack Company',
		remote: true,
		salary: {min: 32000, max: 48000},
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium perspiciatis quasi ratione. Asperiores blanditiis consequatur culpa cum est ex facilis nemo, pariatur perferendis provident, quod sit! Deserunt necessitatibus nobis ratione?',
		benefits: ['Remote work', 'International team International team International team International team International team', 'Private medical care'],
		requirements: ['5+ years of experience in Angular', 'Good knowledge of English'],
		skills: [{level: 5, name: 'Angular'}, {level: 1, name: '.NET'}, {level: 3, name: 'AWS'}],
		experience: "Senior"
	};

	constructor() {
	}

	ngOnInit(): void {
	}

	apply() {
		//	TODO: apply using this job id
	}
}
