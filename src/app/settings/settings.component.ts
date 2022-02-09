import { Component, OnInit } from '@angular/core'
import { Store } from "@ngrx/store"
import { UserInfo } from "../core/interfaces/user-info"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	$companyName: Observable<string | undefined> = this.store.select((state) => state.userInfo.companyName)
	$companyImage: Observable<string | undefined> = this.store.select((state) => environment.imageUrl + state.userInfo.companyImage)

	constructor(private store: Store<{ userInfo: UserInfo }>) {
	}

	ngOnInit(): void {
	}
}
