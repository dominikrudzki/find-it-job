import { createReducer, on } from '@ngrx/store';
import { getPreferences } from '../actions/filterPreferences.actions';

import { Preferences } from '../models/filterPreferences.model';

export const initialFilterPreferences: Preferences = {
	technologies: undefined,
	remote: undefined,
	experience: undefined,
};

export const filterPreferencesReducer = createReducer(
	initialFilterPreferences,
	on(getPreferences, (state) => state)
);
