import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const auth_cookie_name = process.env.AUTH_COOKIE_NAME || 'auth_token';
    const token = request.cookies.get(auth_cookie_name)?.value
    const isLoggedIn = Boolean(token)

    const { pathname } = request.nextUrl

    // Protect dashboard routes
    if (!isLoggedIn) {
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin-no/:path*', '/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
}
