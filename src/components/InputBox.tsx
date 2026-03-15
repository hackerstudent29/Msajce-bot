"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { ArrowUpIcon, Paperclip, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputBoxProps {
  onSubmit: (value: string) => void;
  isLoading: boolean;
  isCentered?: boolean;
}

export default function InputBox({ onSubmit, isLoading, isCentered }: InputBoxProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MIN_HEIGHT = 60;
  const MAX_HEIGHT = 200;

  const adjustHeight = useCallback((reset?: boolean) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    if (reset) {
      textarea.style.height = `${MIN_HEIGHT}px`;
      return;
    }
    textarea.style.height = `${MIN_HEIGHT}px`;
    const newHeight = Math.max(MIN_HEIGHT, Math.min(textarea.scrollHeight, MAX_HEIGHT));
    textarea.style.height = `${newHeight}px`;
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${MIN_HEIGHT}px`;
    }
  }, []);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setValue("");
    adjustHeight(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-transparent px-4 pb-8 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl border border-neutral-800 focus-within:border-neutral-600 transition-all shadow-2xl">
          {/* Textarea */}
          <div className="overflow-y-auto">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Message MSAJCE AI..."
              disabled={isLoading}
              className={cn(
                "w-full px-4 pt-4 pb-2",
                "resize-none bg-transparent border-none outline-none",
                "text-neutral-100 text-sm placeholder:text-neutral-500",
                "focus:outline-none focus:ring-0",
                "disabled:opacity-50"
              )}
              style={{ overflow: "hidden", minHeight: `${MIN_HEIGHT}px` }}
            />
          </div>

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-3 pb-3">
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 hover:bg-neutral-800 rounded-xl text-neutral-500 hover:text-neutral-300 transition-all flex items-center gap-2"
              >
                <Paperclip className="w-4 h-4" />
                <span className="text-[11px] font-medium hidden sm:inline">Attach</span>
              </button>
              <button
                type="button"
                className="p-2 hover:bg-neutral-800 rounded-xl text-neutral-500 hover:text-neutral-300 transition-all flex items-center gap-2 border border-dashed border-neutral-700 ml-1"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="text-[11px] font-medium hidden sm:inline">Project</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-neutral-700 hidden md:block">
                Shift + Enter for new line
              </span>
              <button
                onClick={handleSubmit}
                disabled={!value.trim() || isLoading}
                className={cn(
                  "h-8 w-8 rounded-full transition-all duration-300 flex items-center justify-center",
                  value.trim() && !isLoading
                    ? "bg-white text-black hover:scale-105 shadow-lg"
                    : "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-neutral-600 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowUpIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        {!isCentered && (
          <p className="text-center text-[10px] text-neutral-700 mt-2">
            MSAJCE AI Assistant · Powered by Groq / Llama 3
          </p>
        )}
      </div>
    </div>
  );
}
