import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

	transform(value: number): string {
		return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
	}

}
