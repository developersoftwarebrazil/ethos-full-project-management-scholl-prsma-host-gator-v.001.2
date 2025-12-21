import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/list(.*)",
  "/dashboard(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();

  // 🔒 Não logado
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 🔑 Role vinda do Clerk
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // 🚫 Proteção de admin
  if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Aplica o middleware a todas as rotas,
     * exceto arquivos estáticos e _next
     */
    "/((?!_next|.*\\..*).*)",
  ],
};
