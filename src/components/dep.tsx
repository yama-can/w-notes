import getDep from "@/lib/dep";

export default async function Dep({ children }: { children: string }) {

	const dep = await getDep(children);

	if (!dep) {

		return <>Unknown ({children})</>

	}

	return (
		<a href={`/deps/${dep.id}`}>{dep.name}</a>
	)

}
