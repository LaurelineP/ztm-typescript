
import type { HashedPassword } from "./auth";


export interface User {
	id: number;
	email: string;
	hashedPassword: HashedPassword;
	didAgreeToTerms: boolean;
}

export interface Session {
	id: number;
	userId: number;
	sessionId: string;
}

export interface UserRepository {
	// create a user
	create(user: User): Promise<User>;

	// find user by existing email
	findByEmail(email: string): Promise<User | undefined>;

	// get a given user by its it
	get(userId: number): Promise<User | undefined>;
}


export interface SessionRepository {
	create(userId: number): Promise<string>;
	get(sessionId: string): Promise<User | undefined>;
}
