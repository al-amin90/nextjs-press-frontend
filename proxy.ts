import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "news", "/login", "/register"];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  console.log("proxy", pathName);

  const cookieStore = await cookies();
  //   const accessToken = cookieStore.get("accessToken")?.value;

  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN as string)
    : null;

  console.log("decodedToken", decodedToken);

  let userRole = null;

  if (!decodedToken?.success) {
    // token has expired
    cookieStore.delete("accessToken");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (decodedToken?.success && decodedToken.data) {
    userRole = (decodedToken.data as JwtPayload).role;
  }

  console.log("userRole", userRole);

  if (accessToken && AUTH_ROUTES.includes(pathName)) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => route === pathName || pathName.startsWith(route + "/"),
  );

  if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   authorization
  if (pathName.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathName.startsWith("/admin-dashboard") && userRole === "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathName.startsWith("/author-dashboard") &&
    userRole === "AUTHOR"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();

  //   return NextResponse.redirect(new URL("/", request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // "/dashboard/:path*",
    // "/admin-dashboard/:path*",
    // "/author-dashboard/:path*",

    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};
