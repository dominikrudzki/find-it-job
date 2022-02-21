import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { Store } from "@ngrx/store"
import { UserInfo } from "../interfaces/user-info"

@Injectable({
	providedIn: 'root'
})
export class IsEmployerGuard implements CanActivate {
	constructor(
		private store: Store<{ userInfo: UserInfo }>,
		private router: Router
	) {
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let isEmployer = false
		this.store.select(state => state.userInfo.isEmployer).subscribe(
			val => {
				isEmployer = val
			}
		)
		if (isEmployer) return true
		this.router.navigate(['/settings'])
		return false
	}

}
