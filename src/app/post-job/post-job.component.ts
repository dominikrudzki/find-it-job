import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ENTER } from "@angular/cdk/keycodes"
import { MatChipInputEvent } from "@angular/material/chips"
import { map, Observable, startWith } from "rxjs"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { environment } from "../../environments/environment"
import { JobDataService } from "../core/services/job-data.service"
import { SnackbarService } from "../core/services/snackbar.service"

interface Item {
	name: string,
	level: number
}

@Component({
	selector: 'app-post-job',
	templateUrl: './post-job.component.html',
	styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
	readonly separatorKeysCodes = [ENTER] as const
	selectOption: string = "0"
	benefits: Array<string> = []
	skills: Array<Item> = []

	addJobForm: FormGroup = new FormGroup({
		name: new FormControl(
			'',
			[Validators.required,
				Validators.minLength(2),
				Validators.maxLength(32)
			]),
		remote: new FormControl('', [Validators.required]),
		salaryMin: new FormControl('', [Validators.required]),
		salaryMax: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		experience: new FormControl('', [Validators.required])
	})

	myControl = new FormControl()
	options: string[] = environment.skills
	filteredOptions: Observable<string[]>

	@ViewChild('skill') skillInput!: ElementRef

	constructor(
		private jobDataService: JobDataService,
		private snackbarService: SnackbarService
	) {
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
			this.benefits.push(value)
		}
		event.chipInput!.clear()
	}

	addSkill(name: string, level: number) {
		level = parseInt(String(level))
		if (name && (level !== 0)) {
			this.skills.push({name, level})
			this.skillInput.nativeElement.value = ''
			this.selectOption = "0"
		}
	}

	remove(array: Array<Item | string>, item: Item | string): void {
		const index = array.indexOf(item)
		if (index >= 0) {
			array.splice(index, 1)
		}
	}

	submitForm() {
		if (this.addJobForm.valid) {
			this.jobDataService.addJob(
				{
					name: this.addJobForm.get('name')?.value,
					remote: this.addJobForm.get('remote')?.value === "true",
					benefits: this.benefits,
					company: "", // TODO: get your company from store
					description: this.addJobForm.get('description')?.value,
					experience: this.addJobForm.get('experience')?.value,
					salary: {
						min: this.addJobForm.get('salaryMin')?.value,
						max: this.addJobForm.get('salaryMax')?.value
					},
					skills: this.skills
				}
			).subscribe({
				next: () => {
					this.addJobForm.reset()
					this.benefits = []
					this.skills = []
					this.snackbarService.open('Job added')
				},
				error: (err) => {
					this.snackbarService.open('Failed to add a job')
					console.log(err)
				}
			})
		} else {
			this.snackbarService.open('Form is not valid')
		}
	}
}
