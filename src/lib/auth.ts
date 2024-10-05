import { notFound } from "next/navigation";
import { getCurrentUser, User } from "./user";

export enum Permission {

	Read,
	Write,
	Admin,

};

export const PermissionID = {
	[Permission.Read]: 0b001n,
	[Permission.Write]: 0b010n,
	[Permission.Admin]: 0b100n,
}

export default async function AuthUser(permission: bigint) {

	"use server";

	const user = await getCurrentUser();

	if (!user || (user.permission & permission) == 0n) {

		notFound();

	}

}
