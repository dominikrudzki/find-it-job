import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ENTER } from "@angular/cdk/keycodes"
import { MatChipInputEvent } from "@angular/material/chips"
import { map, Observable, startWith } from "rxjs"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { environment } from "../../environments/environment"
import { JobDataService } from "../core/services/job-data.service"
import { SnackbarService } from "../core/services/snackbar.service"
import { greaterNumberValidator } from "../core/validators/greater-number.validator"

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

	addJobForm: FormGroup = this.fb.group({
		name: new FormControl(
			'',
			[Validators.required,
				Validators.minLength(2),
				Validators.maxLength(32)
			]),
		remote: new FormControl('', [Validators.required]),
		salaryMin: new FormControl('', [
			Validators.required,
			Validators.pattern("^[0-9]*$"),
			Validators.maxLength(6)
		]),
		salaryMax: new FormControl('', [
			Validators.required,
			Validators.pattern("^[0-9]*$"),
			Validators.maxLength(6)
		]),
		description: new FormControl(''),
		experience: new FormControl('', [Validators.required])
	}, {
		validator: greaterNumberValidator('salaryMin', 'salaryMax')
	})

	myControl = new FormControl()
	options: string[] = environment.skills
	filteredOptions: Observable<string[]>

	@ViewChild('skill') skillInput!: ElementRef

	constructor(
		private jobDataService: JobDataService,
		private snackbarService: SnackbarService,
		private fb: FormBuilder
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

	submitForm(form: HTMLFormElement) {
		if (this.addJobForm.valid) {
			this.jobDataService.addJob(
				{
					name: this.addJobForm.get('name')?.value,
					remote: this.addJobForm.get('remote')?.value === "true",
					benefits: this.benefits,
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
					form.reset()
					this.addJobForm.reset()
					this.benefits = []
					this.skills = []
					this.snackbarService.open('Job added')
				},
				error: () => {
					this.snackbarService.open('Failed to add a job')
				}
			})
		} else {
			this.snackbarService.open('Form is not valid')
		}
	}
}
