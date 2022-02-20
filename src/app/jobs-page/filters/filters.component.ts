import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, startWith } from "rxjs"
import { FormControl } from "@angular/forms"
import { COMMA, ENTER } from "@angular/cdk/keycodes"
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material/autocomplete"
import { MatChipInputEvent } from "@angular/material/chips"
import { environment } from "../../../environments/environment"
import { MatRadioChange } from "@angular/material/radio"
import { Filters } from "../../core/interfaces/filters"
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
	separatorKeysCodes: number[] = [ENTER, COMMA]
	skillsForm = new FormControl()
	filteredSkills: Observable<string[]>
	allSkills: string[] = environment.skills
	panelOpenState = false

	filters: BehaviorSubject<Filters> = new BehaviorSubject<Filters>({
		skills: [],
		remote: 'any',
		experience: 'any',
		salary: 0
	})

	@ViewChild('techInput') techInput!: ElementRef<HTMLInputElement>
	@ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger
	@Output() filtersEmitter = new EventEmitter<Filters>()

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {
		this.filteredSkills = this.skillsForm.valueChanges.pipe(
			startWith(null),
			map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice()))
		)
	}

	ngOnInit(): void {
		this.route.queryParams/*.pipe(take(1))*/.subscribe(params => {
			console.log(params)
			this.filters.next({
				skills: params['skills'] ? params['skills'].split(',') : [],
				remote: params['remote'] ? params['remote'] : 'any',
				experience: params['exp'] ? params['exp'] : 'any',
				salary: params['salary'] ? parseInt(params['salary']) : 0
			})
		})

		this.filters.pipe(
			debounceTime(0), // FIXME: no debounce time at first load
			distinctUntilChanged()
		).subscribe(res => {
			let body: Filters = {...res}

			body['skills'] = body['skills']?.length === 0 ? undefined : body['skills']!.map(val => val.toLowerCase())
			body['remote'] = body['remote'] === 'any' ? undefined : body['remote']
			body['experience'] = body['experience'] === 'any' ? undefined : body['experience']
			body['salary'] = body['salary'] === 0 ? undefined : body['salary']

			this.filtersEmitter.emit(body)
		})
	}

	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim()

		if (value && this.filters.value.skills!.findIndex(skill => skill.toLowerCase() === value.toLowerCase()) === -1) {
			this.filters.next({
				...this.filters.value,
				skills: [...this.filters.value.skills!, value]
			})
			this.navigate({'skills': this.filters.value.skills!.join(',')})
		}
		event.chipInput!.clear()
		this.skillsForm.setValue(null)
		this.autocomplete.closePanel()
	}

	remove(skill: string): void {
		this.filters.next({
			...this.filters.value,
			skills: this.filters.value.skills?.filter((val: string) => val !== skill)
		})
		this.navigate({'skills': this.filters.value.skills!.join(',')})
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		if (!this.filters.value.skills!.includes(event.option.viewValue)) {
			this.filters.next({
				...this.filters.value,
				skills: [...this.filters.value.skills!, event.option.viewValue]
			})
			this.navigate({'skills': this.filters.value.skills!.join(',')})
		}
		this.techInput.nativeElement.value = ''
		this.skillsForm.setValue(null)
	}

	remoteChange(event: MatRadioChange) {
		this.filters.next({...this.filters.value, remote: event.value})
		this.navigate({'remote': event.value})
	}

	experienceChange(event: MatRadioChange) {
		let experience = undefined
		if (event.value !== null) experience = event.value
		this.filters.next({...this.filters.value, experience})
		this.navigate({'exp': event.value})
	}

	salaryChange(salary: number) {
		this.filters.next({...this.filters.value, salary})
		this.navigate({'salary': salary})
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase()

		return this.allSkills.filter(technology => technology.toLowerCase().includes(filterValue))
	}

	private navigate(param: Params) {
		this.router.navigate(
			[''],
			{
				relativeTo: this.route,
				queryParams: {...param, 'page': null},
				queryParamsHandling: 'merge'
			}
		)
	}
}
