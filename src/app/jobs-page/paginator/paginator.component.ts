import { Component, Input, OnInit } from '@angular/core'
import { Router } from "@angular/router"

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
	@Input() jobListLength: number = 0

	constructor(private router: Router) {
	}

	ngOnInit(): void {
	}
}
