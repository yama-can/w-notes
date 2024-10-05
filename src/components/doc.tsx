import getDoc from "@/lib/doc";

export default async function Doc({ children }: { children: string }) {

	const user = await getDoc(children);

	if (!user) {

		return <>Unknown ({children})</>

	}

	return (
		<a href={`/view/${user.id}`}>{user.title}</a>
	);

}
