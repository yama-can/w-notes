import getUser from "@/lib/user";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login({ searchParams: { redirect: redirect_to, error } }: { searchParams: { redirect?: string, error?: string } }) {

	async function action(formData: FormData) {

		"use server";

		if (typeof formData.get("username") != "string" || typeof formData.get("password") != "string") {

			return;

		}

		const user = await getUser(formData.get("username") as string);

		const hashedPassword = crypto.createHash("sha256").update(formData.get("password") as string).digest("hex");

		if (hashedPassword != user?.password) {

			redirect("?error");

		} else {

			const hashedHashedPassword = crypto.createHash("sha256").update(hashedPassword).digest("hex");

			cookies().set("dw", Buffer.from(`${user.username},${hashedHashedPassword}`).toString("base64"));
			cookies().set("FLUSH", JSON.stringify({ type: "success", message: "ログインしました" }));
			cookies().delete("redirect");

			if (cookies().has("redirect")) {

				redirect(new URL(cookies().get("redirect")!!.value || "/", "https://localhost").pathname);

			} else {

				redirect("/");

			}

		}

	}

	if (redirect_to) {

		cookies().set("redirect", redirect_to);

	}

	return (
		<form action={action}>

			<label htmlFor="username">ユーザー名</label>

			<br />

			<input type="text" id="username" name="username" />

			<br />

			<label htmlFor="password">パスワード</label>

			<br />

			<input type="password" id="password" name="password" autoComplete="current-password" />

			<br />

			<input type="submit" value="ログイン" />

		</form>
	)

}