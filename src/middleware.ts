import type { NextRequest } from "next/server"
 
export function middleware(request: NextRequest) {
  const token = request.cookies.get("access")?.value
 
  // if (token && request.nextUrl.pathname.startsWith("/login")) {
  //   return Response.redirect(new URL("/", request.url))
  // }
 
  if (!token && request.nextUrl.pathname === '/google-auth/protected') {
    return Response.redirect(new URL("/google-auth", request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
