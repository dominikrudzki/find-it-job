import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router'
import { Observable, take } from 'rxjs'
import { Store } from "@ngrx/store"
import { UserInfo } from "../interfaces/user-info"

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
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
		this.store.select(state => state.userInfo.isLogged).pipe(take(1)).subscribe(
			(logged: boolean) => isLogged = logged
		)
		if (isLogged) {
			return true
		} else {
			this.router.navigate(['/'])
			return false
		}
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return true
	}

}
