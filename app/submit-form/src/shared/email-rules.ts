export const checkEmailRules = (email: string): boolean => {
	const emailPattern = /^\w+@\w+\.\w{2,3}$/;
	const isConditionMet = emailPattern.test(email);
	return isConditionMet;
}