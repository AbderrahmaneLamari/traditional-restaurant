"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Mail, MailOpen, Reply, Archive, Trash2, Star, StarOff, Phone, Calendar, Send } from "lucide-react"
import { Label } from "@/components/ui/label"
import { GeometricPattern } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"

interface ClientMessage {
  id: number
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  category: "general" | "reservation" | "catering" | "complaint" | "compliment" | "order"
  status: "unread" | "read" | "replied" | "archived"
  priority: "low" | "medium" | "high"
  starred: boolean
  receivedAt: string
  repliedAt?: string
  reply?: string
}

const initialMessages: ClientMessage[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    subject: "Reservation for Anniversary Dinner",
    message:
      "Hello! I would like to make a reservation for my anniversary dinner on Saturday evening. We are a party of 4 and would prefer a quiet table. Do you have any availability around 7 PM? Also, do you offer any special anniversary packages?",
    category: "reservation",
    status: "unread",
    priority: "medium",
    starred: false,
    receivedAt: "2024-01-15 14:30",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    phone: "+1 (555) 987-6543",
    subject: "Catering for Corporate Event",
    message:
      "We are planning a corporate event for 50 people and would like to inquire about your catering services. The event is scheduled for next month. Could you please provide information about menu options and pricing?",
    category: "catering",
    status: "read",
    priority: "high",
    starred: true,
    receivedAt: "2024-01-15 10:15",
  },
  {
    id: 3,
    name: "Maria Garcia",
    email: "maria@example.com",
    subject: "Excellent Service!",
    message:
      "I wanted to thank you for the wonderful dining experience last night. The couscous was absolutely delicious and the service was exceptional. Our server was very knowledgeable about the dishes and made great recommendations. We will definitely be back!",
    category: "compliment",
    status: "replied",
    priority: "low",
    starred: true,
    receivedAt: "2024-01-14 20:45",
    repliedAt: "2024-01-15 09:00",
    reply:
      "Dear Maria, Thank you so much for your kind words! We're thrilled that you enjoyed your dining experience with us. We look forward to welcoming you back soon. Best regards, Restaurant El-Asil Team",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1 (555) 456-7890",
    subject: "Issue with Recent Order",
    message:
      "I placed an order for delivery yesterday (Order #ORD-1234) and there was an issue with one of the items. The tagine was cold when it arrived and seemed to be missing some ingredients. I'd like to discuss this with someone.",
    category: "complaint",
    status: "read",
    priority: "high",
    starred: false,
    receivedAt: "2024-01-14 16:20",
  },
  {
    id: 5,
    name: "Fatima Al-Zahra",
    email: "fatima@example.com",
    subject: "Dietary Restrictions Inquiry",
    message:
      "Hello, I have some dietary restrictions and was wondering if you could accommodate them. I'm vegetarian and also avoid dairy products. Could you let me know which dishes on your menu would be suitable for me?",
    category: "general",
    status: "unread",
    priority: "medium",
    starred: false,
    receivedAt: "2024-01-14 12:10",
  },
]

export function MessagesManagement() {
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
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "reservation":
        return "bg-blue-100 text-blue-800"
      case "catering":
        return "bg-purple-100 text-purple-800"
      case "complaint":
        return "bg-red-100 text-red-800"
      case "compliment":
        return "bg-green-100 text-green-800"
      case "order":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <Mail className="h-4 w-4" />
      case "read":
        return <MailOpen className="h-4 w-4" />
      case "replied":
        return <Reply className="h-4 w-4" />
      case "archived":
        return <Archive className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const unreadCount = messages.filter((msg) => msg.status === "unread").length
  const starredCount = messages.filter((msg) => msg.starred).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Client Messages</h2>
          <p className="text-muted-foreground">
            Manage customer inquiries and feedback ({unreadCount} unread, {starredCount} starred)
          </p>
        </div>
      </div>

      <div className="mb-6">
        <ArabesqueLineDivider variant="simple" className="text-amber-600 opacity-30" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statuses.slice(1).map((status) => {
          const count = messages.filter((msg) => msg.status === status.value).length
          return (
            <Card key={status.value}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground">{status.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card
            key={message.id}
            className={`relative overflow-hidden transition-all duration-200 hover:shadow-md ${
              message.status === "unread" ? "border-l-4 border-l-amber-600" : ""
            }`}
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-12 h-12 opacity-5">
              <GeometricPattern variant="corner" className="text-amber-600" />
            </div>

            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(message.status)}
                        <h3
                          className={`font-semibold ${message.status === "unread" ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {message.name}
                        </h3>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => toggleStar(message.id)} className="p-1">
                        {message.starred ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        ) : (
                          <StarOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                      <Badge className={getCategoryColor(message.category)}>{message.category}</Badge>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {message.email}
                      </span>
                      {message.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {message.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {message.receivedAt}
                      </span>
                    </p>
                  </div>

                  <h4 className="font-medium mb-2">{message.subject}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {message.message.length > 200 ? `${message.message.substring(0, 200)}...` : message.message}
                  </p>

                  {message.reply && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                        Your Reply ({message.repliedAt}):
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">{message.reply}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-row lg:flex-col gap-2 lg:w-32">
                  <Button size="sm" onClick={() => handleReply(message)} className="flex-1 lg:w-full">
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>

                  {message.status !== "archived" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => archiveMessage(message.id)}
                      className="flex-1 lg:w-full"
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMessage(message.id)}
                    className="flex-1 lg:w-full text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to {selectedMessage?.name}</DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Original Message:</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Subject:</strong> {selectedMessage.subject}
                </p>
                <p className="text-sm">{selectedMessage.message}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply">Your Reply</Label>
                <Textarea
                  id="reply"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={sendReply} disabled={!replyText.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
