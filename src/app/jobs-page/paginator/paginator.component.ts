import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { Router } from "@angular/router"
import { MatPaginator, PageEvent } from "@angular/material/paginator"

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
	@Input() jobListLength: number = 0
	@Input() pageIndex!: number

	@Output() offsetEmitter = new EventEmitter<number>()

	@ViewChild(MatPaginator) paginator!: MatPaginator

	constructor(private router: Router) {
	}

	ngOnInit(): void {
	}

	getPageOffset(event: PageEvent) {
		this.router.navigate(['/'],
			{
				queryParams: {'page': event.pageIndex || null!},
				queryParamsHandling: 'merge'
			})
		this.offsetEmitter.emit(event.pageIndex)
	}
}
