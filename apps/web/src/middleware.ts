import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

interface Routes {
  path: string;
  whenAuthenticated?: 'redirect' | 'next';
}

const publicRoutes: Routes[] = [
  { path: '/auth/login', whenAuthenticated: 'redirect' },
  { path: '/auth/signup', whenAuthenticated: 'redirect' },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/auth/login';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const sessionToken = request.cookies.get('session_token');

  if (!sessionToken && publicRoute) {
    return NextResponse.next();
  }

  if (!sessionToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    sessionToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  if (sessionToken && !publicRoute) {
    // Here you can add logic to check if the session is valid, e.g., by decoding the token
    // For now, we assume the session is valid if the token exists.
    // If you have a function to validate the session, you can call it here.
    // Example: const isValidSession = validateSession(sessionToken);

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
