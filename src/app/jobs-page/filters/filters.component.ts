import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
	categories: string[] = [
		'C++',
		'C#',
		'JavaScript',
		'PHP',
		'Java',
		'Python',
		'.Net',
		'Ruby',
	];

	panelOpenState = false;

	constructor() {}

	ngOnInit(): void {}
}
