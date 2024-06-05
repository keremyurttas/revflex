import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/user", "/liked", "/rated"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwtToken");
  // if (!token) {
  //   return NextResponse.redirect("http://localhost:3000/");
  // }

  return NextResponse.next();
}
