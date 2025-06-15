import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { OrderStatus } from '@/lib/generated/prisma';
export const dynamic = 'force-dynamic'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: params.id },
            include: { OrderItem: true }
        });

        const orderItems = await prisma.orderItem.findMany({
            where: { orderId: params.id },
            include: { menuItem: true }
        });

        const totalSum = orderItems.reduce((sum, item) => sum + item.quantity * item.menuItem.price, 0);
        const menuItems = orderItems.map(item => { return { name: item.menuItem.name, price: item.menuItem.price, quantity: item.quantity } }) // Assuming you want to return menu items in some format

        if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

        return NextResponse.json({ order, totalSum, menuItems })
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json()

        const { status } = body

        if (!status || !Object.values(OrderStatus).includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
        }

        const updatedOrder = await prisma.order.update({
            where: { id: params.id },
            data: {
                status,
            },
            include: { OrderItem: true }
        })

        return NextResponse.json(updatedOrder)
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Could not update order', obj: err }, { status: 500 })
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
