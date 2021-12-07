import { createAction, props } from '@ngrx/store';

export const setLogin = createAction(
	'[User Info] Set isLogged',
	props<{ logged: boolean }>()
);

export const getIsLogged = createAction('[User Info] Get isLogged');
