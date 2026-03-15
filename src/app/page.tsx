"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import InputBox from "@/components/InputBox";
import { Chat, Message, createChat, getChats, saveChats, generateChatTitle } from "@/utils/storage";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const isChatEmpty = !activeChat || activeChat.messages.length === 0;

  // Load chats on mount
  useEffect(() => {
    const savedChats = getChats();
    setChats(savedChats);
    if (savedChats.length > 0) {
      setActiveChatId(savedChats[0].id);
    } else {
      handleNewChat();
    }
  }, []);

  // Save chats whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      saveChats(chats);
    }
  }, [chats]);

  // Auto scroll to bottom
  useEffect(() => {
    if (!isChatEmpty) {
      // Force scroll to bottom when chat is selected or messages added
      const target = messagesEndRef.current;
      if (target) {
        target.scrollIntoView({ behavior: chats.length > 0 ? "smooth" : "auto" });
      }
    }
  }, [activeChatId, activeChat?.messages.length, isLoading, isChatEmpty]);

  const handleNewChat = () => {
    const newChat = createChat();
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const handleDeleteChat = (id: string) => {
    const newChats = chats.filter((c) => c.id !== id);
    setChats(newChats);
    if (activeChatId === id) {
      setActiveChatId(newChats.length > 0 ? newChats[0].id : null);
    }
  };

  const handleSubmit = async (content: string) => {
    if (!activeChatId) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    // Update messages local state
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          const updatedMessages = [...c.messages, userMessage];
          return {
            ...c,
            messages: updatedMessages,
            title: c.messages.length === 0 ? generateChatTitle(content) : c.title,
            updatedAt: new Date(),
          };
        }
        return c;
      })
    );

    setIsLoading(true);

    try {
      // Simulate real chat history for the API
      const conversationHistory = activeChat?.messages.map(m => ({
        sender: m.sender,
        content: m.content
      })) || [];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...conversationHistory, { sender: "user", content }] 
        }),
      });

      if (!response.ok) throw new Error("API Limit reached or server error");

      const data = await response.json();
      
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: data.content,
        sender: "ai",
        timestamp: new Date(),
      };

      setChats((prev) =>
        prev.map((c) => {
          if (c.id === activeChatId) {
            return {
              ...c,
              messages: [...c.messages, aiMessage],
              updatedAt: new Date(),
            };
          }
          return c;
        })
      );
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "I'm sorry, I'm having trouble connecting to the brain right now. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId ? { ...c, messages: [...c.messages, errorMessage] } : c
        )
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex h-screen bg-[#0a0a0a] text-neutral-200 overflow-hidden font-sans">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChatId}
        onDeleteChat={handleDeleteChat}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111] relative">
        <Header />

        {/* Chat Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 scroll-smooth relative">
          <AnimatePresence>
            <motion.div
              key={activeChatId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "max-w-3xl mx-auto w-full min-h-full px-4 md:px-6",
                isChatEmpty 
                  ? "flex flex-col items-center justify-center" 
                  : "flex flex-col justify-start pt-4 md:pt-10 pb-32"
              )}
            >
              {isChatEmpty && (
                <div className="flex flex-col items-center mb-8">
                  <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight text-center"
                  >
                    How can I help you today?
                  </motion.h1>
                  
                  {/* Centered Input Box Container for Empty State */}
                  <div className="w-full mb-8">
                    <InputBox onSubmit={handleSubmit} isLoading={isLoading} isCentered={true} />
                  </div>

                  {/* Modern Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-2xl px-4">
                     {[
                       { label: "Hostel Facilities", icon: "🏢" },
                       { label: "Admission Query", icon: "🎓" },
                       { label: "Placement Records", icon: "📈" },
                       { label: "Research Projects", icon: "🔬" },
                       { label: "Course Syllabus", icon: "📚" }
                     ].map((item, idx) => (
                       <motion.button 
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => handleSubmit(item.label)}
                          className="flex items-center gap-2.5 px-5 py-2.5 bg-neutral-900/50 hover:bg-neutral-800 rounded-full border border-neutral-800 text-neutral-400 hover:text-white transition-all text-xs font-medium shadow-sm active:scale-95 cursor-pointer clickable"
                       >
                         <span>{item.icon}</span>
                         <span>{item.label}</span>
                       </motion.button>
                     ))}
                  </div>
                </div>
              )}

              {!isChatEmpty && activeChat?.messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {isLoading && !isChatEmpty && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Input Area Only when Chat is NOT empty */}
        <AnimatePresence>
          {!isChatEmpty && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-auto"
            >
              <InputBox onSubmit={handleSubmit} isLoading={isLoading} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
