import { FieldErrors } from "./fields-error";

console.log('coucou')

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
	console.log('elementValue:', elementValue)


	const handleSubmitButton = (): void => {
		const button = document.querySelector('#form-submit');
		console.log('fieldErrors.hasNoErrors():', fieldErrors.hasNoErrors())
		if (fieldErrors.hasNoErrors()) {
			button?.classList.remove('btn-disabled');
		} else {
			button?.classList.add('btn-disabled');
		}
	}

	/* --------------------------- EMAIL REQUIREMENTS --------------------------- */
	if (elementType === 'email') {
		// value
		const emailPattern = /^\w+@\w+\.\w{2,3}$/;
		const isConditionMet = emailPattern.test(elementValue);
		console.log('isConditionMet:', isConditionMet)

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
		const isConditionMet = elementValue.length >= 8;

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
	console.log('submit')
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