import { randomUUID } from "crypto";
import { connect } from "react-redux";
import { SqliteUserRepository } from "./db";
import { accountCreateRequestSchema } from "./schemas.zod";
import { USERS_DB } from "./server";
import type { AccountCreateRequest } from "./schemas.zod";

// export const handleSignup = async (payload): Promise<void> => {


// 	let requestData: AccountCreateRequest;
// 	try {
// 		requestData: accountCreateRequestSchema.parse(payload);

// 		const db = await connect(USERS_DB);
// 		const userRepository = new SqliteUserRepository(db);

// 		// TODO: hash password

// 		// 
// 		const newUser = {
// 			id: randomUUID(),
// 			...requestData,
// 			didAgreeToTerms: true,
// 		}
// 		userRepository.create(requestData);
// 	} catch (e) {
// 		console.log(e);
// 		return;
// 	}

// }