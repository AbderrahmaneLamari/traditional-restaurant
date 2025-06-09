"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"
import { ClientMessage } from "./MessageInterfaces"

interface ReplyDialogProps {
    isReplyDialogOpen: boolean
    setIsReplyDialogOpen: (open: boolean) => void
    selectedMessage: ClientMessage | null
    replyText: string
    setReplyText: (text: string) => void
    sendReply: () => void
}

export default function ReplyDialog({
    isReplyDialogOpen,
    setIsReplyDialogOpen,
    selectedMessage,
    replyText,
    setReplyText,
    sendReply
}: ReplyDialogProps) {
    return (
        <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Reply to {selectedMessage?.firstname}</DialogTitle>
                </DialogHeader>

                {selectedMessage && (
                    <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <h4 className="font-medium mb-2">Original Message:</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                                <strong>Subject:</strong> {selectedMessage.subject}
                            </p>
                            <p className="text-sm">{selectedMessage.content}</p>
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
    )
}