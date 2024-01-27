// Using SQlite3 as database
import { AsyncDatabase } from "promised-sqlite3";
import { v4 as uuidv4 } from 'uuid';
import type { SessionRepository, User, UserRepository } from "./db.types";


/* -------------------------------------------------------------------------- */
/*                                    USER                                    */
/* -------------------------------------------------------------------------- */
/**
 * Using Repository pattern,
 * allows to do this following
 * implementation for different databases
 * ( here Sqlite: SqliteUserRepository, but could have been MySQL, Postgres ...)
 */
export class SqliteUserRepository implements UserRepository {
	constructor(private readonly db: AsyncDatabase) {
	}

	async create(user: User): Promise<User> {
		const userId: { id: number } = await this.db
			.get(
				"INSERT INTO users(email, password, didAgreeToTerms) VALUES(?, ?, ?) RETURNING id",
				[user.email, user.hashedPassword.hashed, user.didAgreeToTerms]
			);
		// returns the user with its id updated
		return {
			...user,
			id: userId.id
		};
	};

	async findByEmail(email: string): Promise<User | undefined> {
		return await this.db.get('SELECT * FROM users WHERE email = ?', email);
	};

	async get(userId: number): Promise<User | undefined> {
		return await this.db.get('SELECT * FROM users WHERE id = ?', userId);
	};
}


/* -------------------------------------------------------------------------- */
/*                                   SESSION                                  */
/* -------------------------------------------------------------------------- */

export class SqliteSessionRepository implements SessionRepository {
	constructor(private readonly db: AsyncDatabase) { }
	async create(userId: number): Promise<string> {
		const sessionId = uuidv4();
		await this.db.run('INSERT INTO sessions(session_id, user_id) VALUES(?,?)', [sessionId, userId]);
		return sessionId;
	};

	async get(sessionId: string): Promise<User | undefined> {
		const sessionUserId: { user_id: number } | undefined = await this.db.get(
			`SELECT user_id FROM sessions WHERE session_id = ?`,
			sessionId
		);

		if (sessionUserId === undefined) return;

		// Instantiate the user table
		const users = new SqliteUserRepository(this.db);
		return await users.get(sessionUserId.user_id);
	};
}


/* -------------------------------------------------------------------------- */
/*                                  DATABASE                                  */
/* -------------------------------------------------------------------------- */

export async function connect(connectionString: string): Promise<AsyncDatabase> {
	return await AsyncDatabase.open(connectionString);
}

export async function newDatabase(db: AsyncDatabase): Promise<void> {
	await db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY,
			email TEXT UNIQUE,
			hashedPassword TEXT NOT NULL,
			didAgreeToTerms BOOLEAN
		);
		CREATE TABLE IF NOT EXISTS sessions (
			session_id INTEGER PRIMARY KEY,
			user_id INTEGER NOT NULL,
			FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
		);
	`);
}