// MessagesManagement.tsx (Client Component)
"use client"

import { useState } from "react"


import { ArabesqueLineDivider } from "@/components/arabesque-elements"

import MessagesList from "./MessagesList"
import { ClientMessage } from "./MessageInterfaces"
import ReplyDialog from "./ReplyDialog"
import MessagesStats from "./MessageStats"
import MessagesFilters from "./MessagesFilters"

interface MessagesManagementProps {
    initialMessages: ClientMessage[]
}

export default function MessagesManagement({ initialMessages }: MessagesManagementProps) {
    const [messages, setMessages] = useState<ClientMessage[]>(initialMessages)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [selectedMessage, setSelectedMessage] = useState<ClientMessage | null>(null)
    const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
    const [replyText, setReplyText] = useState("")

    const categories = [
        { value: "all", label: "All Categories" },
        { value: "general", label: "General Inquiry" },
        { value: "reservation", label: "Reservation" },
        { value: "catering", label: "Catering" },
        { value: "complaint", label: "Complaint" },
        { value: "compliment", label: "Compliment" },
        { value: "order", label: "Order Issue" },
    ]

    const statuses = [
        { value: "all", label: "All Messages" },
        { value: "unread", label: "Unread" },
        { value: "read", label: "Read" },
        { value: "replied", label: "Replied" },
        { value: "archived", label: "Archived" },
    ]

    const filteredMessages = messages.filter((message) => {
        const matchesSearch =
            message.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.content.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = selectedCategory === "all" || message.category === selectedCategory
        const matchesStatus = selectedStatus === "all" || message.status === selectedStatus

        return matchesSearch && matchesCategory && matchesStatus
    })

    const markAsRead = (messageId: number) => {
        setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, status: "read" as const } : msg)))
    }

    const toggleStar = (messageId: number) => {
        setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, starred: !msg.starred } : msg)))
    }

    const archiveMessage = (messageId: number) => {
        setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, status: "archived" as const } : msg)))
    }

    const deleteMessage = (messageId: number) => {
        setMessages(messages.filter((msg) => msg.id !== messageId))
    }

    const handleReply = (message: ClientMessage) => {
        setSelectedMessage(message)
        setReplyText("")
        setIsReplyDialogOpen(true)
        if (message.status === "unread") {
            markAsRead(message.id)
        }
    }

    const sendReply = () => {
        if (selectedMessage && replyText.trim()) {
            setMessages(
                messages.map((msg) =>
                    msg.id === selectedMessage.id
                        ? {
                            ...msg,
                            status: "replied" as const,
                            reply: replyText,
                            repliedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
                        }
                        : msg,
                ),
            )
            setIsReplyDialogOpen(false)
            setReplyText("")
            setSelectedMessage(null)
        }
    }

    const unreadCount = messages.filter((msg) => msg.status === "unread").length
    const starredCount = messages.filter((msg) => msg.starred).length

    return (
        <div className="space-y-6">
            {/* Header */}
            <MessagesHeader unreadCount={unreadCount} starredCount={starredCount} />

            <div className="mb-6">
                <ArabesqueLineDivider variant="simple" className="text-amber-600 opacity-30" />
            </div>

            {/* Stats */}
            <MessagesStats messages={messages} statuses={statuses} />

            {/* Filters */}
            <MessagesFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                categories={categories}
                statuses={statuses}
            />

            {/* Messages List */}
            <MessagesList
                filteredMessages={filteredMessages}
                handleReply={handleReply}
                archiveMessage={archiveMessage}
                deleteMessage={deleteMessage}
                toggleStar={toggleStar}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                selectedStatus={selectedStatus}
            />

            {/* Reply Dialog */}
            <ReplyDialog
                isReplyDialogOpen={isReplyDialogOpen}
                setIsReplyDialogOpen={setIsReplyDialogOpen}
                selectedMessage={selectedMessage}
                replyText={replyText}
                setReplyText={setReplyText}
                sendReply={sendReply}
            />
        </div>
    )
}
