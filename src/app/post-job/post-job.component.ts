import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ENTER } from "@angular/cdk/keycodes"
import { MatChipInputEvent } from "@angular/material/chips"
import { map, Observable, startWith } from "rxjs"
import { FormControl } from "@angular/forms"
import { environment } from "../../environments/environment"
import { JobDataService } from "../core/services/job-data.service"

interface Item {
	name: string,
	level?: number
}

@Component({
	selector: 'app-post-job',
	templateUrl: './post-job.component.html',
	styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
	readonly separatorKeysCodes = [ENTER] as const
	benefits: Array<Item> = [{name: 'Macbook Pro'}, {name: '2 monitors'}]
	skills: Array<Item> = [{name: 'Angular', level: 4}, {name: 'React', level: 5}]

	myControl = new FormControl()
	options: string[] = environment.technologies
	filteredOptions: Observable<string[]>

	selectOption: number = 1
	@ViewChild('skill') skillInput!: ElementRef
	@ViewChild('exp') expOption!: ElementRef

	constructor(private jobDataService: JobDataService) {
		this.filteredOptions = this.myControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		)
	}

	ngOnInit(): void {
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase()
		return this.options.filter(option => option.toLowerCase().includes(filterValue))
	}

	addBenefit(event: MatChipInputEvent): void {
		const value = (event.value || '').trim()
		if (value) {
			this.benefits.push({name: value})
		}
		event.chipInput!.clear()
	}

	addSkill(name: string, level: number) {
		if (name && level) {
			this.skills.push({name, level})
			this.skillInput.nativeElement.value = ''
			this.selectOption = 0
		}
	}

	remove(array: Array<Item>, item: Item): void {
		const index = array.indexOf(item)
		if (index >= 0) {
			array.splice(index, 1)
		}
	}


	postJob() {
		this.jobDataService.addJob().subscribe({
			next: (val) => {

			},
			error: (err) => {

			}
		})
	}
}
