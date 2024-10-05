import style from "./page.module.scss";

import Markdown from "@/components/markdown";
import getDoc from "@/lib/doc";
import User from "@/components/user";
import { getCurrentUser } from "@/lib/user";
import Dep from "@/components/dep";
import AuthUser, { Permission, PermissionID } from "@/lib/auth";

export default async function Viewer({ params: { id } }: { params: { id: string } }) {

	await AuthUser(PermissionID[Permission.Read]);

	const doc = (await getDoc(id))!!;

	const user = (await getCurrentUser())!!;

	return (
		<div className={style.report}>

			{
				user.username == doc.author ?
					<>
						<a href={`/view/${id}/edit`}>編集</a>
						<a href={`/view/${id}/delete`}>削除</a>
					</>
					: <></>
			}

			<h1>{doc.title}</h1>

			<div className={style.meta}>

				番号：{doc.id} <br />
				作者：<User>{doc.author}</User> <br />
				部門：<Dep>{doc.department || "N/A"}</Dep> <br />
				日時：{new Date(doc.date).toLocaleString("ja-jp")} <br />

				{

					doc.meta.length ?

						<table>

							<thead>

								<tr>

									{
										doc.meta.map(({ key, value }, i) => (
											<th key={i}>{key}</th>
										))
									}

								</tr>

							</thead>

							<tbody>

								<tr>

									{
										doc.meta.map(({ key, value }, i) => (
											<td key={i}>{value}</td>
										))
									}

								</tr>

							</tbody>

						</table>

						: <></>

				}

			</div>

			<Markdown>{doc.data}</Markdown>

		</div>
	)

}
