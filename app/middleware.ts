// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "../lib/auth";

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    // You might have different authentication requirements for API routes vs. pages.
    // For API routes, you might want to return a JSON error instead of redirecting.
    if (!session) {
        // For API requests, return a 401 Unauthorized response
        return new NextResponse(
            JSON.stringify({ success: false, message: 'authentication failed' }),
            { status: 401, headers: { 'content-type': 'application/json' } }
        );
    }

    return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  // This matcher will apply the middleware to all API routes
  matcher: ["/api/:path*"], // Matches /api, /api/users, /api/products/123, etc.
};