import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  /**
   * Redirect to login page if the user is not authenticated
   * Protect Dashboard route
   */
  if (path.startsWith("/admin/dashboard")) {
    const session_name = process.env.SESSION_NAME || "app_token";
    const authToken = request.cookies.get(session_name)?.value;

    if (!authToken || authToken.length <= 0) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  /**
   * Redirect to dashboard if the user is authenticated
   * Protect Login route
   */
  if (path.startsWith("/auth")) {
    const session_name = process.env.SESSION_NAME || "app_token";
    const authToken = request.cookies.get(session_name)?.value;

    // Delete the cookie if the user is unauthorized
    if (request.nextUrl.searchParams.get("error") === "unauthorized") {
      await cookies().then((cookies) => {
        cookies.delete(session_name);
      });

      return NextResponse.next();
    }

    if (authToken && authToken.length > 0) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*", "/auth/:path*"],
};
