"use client"

import { useState, FormEvent, useEffect } from "react"
import { Send, Bot, Paperclip, Mic, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { cn } from "@/lib/utils"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I am your MSAJCE Assistant. How can I help you today?",
      sender: "ai",
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
           const errData = await response.json();
           throw new Error(errData.error || "Server Error");
        } else {
           throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
      }

      const data = await response.json()
      setMessages((prev) => [...prev, data])
    } catch (error) {
      console.error("Chat Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "Sorry, I encountered an error. Please try again later.",
          sender: "ai",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ExpandableChat
      size="lg"
      position="bottom-right"
      icon={<Bot className="h-5 w-5" />}
    >
      <ExpandableChatHeader className="flex-col text-center justify-center bg-white border-b border-zinc-50 p-8">
        <div className="relative mb-4 flex justify-center">
          <Bot className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-sm font-semibold tracking-tight text-zinc-900">sathak ai assistant</h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <p className="text-[10px] font-medium text-zinc-400">
            online and ready to help
          </p>
        </div>
      </ExpandableChatHeader>

      <ExpandableChatBody className="bg-zinc-50/50 px-4">
        <ChatMessageList className="pb-8 space-y-8">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
              className="animate-in fade-in duration-500"
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0 border border-zinc-100 shadow-sm"
                src={
                  message.sender === "user"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                }
                fallback={message.sender === "user" ? "us" : "ai"}
              />
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
                className={cn(
                  "px-6 py-4 text-[12px] font-medium leading-relaxed",
                  message.sender === "user" 
                    ? "bg-blue-600 text-white" 
                    : "bg-white text-zinc-900 border border-zinc-200"
                )}
              >
                <div className="markdown-content w-full">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      table: ({node, ...props}) => (
                        <div className="overflow-x-auto my-2 w-full">
                          <table className={cn(
                            "border-collapse border w-full text-[11px]",
                            message.sender === "user" ? "border-blue-400" : "border-zinc-300"
                          )} {...props} />
                        </div>
                      ),
                      th: ({node, ...props}) => (
                        <th className={cn(
                          "border px-2 py-1 font-bold",
                          message.sender === "user" ? "border-blue-400 bg-blue-700 text-white" : "border-zinc-300 bg-zinc-50 text-zinc-900"
                        )} {...props} />
                      ),
                      td: ({node, ...props}) => (
                        <td className={cn(
                          "border px-2 py-1",
                          message.sender === "user" ? "border-blue-400 text-white" : "border-zinc-300 text-zinc-900"
                        )} {...props} />
                      ),
                      h2: ({node, ...props}) => (
                        <h2 className={cn(
                          "text-[13px] font-bold mt-4 mb-2 uppercase tracking-tight",
                          message.sender === "user" ? "text-white" : "text-blue-700"
                        )} {...props} />
                      ),
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-3" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1.5" {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
                
                {(message as any).usage && (
                  <div className="mt-3 flex gap-4 text-[9px] font-medium text-zinc-400 border-t border-zinc-50 pt-3">
                    <span>prompt: {(message as any).usage.promptTokens}</span>
                    <span>ai: {(message as any).usage.candidatesTokens}</span>
                    <span className="text-blue-500">total: {(message as any).usage.totalTokens}</span>
                  </div>
                )}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0 border border-zinc-100"
                fallback="ai"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter className="bg-white p-5 border-t border-zinc-100">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-xl border border-zinc-100 bg-zinc-50/50 p-2 shadow-sm focus-within:border-blue-400 transition-all"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            placeholder="ask me anything about msajce..."
            className="min-h-10 resize-none rounded-lg bg-transparent border-0 px-3 py-2 shadow-none focus-visible:ring-0 text-zinc-700 text-[11px] placeholder:text-zinc-400"
          />
          <div className="flex items-center p-1.5 justify-between">
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" type="button" className="text-zinc-400 hover:text-blue-600 h-8 w-8">
                <Paperclip className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon" type="button" className="text-zinc-400 hover:text-blue-600 h-8 w-8">
                <Mic className="size-3.5" />
              </Button>
            </div>
            <Button type="submit" size="sm" className="ml-auto px-6 h-8 rounded-lg text-[10px] font-medium bg-blue-600 text-white hover:bg-blue-700 border-none" disabled={isLoading}>
              <span>{isLoading ? "..." : "send query"}</span>
              <Send className="size-3 ml-2" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
