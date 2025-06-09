import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateOrderPayload } from '@/lib/validators'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: params.id },
            include: { items: true }
        })

        if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        return NextResponse.json(order)
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json()
        const { valid, message } = validateOrderPayload(body)
        if (!valid) return NextResponse.json({ error: message }, { status: 400 })

        const { email, table_num, status, items } = body

        const updatedOrder = await prisma.order.update({
            where: { id: params.id },
            data: {
                email,
                table_num,
                status,
                items: {
                    set: [], // clear current items
                    connect: items.map((id: string) => ({ id }))
                }
            },
            include: { items: true }
        })

        return NextResponse.json(updatedOrder)
    } catch {
        return NextResponse.json({ error: 'Could not update order' }, { status: 500 })
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.order.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Order deleted' })
    } catch {
        return NextResponse.json({ error: 'Could not delete order' }, { status: 500 })
    }
}
