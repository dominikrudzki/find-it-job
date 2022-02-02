import { createAction, props } from '@ngrx/store'

export const setIsLogged = createAction(
	'[User Info] Set isLogged',
	props<{ isLogged: boolean }>()
)

export const setIsEmployer = createAction(
	'[User Info] Set isEmployer',
	props<{ isEmployer: boolean }>()
)

export const setEmail = createAction(
	'[User Info] Set email',
	props<{ email: string }>()
)

export const resetUserInfo = createAction(
	'[User Info] Reset UserInfo'
)
