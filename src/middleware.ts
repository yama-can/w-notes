import { NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: ['/:path*'],
}

export function middleware(req: NextRequest) {

	const res = NextResponse.next();

	res.headers.set("set-cookie", "FLUSH=1; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=0");

	return res;

}