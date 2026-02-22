import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    // Public paths that don't require authentication
    const publicPaths = ['/login'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    // Check if user has auth cookie (Firebase sets this)
    // Note: This is a basic check. Firebase auth state is fully validated on the client
    const hasAuthCookie = request.cookies.has('__session') ||
        request.cookies.has('firebase-auth-token');

    // If trying to access login while authenticated, redirect to home
    if (isPublicPath && hasAuthCookie) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow public paths
    if (isPublicPath) {
        return NextResponse.next();
    }

    // For protected routes, let the client-side auth handle it
    // The AuthContext will redirect to /login if not authenticated
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};