export const checkPasswordRules = (plainPassword: string): boolean => {
	const isConditionMet = plainPassword.length >= 8;
	return isConditionMet;
}