import { checkEmailRules } from "../shared/email-rules";
import { checkPasswordRules } from "../shared/password-rules";
import { FieldErrors } from "./fields-error";


/* --------------------------------- ELEMENTS --------------------------------- */
const formElements = [
	document.querySelector('#email'),
	document.querySelector('#password'),
	document.querySelector('#form-submit')
];

const fieldErrors = new FieldErrors();


const handleChange = (event): void => {
	const element: HTMLInputElement = event.target;
	const elementType = element.type;
	const elementValue = element.value;


	const handleSubmitButton = (): void => {
		const button = document.querySelector('#form-submit');
		//  check all fields not empty
		const allHasValues = formElements.slice(0, 2).every(element => (element as HTMLInputElement).value)

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
			fieldErrors.set('EmailPattern', element, elementError, 'Email address must use format: name@example.com');
		}

		if (isConditionMet && hasElementError) {
			fieldErrors.remove('EmailPattern', element, elementError)
		}

	}

	/* -------------------------- PASSWORD REQUIREMENTS ------------------------- */

	if (elementType === 'password') {
		const elementError: HTMLElement | null = document.querySelector('#invalid-password');
		const hasElementError = elementError !== null;
		const isConditionMet = checkPasswordRules(elementValue);

		if (!isConditionMet && hasElementError) {
			fieldErrors.set('PasswordLength', element, elementError, 'Password must be at least 8 characters.');
		}

		if (isConditionMet && hasElementError) {
			fieldErrors.remove('PasswordLength', element, elementError)
		}
	}


	/* ---------------------------- BOTH INPUT CHECKS --------------------------- */
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

// const handler;