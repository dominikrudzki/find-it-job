// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	apiUrl: 'http://localhost:3000/api/v1',
	imageUrl: 'http://localhost:3000/company_logos/',
	searchDelay: 400, //ms
	skills: ['Angular', 'C', 'C++', 'CSS', 'Go', 'HTML', 'Java', 'JavaScript', 'Node', 'Python', 'React', 'Ruby'],
	companyLogoMaxSize: 200000 // kb
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
