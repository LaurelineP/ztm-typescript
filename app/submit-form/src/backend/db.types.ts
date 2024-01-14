import { AsyncDatabase } from "promised-sqlite3";
import { v4 as uuidv4 } from 'uuid';


export interface User {
	id: number;
	email: string;
	// Never storing clear text passwords, always hashed
	hashedPassword: string;
	didAgreeToTerms: boolean;
}

// export interface UserSession {
// 	id: number;
// 	userId: number;
// 	user: User;
// }

// Repository are entity to query the database
/**
 * Repository pattern
 * 	- allowing to change data from database
 *  - allowing to test databases ( even different DBMS )
 */
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
