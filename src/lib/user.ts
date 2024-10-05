import { sql } from "@/components/sql";
import { RowDataPacket } from "mysql2";
import { cookies } from "next/headers";
import crypto from "crypto";

export interface User {

	username: string;
	description: string;
	nickname: string;
	password: string;
	permission: bigint;

}

export default async function getUser(id: string) {

	const [result] = await sql.query<RowDataPacket[]>("SELECT * FROM users WHERE username = ?", [id]);

	if (result.length == 0) {

		return undefined;

	}

	return {
		username: result[0].username,
		description: result[0].description,
		nickname: result[0].nickname,
		password: result[0].password,
		permission: BigInt(result[0].permission),
	}

}

export async function getUsers() {

	const [result] = await sql.query<RowDataPacket[]>("SELECT * FROM users");

	return Promise.all(result.map((user) => getUser(user.username).then((user) => user!!)));

}

export async function getCurrentUser() {

	const cookie = Buffer.from(cookies().get("dw")?.value || "", "base64").toString("utf-8");

	const user = await getUser(cookie.split(",")[0]);

	if (!user || crypto.createHash("sha256").update(user.password).digest("hex") != cookie.split(",")[1]) {

		return undefined;

	}

	return user;

}