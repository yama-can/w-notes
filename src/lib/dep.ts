import { RowDataPacket } from "mysql2";
import { sql } from "@/components/sql";

export default async function getDep(id: string) {

	const [result] = await sql.query<RowDataPacket[]>("SELECT * FROM departments WHERE id = ?", [id]);

	if (result.length == 0) {

		return undefined;

	}

	return {
		id: result[0].id,
		name: result[0].name,
		description: result[0].description,
		parent: result[0].parent,
		leader: result[0].leader,
		members: JSON.parse(result[0].members) as string[]
	};

}

export async function getDeps() {

	const [result] = await sql.query<RowDataPacket[]>("SELECT id FROM departments");

	return Promise.all(result.map((dep) => getDep(dep.id).then((dep) => dep!!)));

}