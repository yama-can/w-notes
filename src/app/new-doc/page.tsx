import AuthUser, { Permission, PermissionID } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewDoc() {

	await AuthUser(PermissionID[Permission.Read]);

	async function action(form: FormData) {

		"use server";

		const id = form.get("id");

		if (typeof id == "string" && id.toString().match(/^[a-zA-Z0-9\-]*$/) && id.toString().length >= 6) {

			redirect(`/view/${id}/edit`);

		} else {

			cookies().set("FLUSH", JSON.stringify({ type: "error", message: "IDは半角英数字とハイフンのみ使用できます。また、文字数は6文字以上にしてください。" }));
			redirect("/new-doc");

		}

	}

	return (
		<form action={action}>

			<label htmlFor="id">IDを指定</label>

			<input type="text" name="id" />

			<button type="submit">作成</button>

		</form>
	)

}