import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JobPreviewComponent} from './job-preview/job-preview.component';
import {JobsPageComponent} from './jobs-page/jobs-page.component';

const routes: Routes = [
	{
		path: '', component: JobsPageComponent,
		children: [
			{path: 'offers/:link', component: JobPreviewComponent}
		]
	},
	{path: 'matches', component: JobsPageComponent},
	// TODO: add logos and jobs pages
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
