import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers.get("host") || "localhost:3000";

  const path = url.pathname;

  const currentHost = hostname.replace(`.localhost:3000`, "");

  // Supabase session
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // console.log("----> middleware.ts session");
  // console.log(session);
  // console.log("<----");

  // rewrites for app pages
  if (currentHost == "app") {
    if (!session && url.pathname === "/") {
      url.pathname = `/login`;
      return NextResponse.redirect(url);
    }

    if (session && url.pathname === "/login") {
      url.pathname = `/`;
      return NextResponse.redirect(url);
    }

    // url.pathname = `/app${url.pathname}`;
    // return NextResponse.rewrite(url);
    return res;
  }

  if (hostname === "localhost:3000") {
    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
  }

  return NextResponse.rewrite(new URL(`/sites/${currentHost}${path}`, req.url));
}
