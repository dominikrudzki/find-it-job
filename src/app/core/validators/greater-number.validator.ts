import { FormGroup } from "@angular/forms"

export const greaterNumberValidator = (controlName: string, matchingControlName: string) => {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName]
		const matchingControl = formGroup.controls[matchingControlName]
		if (matchingControl.errors && !matchingControl.errors["greaterNumberValidator"]) {
			return
		}
		if (control.value > matchingControl.value - 1) {
			matchingControl.setErrors({confirmedValidator: true})
		} else {
			matchingControl.setErrors(null)
		}
	}
}
