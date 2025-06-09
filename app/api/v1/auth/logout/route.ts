import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const auth_cookie_name = process.env.AUTH_COOKIE_NAME || 'auth_token'
    const response = NextResponse.json({ message: 'Logged out' })

    // Clear the token cookie by setting it to empty and expired
    response.cookies.set(auth_cookie_name, '', {
        httpOnly: true,
        secure: true,
        path: '/',
        expires: new Date(0),
    })

    return response
}
