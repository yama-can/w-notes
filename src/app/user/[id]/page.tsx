import Dep from "@/components/dep";
import Doc from "@/components/doc";
import AuthUser, { Permission, PermissionID } from "@/lib/auth";
import { getDeps } from "@/lib/dep";
import { getDocs } from "@/lib/doc";
import getUser from "@/lib/user";
import { notFound } from "next/navigation";

export default async function User({ params: { id } }: { params: { id: string } }) {

	await AuthUser(PermissionID[Permission.Read]);

	const user = await getUser(id);

	if (!user) notFound();

	const deps = (await getDeps()).filter((dep) => dep && dep.members.includes(user.username));
	const docs = (await getDocs()).filter((doc) => doc && doc.author == user.username);

	return (
		<div>

			<h1>{user.nickname} ({user.username})</h1>

			<p>{user.description}</p>

			<h2>所属部門</h2>

			<ul>

				{

					deps.map((dep, i) => (
						<li key={i}><Dep>{dep!!.id}</Dep></li>
					))

				}

			</ul>

			<h2>作成した書類</h2>

			<ul>

				{

					docs.map((doc, i) => (
						<li key={i}><Doc>{doc!!.id}</Doc></li>
					))

				}

			</ul>

		</div>
	)

}
