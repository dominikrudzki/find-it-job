import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router'
import { Observable } from 'rxjs'
import { Store } from "@ngrx/store"
import { UserInfo } from "../interfaces/user-info"

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private readonly store: Store<{ userInfo: UserInfo }>
	) {
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot):
		Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any {
		let isLogged: boolean = false
		this.store.select(state => state.userInfo.isLogged).subscribe(
			(logged: boolean) => isLogged = logged
		)
		if (isLogged) {
			return true
		}
		this.router.navigate(['/'])
		return false
	}
}
