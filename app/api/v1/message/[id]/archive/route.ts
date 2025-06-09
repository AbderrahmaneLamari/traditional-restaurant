import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(_: NextRequest, { params }: { params: { id: string } }) {
    const updated = await prisma.message.update({
        where: { id: params.id },
        data: { archived: true }
    })

    return NextResponse.json({ message: 'Archived', updated })
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    const message = await prisma.message.findUnique({
        where: { id: params.id },
        include: { replies: true }
    })

    if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(message)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    await prisma.message.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Deleted' })
}
