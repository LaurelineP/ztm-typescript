export const sum = (n1: number, n2: number): number => {
	if([n1, n2].every(n => typeof n !== 'number' && !isNaN(n))){
		return NaN
	}

	return n1 + n2;
}