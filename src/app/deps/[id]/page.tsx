import Dep from "@/components/dep";
import Doc from "@/components/doc";
import User from "@/components/user";
import AuthUser, { Permission, PermissionID } from "@/lib/auth";
import getDep from "@/lib/dep";
import { getDocs } from "@/lib/doc";
import { notFound } from "next/navigation";

export default async function Deps({ params: { id } }: { params: { id: string } }) {

	await AuthUser(PermissionID[Permission.Read]);

	const dep = await getDep(id);

	const docs = (await getDocs()).filter((doc) => doc && doc.department == id);

	if (!dep) notFound();

	return (
		<div>

			<h1>{dep.name}</h1>
			<p>{dep.description}</p>
			<p>親部門：<Dep>{dep.parent || "N/A"}</Dep></p>
			<p>リーダー：<User>{dep.leader}</User></p>

			<h2>メンバー</h2>

			<ul>

				{

					dep.members.map((member: string, i: number) => (
						<li key={i}><User>{member}</User></li>
					))

				}

			</ul>

			<h2>作成した書類</h2>

			<ul>

				{

					docs.map(({ id }, i: number) => (
						<li key={i}><Doc>{id}</Doc></li>
					))

				}

			</ul>

		</div>
	)

}
