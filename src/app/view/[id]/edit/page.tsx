import getDoc from "@/lib/doc";
import Editor from "./editor";
import { sql } from "@/components/sql";
import { getCurrentUser } from "@/lib/user";
import { notFound, redirect } from "next/navigation";
import { getDeps } from "@/lib/dep";
import { cookies } from "next/headers";

export default async function EditorPage({ params: { id } }: { params: { id: string } }) {

	const doc = await getDoc(id);

	const user = await getCurrentUser();

	if (!user || (doc && user.username != doc.author)) {

		return notFound();

	}

	const deps = (await getDeps()).filter((dep) => dep.members.includes(user.username));

	const create = !doc;

	if (create && (!id.toString().match(/^[A-Z0-9\-]*$/) || id.toString().length < 6)) {

		notFound();

	}

	async function action(form: FormData) {

		"use server";

		const title = form.get("title") as string;
		const data = form.get("data") as string;
		const department = form.get("department") as string;

		if (typeof title != "string" || !data || !department) {

			cookies().set("FLUSH", JSON.stringify({ type: "error", message: "入力内容に誤りがあります" }));

			redirect(`/view/${id}/edit`);

		}

		if (create) {

			await sql.query("INSERT INTO docs (id, title, author, date, data, meta, department) VALUES (?, ?, ?, ?, ?, ?, ?)", [id, title, user?.username, Date.now(), data, "[]", department == "N/A" ? null : department]);

		} else {

			await sql.query("UPDATE docs SET title = ?, data = ?, department = ? WHERE id = ?", [title, data, department, id]);

		}

		redirect(`/view/${id}`);

	}

	return (
		<>

			<form action={action}>

				<input type="text" name="title" defaultValue={doc?.title} />

				<select name="department" defaultValue={doc?.department || "N/A"}>

					<option value="N/A">N/A</option>

					{

						deps.map((dep, i) => (
							<option key={i} value={dep.id}>{dep.name}</option>
						))

					}

				</select>

				<Editor data={doc?.data} />

				<button type="submit">{create ? "Create" : "Update"}</button>

			</form>

		</>
	)

}