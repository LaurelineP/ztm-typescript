import bcrypt from 'bcrypt';

const salt = 10;

export class HashedPassword {
	constructor(readonly hashed: string) { }
}

export async function hashPassword(plainPassword: string): Promise<HashedPassword> {
	const hashedPassword: HashedPassword = await new Promise((resolve, reject) => {
		bcrypt.hash(plainPassword, salt, (err, hash) => {
			if (err !== undefined) reject(err);
			else { return resolve(new HashedPassword(hash)) };

		})
	})
	return hashedPassword;
}


export async function comparePassword(plainPassword: string, storedHashedPassword: HashedPassword): Promise<boolean> {
	return await new Promise((resolve, reject) => {
		bcrypt.compare(plainPassword, storedHashedPassword.hashed, (err, res) => {
			if (err !== undefined) reject(err);
			else { return resolve(res) };
		})
	})
}