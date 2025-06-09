import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';
const auth_cookie_name = process.env.AUTH_COOKIE_NAME || 'auth_token';

export async function GET(request: NextRequest) {
    const token = request.cookies.get(auth_cookie_name)?.value ||
        request.headers.get('authorization')?.split(' ')[1]

    if (!token) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return NextResponse.json({ authenticated: true, user: decoded }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 })
    }
}
