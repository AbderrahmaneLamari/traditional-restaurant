import { Archive, Badge, Calendar, Mail, MailOpen, Phone, Reply, Star, StarOff, Trash2 } from "lucide-react";
import { GeometricPattern } from "../arabic-patterns";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

import { MessageCardProps } from "./MessageInterfaces";

export default function MessageCard({ message, onReply, onArchive, onToggleStar, onDelete}:  MessageCardProps ) {
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

    return (
        <Card
            key={message.id}
            className={`relative overflow-hidden transition-all duration-200 hover:shadow-md ${message.status === "unread" ? "border-l-4 border-l-amber-600" : ""
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
                                        {message.firstname}
                                    </h3>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => onToggleStar(message.id)} className="p-1">
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
                            <p className="text-sm text-muted-foreground flex items-center gap-4 grid grid-cols-1 grid-rows-3  md:grid-cols-2 md:grid-rows-2 ">
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
                            {message.content.length > 200 ? `${message.content.substring(0, 200)}...` : message.content}
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
                        <Button size="sm" onClick={() => onReply(message)} className="flex-1 lg:w-full">
                            <Reply className="h-4 w-4 mr-2" />
                            Reply
                        </Button>

                        {message.status !== "archived" && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onArchive(message.id)}
                                className="flex-1 lg:w-full"
                            >
                                <Archive className="h-4 w-4 mr-2" />
                                Archive
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(message.id)}
                            className="flex-1 lg:w-full text-red-600 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}