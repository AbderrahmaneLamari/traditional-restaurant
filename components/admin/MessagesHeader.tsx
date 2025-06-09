// MessagesHeader.tsx (Client Component)
"use client"

interface MessagesHeaderProps {
    unreadCount: number
    starredCount: number
}

function MessagesHeader({ unreadCount, starredCount }: MessagesHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold">Client Messages</h2>
                <p className="text-muted-foreground">
                    Manage customer inquiries and feedback ({unreadCount} unread, {starredCount} starred)
                </p>
            </div>
        </div>
    )
}