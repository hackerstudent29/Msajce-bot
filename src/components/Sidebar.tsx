"use client";

import { MessageSquare, Plus, Trash2, ChevronLeft, ChevronRight, LayoutPanelLeft } from "lucide-react";
import { Chat } from "@/utils/storage";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 0 : 260 }}
      className={cn(
        "bg-[#0a0a0a] border-r border-neutral-800 flex flex-col h-full relative group/sidebar overflow-hidden",
        isCollapsed ? "border-none" : "p-3"
      )}
    >
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            {/* New Chat Button */}
            <button
              onClick={onNewChat}
              className="flex items-center gap-2 w-full p-3 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 hover:border-neutral-700 transition-all mb-4 text-sm font-medium shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>

            {/* History List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-hide pr-1">
              <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest px-3 mb-2">History</p>
              {chats.length === 0 ? (
                <p className="px-3 text-xs text-neutral-700 italic">No recent chats</p>
              ) : (
                <div className="space-y-1">
                  {chats.map((chat) => (
                    <motion.div
                      layout
                      key={chat.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all clickable",
                        activeChatId === chat.id 
                          ? "bg-neutral-800 border border-neutral-700 text-white shadow-sm" 
                          : "text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200"
                      )}
                      onClick={() => onSelectChat(chat.id)}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <MessageSquare className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs truncate font-medium">{chat.title}</span>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/10 hover:text-red-400 rounded transition-all ml-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-neutral-800 pt-4 px-3 flex items-center gap-2 text-neutral-500 pb-2">
               <LayoutPanelLeft className="w-4 h-4" />
               <span className="text-[11px] font-semibold tracking-tight">MSAJCE Dashboard</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-12 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow-xl z-50",
          isCollapsed ? "opacity-100 right-[-10px]" : "opacity-0 group-hover/sidebar:opacity-100"
        )}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.aside>
  );
}
