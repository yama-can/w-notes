import Dep from "@/components/dep";
import User from "@/components/user";
import AuthUser, { Permission, PermissionID } from "@/lib/auth";
import { getDeps } from "@/lib/dep";

export default async function DepsPage() {

	await AuthUser(PermissionID[Permission.Read]);

	const deps = await getDeps();

	return (
		<div>

			<h1>部門一覧</h1>

			{

				deps.map((dep, i) =>
					<div key={i}>
						<h2><Dep>{dep.id}</Dep></h2>
						<p>{dep.description}</p>
						<p>親部門：<Dep>{dep.parent || "N/A"}</Dep></p>
						<p>リーダー：<User>{dep.leader}</User></p>
						<h3>メンバー</h3>
						<ul>
							{
								dep.members.map((member: string, i: number) =>
									<li key={i}><User>{member}</User></li>
								)
							}
						</ul>
					</div>
				)

			}

		</div>
	)

}