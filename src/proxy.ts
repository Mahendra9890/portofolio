import { NextResponse, type NextRequest } from "next/server";
import { portfolioData } from "@/data/portfolio";

const locales = new Set(["id", "en"]);
const slugs = new Set(portfolioData.projects.map((project) => project.slug));

// With Cache Components, notFound() inside a streamed page still answers 200.
// Rejecting unknown locales and project slugs here returns a real 404 status.
function isKnownPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return true;
  if (parts.length === 2 && parts[0] === "projects") return slugs.has(parts[1]);
  if (!locales.has(parts[0])) return false;
  if (parts.length === 1) return true;
  return parts.length === 3 && parts[1] === "projects" && slugs.has(parts[2]);
}

export function proxy(request: NextRequest) {
  if (isKnownPath(request.nextUrl.pathname)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
}

export const config = {
  matcher: ["/((?!_next/|images/|docs/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
