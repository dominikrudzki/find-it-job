import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class CookieService {
	constructor() {}

	setCookie(name: string, value: string) {
		document.cookie = `${name}=${value};`;
	}

	getCookie(name: string): string {
		const match = document.cookie.match(
			new RegExp('(^| )' + name + '=([^;]+)')
		);
		return match ? match[2] : '';
	}
}
