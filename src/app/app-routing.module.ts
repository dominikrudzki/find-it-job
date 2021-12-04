import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsPageComponent } from './jobs-page/jobs-page.component';

const routes: Routes = [
	{ path: '', component: JobsPageComponent },
	{ path: 'matches', component: JobsPageComponent },
	// TODO: add logos and jobs pages
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
