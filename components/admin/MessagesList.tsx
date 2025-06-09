"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"
import MessageCard from "./MessagesCard"
import { ClientMessage } from "./MessageInterfaces"

interface MessagesListProps {
    filteredMessages: ClientMessage[]
    handleReply: (message: ClientMessage) => void
    archiveMessage: (messageId: number) => void
    deleteMessage: (messageId: number) => void
    toggleStar: (messageId: number) => void
    searchTerm: string
    selectedCategory: string
    selectedStatus: string
}

export default function MessagesList({
    filteredMessages,
    handleReply,
    archiveMessage,
    deleteMessage,
    toggleStar,
    searchTerm,
    selectedCategory,
    selectedStatus
}: MessagesListProps) {
    return (
        <div className="space-y-4">
            {filteredMessages?.map((message, i) => (
                <MessageCard
                    key={i}
                    message={message}
                    onReply={handleReply}
                    onArchive={archiveMessage}
                    onDelete={deleteMessage}
                    onToggleStar={toggleStar}
                />
            ))}

            {filteredMessages.length === 0 && (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No messages found</h3>
                        <p className="text-muted-foreground">
                            {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                                ? "Try adjusting your search criteria"
                                : "No client messages yet"}
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}