import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./actions/auth/session-action";



// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getSession();

  // current route
  const currentRoute = new URL(request.url).pathname; //  /login

  // cors ? 

  if (!session.isLoggedIn && !publicRoutes.includes(currentRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

}

const publicRoutes = ["/login"];

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};


