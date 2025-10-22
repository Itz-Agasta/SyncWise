import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const protectedRoutes = ["/dashboard", "/settings"]
const authRoutes = ["/auth/login", "/auth/signup"]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // TODO: Check if user is authenticated (implement with Better Auth)
  // For now, allow all routes
  const isAuthenticated = true

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
