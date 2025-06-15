
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
    return NextResponse.json({ message: "Hello from the API main route!" });
}