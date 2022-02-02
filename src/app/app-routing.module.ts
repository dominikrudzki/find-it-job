import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { JobPreviewComponent } from './job-preview/job-preview.component'
import { JobsPageComponent } from './jobs-page/jobs-page.component'
import { PostJobComponent } from "./post-job/post-job.component"
import { SettingsComponent } from "./settings/settings.component"
import { AuthGuard } from "./core/guards/auth.guard"

const routes: Routes = [
	{
		path: '',
		component: JobsPageComponent
	},
	// {path: 'matches', component: JobsPageComponent},
	{
		path: 'job-offers/:jobId',
		component: JobPreviewComponent
	},
	{
		path: 'post-job',
		component: PostJobComponent
	},
	{
		path: 'settings',
		component: SettingsComponent,
		runGuardsAndResolvers: 'always',
		canActivate: [AuthGuard]
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
