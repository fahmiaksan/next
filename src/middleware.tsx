import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Jika user sudah login, redirect dari /login & /register ke /
  if (token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Jika user belum login, redirect dari /dashboard/* ke /login
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Lanjutkan request jika tidak ada aturan yang dilanggar
}

// Konfigurasi middleware untuk diterapkan pada route tertentu
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
