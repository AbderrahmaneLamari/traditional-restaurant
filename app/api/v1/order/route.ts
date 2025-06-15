import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateOrderPayload } from '@/lib/validators'
import { OrderStatus } from '@/lib/generated/prisma'

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: {
                    in: [OrderStatus.PENDING,  OrderStatus.PREPARING, OrderStatus.COMPLETED], // Adjust based on your enum values
                },
            },
            include: {
                OrderItem: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        })

        const mappedOrders = orders.map((order) => {
            const items = order.OrderItem.map((item) => ({
                name: item.menuItem.name,
                quantity: item.quantity,
                price: item.menuItem.price,
            }))

            const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

            return {
                id: order.id,
                customerName: '', // Not available in model, set empty or fetch if needed
                customerPhone: order.phone,
                customerEmail: order.email,
                items,
                total,
                status: order.status.toLowerCase(), // assuming status is an enum like OrderStatus
                type: order.table_num ? 'pickup' : 'delivery', // inference based on table_num
                address: '', // Not available, set empty or fetch if needed
                orderTime: order.createdAt.toISOString(),
                estimatedTime: undefined, // Optional, set if you have logic for this
            }
        })

        return NextResponse.json(mappedOrders)
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { valid, message } = validateOrderPayload(body)
        if (!valid) return NextResponse.json({ error: message }, { status: 400 })

        // Destructure the body to get the required fields
        const { email, table_num, status, items, phone } = body

        const newOrder = await prisma.order.create({
            data: {
                email,
                table_num,
                status,
                phone,
                OrderItem: {
                    create: items.map((item: { menuItemId: string; quantity: number }) => ({
                        menuItemId: String(item.menuItemId), // Ensure it's a string
                        quantity: item.quantity || 1
                    }))
                }
            },
            include: {
                OrderItem: {
                    include: {
                        menuItem: true
                    }
                }
            }
        })

        return NextResponse.json(newOrder, { status: 201 })
    } catch (error) {
        console.error('Order creation error:', error)
        return NextResponse.json({ error: 'Could not create order' }, { status: 500 })
    }
}