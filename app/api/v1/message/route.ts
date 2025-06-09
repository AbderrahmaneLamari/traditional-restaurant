import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const messages = await prisma.message.findMany({
        where: { archived: false },
        include: { replies: true },
        orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(messages)
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { firstname, lastname, location, content, email_sender } = body

    const message = await prisma.message.create({
        data: { firstname, lastname, location, content, email_sender }
    })

    return NextResponse.json(message, { status: 201 })
}
