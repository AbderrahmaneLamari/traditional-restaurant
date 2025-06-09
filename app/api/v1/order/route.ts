import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateOrderPayload } from '@/lib/validators'

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: { items: true }
        })
        return NextResponse.json(orders)
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { valid, message } = validateOrderPayload(body)

        if (!valid) return NextResponse.json({ error: message }, { status: 400 })

        const { email, table_num, status, items } = body

        const newOrder = await prisma.order.create({
            data: {
                email,
                table_num,
                status,
                items: {
                    connect: items.map((id: string) => ({ id }))
                }
            },
            include: { items: true }
        })

        return NextResponse.json(newOrder, { status: 201 })
    } catch {
        return NextResponse.json({ error: 'Could not create order' }, { status: 500 })
    }
}
