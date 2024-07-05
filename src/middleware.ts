import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  headers.set("x-current-pathname", request.nextUrl.pathname);
  headers.set(
    "x-current-search-params",
    request.nextUrl.searchParams.toString()
  );

  /* TEMP FIX FOR SERVER ACTIONS RETURNING UNDEFINED WHEN CUSTOM HEADERS ARE PASSED IN MIDDLEWARE */
  if (process.env.NODE_ENV === "development") {
    // this only occurs during development
    if (headers.get("accept") === "text/x-component") {
      headers.set("content-type", "text/x-component");
    }
  }
  /**************/

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
