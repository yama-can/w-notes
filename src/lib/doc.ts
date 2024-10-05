import { sql } from "@/components/sql";
import { RowDataPacket } from "mysql2";

export default async function getDoc(id: string) {

	const [result] = await sql.query<RowDataPacket[]>("SELECT * FROM docs WHERE id = ?", [id]);

	if (result.length == 0) {

		return undefined;

	}

	return {
		title: result[0].title,
		id: result[0].id,
		date: new Date(result[0].date).getTime(),
		author: result[0].author,
		data: result[0].data,
		meta: JSON.parse(result[0].meta) as { key: string, value: string }[],
		department: result[0].department
	};

}

export async function getDocs() {

	const [result] = await sql.query<RowDataPacket[]>("SELECT id FROM docs");

	return Promise.all(result.map((doc) => getDoc(doc.id).then((doc) => doc!!)));


}