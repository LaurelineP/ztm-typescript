
// Encapsulating all error in a form
export class FieldErrors {
	errors: Set<string> = new Set();

	// Set in the DOM the error style and message
	set(errorKey: string, input: HTMLInputElement, labelError: HTMLElement, labelErrorText: string): void {
		// Error on input should have the red border
		input.classList.add('input-error');

		// Error on label should be visible with the error message
		labelError.classList.remove('hidden');
		labelError.innerText = labelErrorText;

		// Store the error key
		this.errors.add(errorKey);
	}

	// Remove the error style and message
	remove(errKey: string, input: HTMLInputElement, labelError: HTMLElement): void {
		// Remove the input red border
		input.classList.remove('input-error');

		// Hide the error message in from
		labelError.classList.add('hidden');

		labelError.innerText = '';

		// Remove the error key
		this.errors.delete(errKey);
	}

	public hasNoErrors(): boolean {
		return this.errors.size === 0;
	}
}