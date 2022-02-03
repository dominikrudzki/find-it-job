import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavComponent } from './shared/components/nav/nav.component'
import { FooterComponent } from './shared/components/footer/footer.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { JobsPageComponent } from './jobs-page/jobs-page.component'
import { FiltersComponent } from './jobs-page/filters/filters.component'
import { LoginDialogComponent } from './shared/dialogs/login-dialog/login-dialog.component'
import { JobComponent } from './jobs-page/job/job.component'
import { JobPreviewComponent } from './job-preview/job-preview.component'
import { PostJobComponent } from './post-job/post-job.component'
import { SettingsComponent } from './settings/settings.component'

import { StoreModule } from '@ngrx/store'
import { userInfoReducer } from './core/state/userInfo/userInfo.reducer'
import { filterPreferencesReducer } from './core/state/filterPreferences/filterPreferences.reducer'
import { jobListReducer } from "./core/state/jobList/jobList.reducer"

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatRadioModule } from '@angular/material/radio'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material/tabs'
import { MatInputModule } from '@angular/material/input'
import { MatSliderModule } from '@angular/material/slider'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'


import { CurrencyPipe } from './core/pipes/currency.pipe'
import { HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ManageJobsComponent } from './settings/manage-jobs/manage-jobs.component'
import { UserApplicationsComponent } from './settings/user-applications/user-applications.component'
import { ChangePasswordComponent } from './settings/change-password/change-password.component'
import { BackButtonComponent } from './shared/components/back-button/back-button.component'
import { ChangeCompanyImageComponent } from './settings/change-company-image/change-company-image.component'
import { MatChipsModule } from "@angular/material/chips"
import { MatDividerModule } from '@angular/material/divider'
import { MatSelectModule } from "@angular/material/select"
import { MatAutocompleteModule } from "@angular/material/autocomplete"

const materialModules = [
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatSidenavModule,
	MatListModule,
	MatMenuModule,
	MatCardModule,
	MatCheckboxModule,
	MatExpansionModule,
	MatRadioModule,
	MatSlideToggleModule,
	MatDialogModule,
	MatTabsModule,
	MatInputModule,
	MatSliderModule,
	MatSnackBarModule,
	MatTableModule,
	MatDividerModule
]

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		FooterComponent,
		JobsPageComponent,
		FiltersComponent,
		LoginDialogComponent,
		JobComponent,
		JobPreviewComponent,
		CurrencyPipe,
		PostJobComponent,
		SettingsComponent,
		ManageJobsComponent,
		UserApplicationsComponent,
		ChangePasswordComponent,
		BackButtonComponent,
		ChangeCompanyImageComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		materialModules,
		StoreModule.forRoot({
			userInfo: userInfoReducer,
			filterPreferences: filterPreferencesReducer,
			jobList: jobListReducer
		}),
		MatChipsModule,
		MatSelectModule,
		MatAutocompleteModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
