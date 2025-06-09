import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { transporter } from '@/lib/mailer'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { content } = await req.json()
    const message = await prisma.message.findUnique({ where: { id: params.id } })

    if (!message) return NextResponse.json({ error: 'Message not found' }, { status: 404 })

    const reply = await prisma.reply.create({
        data: { content, messageId: message.id }
    })

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: message.email_sender,
        subject: 'Reply to your message',
        text: content,
    })

    return NextResponse.json({ message: 'Reply sent and saved', reply })
}
