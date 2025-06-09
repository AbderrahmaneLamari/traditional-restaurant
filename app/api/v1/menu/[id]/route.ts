import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    const item = await prisma.menuItem.findUnique({
        where: { id: params.id },
        include: { specials: true }
    })
    if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    return NextResponse.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json()
    const { name, price, specials } = body

    // Optional: Remove old specials before updating (to reset)
    await prisma.itemSpecial.deleteMany({ where: { menuItemId: params.id } })

    const updated = await prisma.menuItem.update({
        where: { id: params.id },
        data: {
            name,
            price,
            specials: specials?.map((type: string) => ({
                create: { type }
            }))
        },
        include: { specials: true }
    })

    return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    await prisma.menuItem.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Deleted' })
}
