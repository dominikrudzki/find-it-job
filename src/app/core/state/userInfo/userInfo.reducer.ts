import { createReducer, on } from '@ngrx/store'
import { resetUserInfo, setEmail, setIsEmployer, setIsLogged } from './userInfo.actions'
import { UserInfo } from '../../interfaces/user-info'

export const initialState: UserInfo = {
	isLogged: false,
	isEmployer: undefined,
	userEmail: undefined
}

export const userInfoReducer = createReducer(
	initialState,
	on(setIsLogged, (state, {isLogged}) => ({...state, isLogged})),
	on(setIsEmployer, (state, {isEmployer}) => ({...state, isEmployer})),
	on(setEmail, (state, {email}) => ({...state, userEmail: email})),
	on(resetUserInfo, () => initialState)
)
