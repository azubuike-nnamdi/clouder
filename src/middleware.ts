import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  authRoutes,
  basicRoutes,
  DASHBOARD_URL,
  infiniteRoutes,
  LOGIN_URL,
  premiumRoutes,
  protectedRoutes,
  publicRoutes,
  trialRoutes,
} from "./config/route";
import { PlanType } from "./utils/types";

const accessRoutes = {
  trial: trialRoutes,
  basic: basicRoutes,
  premium: premiumRoutes,
  infinite: infiniteRoutes,
};

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("token")?.value;
  const plan = parsePlanCookie(request);
  const route = request.nextUrl.pathname;

  if (shouldIgnoreUrl(route)) {
    return NextResponse.next();
  }

  if (!currentUser && protectedRoutes.includes(route)) {
    return redirectToLogin(request);
  }

  if (
    currentUser &&
    (authRoutes.includes(route) || publicRoutes.includes(route))
  ) {
    return redirectToDashboard(request);
  }

  if (currentUser && plan) {
    const userAccessRoutes = accessRoutes[plan];

    if (!userAccessRoutes.includes(route)) {
      return redirectToDashboardWithMessage(request);
    }
  }
}

function parsePlanCookie(request: NextRequest): PlanType | null {
  let plan = request.cookies.get("plan")?.value;

  if (plan && plan.startsWith('"') && plan.endsWith('"')) {
    plan = JSON.parse(plan);
  }

  return plan?.trim() as PlanType | null;
}

function shouldIgnoreUrl(url: string): boolean {
  const ignoredExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".css",
    ".js",
    ".ico",
    ".json",
  ];
  return ignoredExtensions.some((ext) => url.endsWith(ext));
}

function redirectToLogin(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL(LOGIN_URL, request.url));
  response.cookies.delete("token");
  response.cookies.delete("plan");
  response.cookies.delete("role");
  response.cookies.delete("refreshToken");

  return response;
}

function redirectToDashboard(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
}

function redirectToDashboardWithMessage(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
  response.cookies.set(
    "message",
    "You do not have access to this plan. Please update your plan.",
  );
  return response;
}
