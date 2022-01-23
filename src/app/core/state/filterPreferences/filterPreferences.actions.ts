import { createAction, props } from '@ngrx/store';

export const getPreferences = createAction(
	'[Filter Preferences] Get preferences'
);

export const setExperience = createAction(
	'[Filter Preferences] Set experience',
	props<{ exp: 'Junior' | 'Mid' | 'Senior' }>()
);

export const setRemote = createAction(
	'[Filter Preferences] Set remote',
	props<{ remote?: string }>()
);

export const addTechnology = createAction(
	'[Filter Preferences] Add technology',
	props<{ technology: string }>()
);

export const deleteTechnology = createAction(
	'[Filter Preferences] Delete technology',
	props<{ technology: string }>()
);
