import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-manage-jobs',
	templateUrl: './manage-jobs.component.html',
	styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent implements OnInit {
	displayedColumns: string[] = ['name', 'applications', 'options']
	dataSource = [
		{name: 'Hydrogen', applications: 1.0079, id: 'H'},
		{name: 'Helium', applications: 4.0026, id: 'He'},
		{name: 'Lithium', applications: 6.941, id: 'Li'},
		{name: 'Beryllium', applications: 9.0122, id: 'Be'},
		{name: 'Boron', applications: 10.811, id: 'B'},
		{name: 'Carbon', applications: 12.0107, id: 'C'},
		{name: 'Nitrogen', applications: 14.0067, id: 'N'},
		{name: 'Oxygen', applications: 15.9994, id: 'O'},
		{name: 'Fluorine', applications: 18.9984, id: 'F'},
		{name: 'Neon', applications: 20.1797, id: 'Ne'}
	]

	constructor() {
	}

	ngOnInit(): void {
	}

}
