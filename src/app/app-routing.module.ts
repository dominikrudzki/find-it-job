import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { JobPreviewComponent } from './job-preview/job-preview.component'
import { JobsPageComponent } from './jobs-page/jobs-page.component'
import { PostJobComponent } from "./post-job/post-job.component"
import { SettingsComponent } from "./settings/settings.component"
import { AuthGuard } from "./core/guards/auth.guard"
import { ManageJobsComponent } from "./settings/manage-jobs/manage-jobs.component"
import { UserApplicationsComponent } from "./settings/user-applications/user-applications.component"
import { ChangePasswordComponent } from "./settings/change-password/change-password.component"
import { ChangeCompanyImageComponent } from "./settings/change-company-image/change-company-image.component"
import { IsEmployerGuard } from "./core/guards/is-employer.guard"

const routes: Routes = [
	{
		path: '',
		component: JobsPageComponent
	},
	{
		path: 'search/:skills/:remote/:experience/:salary',
		component: JobsPageComponent
	},
	{
		path: 'job-offers/:jobId',
		component: JobPreviewComponent
	},
	{
		path: 'post-job',
		component: PostJobComponent,
		canActivate: [IsEmployerGuard]
	},
	{
		path: 'settings',
		runGuardsAndResolvers: 'always',
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: SettingsComponent
			},
			{
				path: 'change-password',
				component: ChangePasswordComponent
			},
			{
				path: 'my-applications',
				component: UserApplicationsComponent
			},
			{
				path: 'change-company-image',
				component: ChangeCompanyImageComponent,
				canActivate: [IsEmployerGuard]
			},
			{
				path: 'manage-jobs',
				component: ManageJobsComponent,
				canActivate: [IsEmployerGuard]
			}
		]
	},
	{
		path: '**',
		redirectTo: '/'
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
