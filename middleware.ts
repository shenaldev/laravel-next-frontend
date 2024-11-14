import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin/dashboard")) {
    const session_name = process.env.SESSION_NAME || "shenaldev_session";
    const authToken = request.cookies.get(session_name)?.value;

    if (!authToken || authToken.length <= 0) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*"],
};
