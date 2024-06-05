import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/user", "/liked", "/rated"],
};

export function middleware(req: NextRequest) {
  console.log("Request headers:", req.headers);
  const token = req.cookies.get("jwt");
  console.log("Middleware check: JWT token", token);

  // if (!token) {
  //   const redirectUrl =
  //     process.env.NODE_ENV === "production"
  //       ? "https://revflix.vercel.app/"
  //       : "http://localhost:3000/";
  //   // console.log("No token found, redirecting to login page");
  //   return NextResponse.redirect(redirectUrl);
  // }

  // console.log("Token found, proceeding to the requested page");
  return NextResponse.next();
}
