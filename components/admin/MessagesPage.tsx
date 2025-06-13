// MessagesPage.tsx (Server Component)
import MessagesManagement from "./MessagesManagement"
import { ClientMessage } from "./MessageInterfaces"

async function fetchMessages(): Promise<ClientMessage[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/message`, {
            cache: 'no-store',
        })

        if (!response.ok) {
            throw new Error('Failed to fetch messages')
        }

        const data: ClientMessage[] = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching messages:', error)
        return []
    }
}

export default async function MessagesPage() {
    const initialMessages = await fetchMessages()

    return <MessagesManagement initialMessages={initialMessages} />
}