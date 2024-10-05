import getUser from "@/lib/user";

export default async function User({ children }: { children: string }) {

	const user = await getUser(children);

	if (!user) {

		return <>Unknown ({children})</>

	}

	return (
		<a href={`/user/${user.username}`}>{user.nickname}</a>
	);

}
