import { createReducer, on } from '@ngrx/store'
import {
	resetUserInfo,
	setCompanyName,
	setEmail,
	setIsEmployer,
	setIsLogged
} from './userInfo.actions'
import { UserInfo } from '../../interfaces/user-info'

export const initialState: UserInfo | any = {
	isLogged: false,
	isEmployer: undefined,
	userEmail: undefined,
	companyName: undefined,
	companyImage: undefined
}

export const userInfoReducer = createReducer(
	initialState,
	on(setIsLogged, (state, {isLogged}) => ({...state, isLogged})),
	on(setIsEmployer, (state, {isEmployer}) => ({...state, isEmployer})),
	on(setEmail, (state, {email}) => ({...state, userEmail: email})),
	on(setCompanyName, (state, {companyName}) => ({...state, companyName})),
	on(resetUserInfo, () => initialState)
)
