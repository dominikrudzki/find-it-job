import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobsPageComponent } from './jobs-page/jobs-page.component';
import { FiltersComponent } from './jobs-page/filters/filters.component';
import { LoginDialogComponent } from './shared/dialogs/login-dialog/login-dialog.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';

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
];

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		FooterComponent,
		JobsPageComponent,
		FiltersComponent,
		LoginDialogComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		materialModules,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
