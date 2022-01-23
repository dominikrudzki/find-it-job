import {Component, OnInit} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatRadioChange} from '@angular/material/radio';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import {
	addTechnology,
	deleteTechnology,
	setExperience,
	setRemote,
} from 'src/app/core/state/filterPreferences/filterPreferences.actions';
import {Preferences} from 'src/app/core/interfaces/filterPreferences.interface';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
	categories: string[] = ['C++', 'C#', 'JavaScript', 'PHP', 'Java', 'Python', '.Net', 'Ruby'];

	showPreferences: boolean = false;
	preferences: BehaviorSubject<Preferences> = new BehaviorSubject({});
	panelOpenState = false;

	constructor(private store: Store<{ filterPreferences: any }>) {
		this.store.select('filterPreferences').subscribe((obs) => {
			this.preferences.next(obs);

			const prefValue = this.preferences.value;
			if (
				prefValue.experience ||
				prefValue.remote !== undefined ||
				prefValue.technologies?.length !== 0
			) {
				this.showPreferences = true;
			} else {
				this.showPreferences = false;
			}
		});
	}

	ngOnInit(): void {
	}

	remoteHandle(event: MatRadioChange) {
		this.store.dispatch(setRemote({remote: event.value}));
	}

	experienceHandle(event: MatRadioChange) {
		this.store.dispatch(setExperience({exp: event.value}));
	}

	categoryHandle(event: MatCheckboxChange) {
		if (event.checked) {
			this.store.dispatch(addTechnology({technology: event.source.id}));
		} else {
			this.store.dispatch(
				deleteTechnology({technology: event.source.id})
			);
		}
	}
}
