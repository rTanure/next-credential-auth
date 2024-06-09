import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "@/lib/get-url";

export default function Middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");
  const pathname = request.nextUrl.pathname;

  if(pathname === "/login" && token) {
    return NextResponse.redirect(new URL(getUrl("/admin")));
  }

  if(pathname.includes("/admin") && !token) {
    console.log("URL: ", new URL(getUrl("/login")))
    return NextResponse.redirect(new URL(getUrl("/login")));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}