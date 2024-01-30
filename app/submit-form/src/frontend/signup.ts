import { checkEmailRules } from "../shared/email-rules";
import { checkPasswordRules } from "../shared/password-rules";
import { FieldErrors } from "./fields-error";


/* --------------------------------- ELEMENTS --------------------------------- */


const formElements = [
	document.querySelector('#email'),
	document.querySelector('#password'),
	document.querySelector('#agree-to-terms'),
	document.querySelector('#form-submit'),
];

const fieldErrors = new FieldErrors();


const handleChange = (event: Event): void => {
	const element: EventTarget | null = event.target as HTMLInputElement;
	const elementType = (element as HTMLInputElement).type;
	const elementValue = (element as HTMLInputElement).value;


	const handleSubmitButton = (): void => {
		const button = document.querySelector('#form-submit');

		//  check all fields not empty
		const allHasValues = formElements.slice(0, 3).every(element => (element as HTMLInputElement).value)
		if (fieldErrors.hasNoErrors() && allHasValues) {
			button?.classList.remove('btn-disabled');
		} else {
			button?.classList.add('btn-disabled');
		}
	}

	/* --------------------------- EMAIL REQUIREMENTS --------------------------- */
	if (elementType === 'email') {
		// value
		const isConditionMet = checkEmailRules(elementValue);

		const elementError: HTMLElement | null = document.querySelector('#invalid-email');
		const hasElementError = elementError !== null;

		if (!isConditionMet && hasElementError) {
			fieldErrors.set('EmailPattern', (element as HTMLInputElement), elementError, 'Email address must use format: name@example.com');
		}

		if (isConditionMet && hasElementError) {
			fieldErrors.remove('EmailPattern', (element as HTMLInputElement), elementError)
		}

	}

	/* -------------------------- PASSWORD REQUIREMENTS ------------------------- */

	if (elementType === 'password') {
		const elementError: HTMLElement | null = document.querySelector('#invalid-password');
		const hasElementError = elementError !== null;
		const isConditionMet = checkPasswordRules(elementValue);

		if (!isConditionMet && hasElementError) {
			fieldErrors.set('PasswordLength', (element as HTMLInputElement), elementError, 'Password must be at least 8 characters.');
		}

		if (isConditionMet && hasElementError) {
			fieldErrors.remove('PasswordLength', (element as HTMLInputElement), elementError)
		}
	}


	/* ---------------------------- TERM REQUIREMENTS --------------------------- */
	if (elementType === 'checkbox') {
		const elementError: HTMLInputElement | null = document.querySelector('#invalid-terms-agreement');
		const hasElementError = elementError !== null;
		const didAgreeToTerms = (element as HTMLInputElement).checked;
		console.log('didAgreeToTerms:', didAgreeToTerms)

		if (hasElementError) {
			!didAgreeToTerms
				? fieldErrors.set('TermsAgreement', (element as HTMLInputElement), elementError, 'You must agree to the terms.')
				: fieldErrors.remove('TermsAgreement', (element as HTMLInputElement), elementError);
		}
	}


	/* ---------------------------- ALL INPUTS CHECKS --------------------------- */
	// Runs every times
	handleSubmitButton();
}
const handleOnSubmit = (event): void => {
	console.log('submit', event.target.value)
}

const getHandler = (element): void => {
	const elementsDetails = [
		['email', handleChange],
		['password', handleChange],
		['checkbox', handleChange],
		['submit', handleOnSubmit],
	];
	elementsDetails.forEach(([type, handler]) => {
		const event = element.type === 'submit' ? 'click' : 'change';
		if (element.type === type) {
			element.addEventListener(event, handler);
		}
	})
}

// Assign event dynamically for each element
formElements.forEach(getHandler);