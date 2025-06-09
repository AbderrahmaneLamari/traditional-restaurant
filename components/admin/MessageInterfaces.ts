export interface ClientMessage {
    id: number
    firstname: string
    email: string
    phone?: string
    subject: string
    content: string
    category: "general" | "reservation" | "catering" | "complaint" | "compliment" | "order"
    status: "unread" | "read" | "replied" | "archived"
    priority: "low" | "medium" | "high"
    starred: boolean
    receivedAt: string
    repliedAt?: string
    reply?: string
}

export interface MessageCardProps {
    message: ClientMessage
    onReply: (message: ClientMessage) => void
    onArchive: (id: number) => void
    onDelete: (id: number) => void
    onToggleStar: (id: number) => void
}