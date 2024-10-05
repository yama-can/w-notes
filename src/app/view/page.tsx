import Dep from "@/components/dep";
import Doc from "@/components/doc";
import User from "@/components/user";
import AuthUser, { Permission, PermissionID } from "@/lib/auth";
import { getDocs } from "@/lib/doc";

export default async function DocsPage() {

	await AuthUser(PermissionID[Permission.Read]);

	const docs = await getDocs();

	return (
		<div>

			<h1>書類一覧</h1>

			<p><a href="/new-doc">新しく作成</a></p>

			{

				docs.map((doc, i) =>
					<div key={i}>
						<h2><Doc>{doc.id}</Doc></h2>
						<p>日時：{new Date(doc.date).toLocaleString("ja-jp")}</p>
						<p>著者：<User>{doc.author}</User></p>
						<p>部門：<Dep>{doc.department || "N/A"}</Dep></p>
					</div>
				)

			}

		</div>
	)

}