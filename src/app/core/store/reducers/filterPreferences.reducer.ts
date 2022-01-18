import {createReducer, on} from '@ngrx/store';
import {
	addTechnology,
	deleteTechnology,
	getPreferences,
	setExperience,
	setRemote,
} from '../actions/filterPreferences.actions';
import {Preferences} from '../../interfaces/filterPreferences.interface';

export const initialState: Preferences = {
	experience: undefined,
	remote: undefined,
	technologies: [],
};

export const filterPreferencesReducer = createReducer(
	initialState,
	on(setRemote, (state, {remote}) => {
		const stateCopy = {...state};
		if (remote) {
			stateCopy.remote = JSON.parse(remote.toLowerCase());
		} else {
			stateCopy.remote = undefined;
		}

		state = stateCopy;
		return state;
	}),
	on(setExperience, (state, {exp}) => {
		const stateCopy = {...state};
		stateCopy.experience = exp;
		state = stateCopy;
		return state;
	}),
	on(getPreferences, (state) => state),
	on(addTechnology, (state, {technology}) => {
		const stateCopy = {...state};
		stateCopy.technologies = [...stateCopy.technologies!, technology];
		state = stateCopy;
		return state;
	}),
	on(deleteTechnology, (state, {technology}) => {
		const stateCopy = {...state};
		stateCopy.technologies = stateCopy.technologies!.filter(
			(val) => val !== technology
		);
		state = stateCopy;
		return state;
	})
);
