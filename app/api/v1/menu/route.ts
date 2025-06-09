import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all items
export async function GET() {
    const items = await prisma.menuItem.findMany({
        include: { specials: true }
    })
    return NextResponse.json(items)
}

// POST add new item
export async function POST(req: NextRequest) {
    const body = await req.json()
    const { name, price, specials } = body

    const item = await prisma.menuItem.create({
        data: {
            name,
            price,
            specials: specials?.map((type: string) => ({
                create: { type }
            }))
        }
    })

    return NextResponse.json(item, { status: 201 })
}
