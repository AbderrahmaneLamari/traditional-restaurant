// MessagesStats.tsx (Client Component)
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ClientMessage } from "./MessageInterfaces"

interface MessagesStatsProps {
    messages: ClientMessage[]
    statuses: Array<{ value: string; label: string }>
}

export default function MessagesStats({ messages, statuses }: MessagesStatsProps) {
    return (
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
    )
}