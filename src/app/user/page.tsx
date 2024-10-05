import User from "@/components/user";
import AuthUser, { Permission, PermissionID } from "@/lib/auth";
import { getUsers } from "@/lib/user";

export default async function UsersPage() {

	await AuthUser(PermissionID[Permission.Read]);

	const users = await getUsers();

	return (
		<div>

			<h1>ユーザー一覧</h1>

			{

				users.map((user, i) =>
					<div key={i}>
						<h2><User>{user.username}</User></h2>
						<p>{user.description}</p>
					</div>
				)

			}

		</div>
	)

}