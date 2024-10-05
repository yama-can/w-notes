import getDoc from "@/lib/doc";
import { sql } from "@/components/sql";
import { getCurrentUser } from "@/lib/user";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function EditorPage({ params: { id } }: { params: { id: string } }) {

	const doc = await getDoc(id);

	const user = await getCurrentUser();

	if (!user || !doc || user.username != doc.author) {

		return notFound();

	}

	async function action(form: FormData) {

		"use server";

		await sql.query("DELETE FROM docs WHERE id = ?", [id]);

		cookies().set("FLUSH", JSON.stringify({ type: "success", message: "ドキュメントを削除しました" }));

		redirect(`/view`);

	}

	return (
		<>

			<form action={action}>

				<label htmlFor="check">本当にこのドキュメント「{doc.title}」削除しますか？</label>

				<button type="submit">削除</button>

			</form>

		</>
	)

}