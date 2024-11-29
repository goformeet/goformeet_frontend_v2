import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin"];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the current path starts with any of the protected routes
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname !== "/admin/login" && pathname.startsWith(route)
  );

  // Check for an authentication token in the cookies
  const authToken = req.cookies.get("adminToken");

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }

  return NextResponse.next();
}