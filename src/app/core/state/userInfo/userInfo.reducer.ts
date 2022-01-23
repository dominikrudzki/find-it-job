import {createReducer, on} from '@ngrx/store';

import {setLogin, getIsLogged} from './userInfo.actions';
import {userInfo} from '../../interfaces/userInfo.interface';

export const initialLoginState: userInfo = {
	isLogged: false,
	accountType: undefined,
	userInfo: undefined,
};

export const userInfoReducer = createReducer(
	initialLoginState.isLogged,
	on(setLogin, (state, {logged}) => state), //TODO: add changing state
	on(getIsLogged, (state) => state)
);
