"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Message } from "@/utils/storage";

interface MessageBubbleProps {
  message: Message;
}

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("language-", "") || "code";

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-neutral-700">
      {/* Code block header */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-700">
        <span className="text-xs text-neutral-400 font-mono">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer clickable"
        >
          {copied ? (
            <><Check className="w-3.5 h-3.5 text-green-400" /><span className="text-green-400">Copied!</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>
          )}
        </button>
      </div>
      <pre className="bg-[#050505] p-4 overflow-x-auto">
        <code className="text-sm font-mono text-neutral-300 whitespace-pre">{children}</code>
      </pre>
    </div>
  );
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  const time = message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`flex w-full mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center mr-3 mt-1 text-sm font-bold text-neutral-300">
          AI
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "max-w-[85%] items-end" : "max-w-full items-start flex-1"}`}>
        <div
          className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? "bg-neutral-700 text-white rounded-tr-sm"
              : "bg-neutral-800/50 text-neutral-100 rounded-tl-sm border border-neutral-800"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }: any) {
                  const isBlock = className?.startsWith("language-");
                  return isBlock ? (
                    <CodeBlock className={className}>{String(children).replace(/\n$/, "")}</CodeBlock>
                  ) : (
                    <code className="bg-gray-900 text-gray-300 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                      {children}
                    </code>
                  );
                },
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3">
                    <table className="border-collapse w-full text-xs">{children}</table>
                  </div>
                ),
                th: ({ children }) => <th className="border border-neutral-600 px-3 py-2 bg-neutral-700 text-left font-semibold text-neutral-200">{children}</th>,
                td: ({ children }) => <td className="border border-neutral-700 px-3 py-2 text-neutral-300">{children}</td>,
                h2: ({ children }) => <h2 className="text-base font-bold mt-4 mb-2 text-white">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mt-3 mb-1.5 text-neutral-200">{children}</h3>,
                p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-neutral-100">{children}</p>,
                ul: ({ children }) => <ul className="list-disc ml-4 mb-3 space-y-1 text-neutral-200">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-4 mb-3 space-y-1 text-neutral-200">{children}</ol>,
                li: ({ children }) => <li className="text-neutral-300">{children}</li>,
                a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-white underline hover:opacity-80 transition-opacity">{children}</a>,
                strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
                blockquote: ({ children }) => <blockquote className="border-l-2 border-neutral-500 pl-3 my-2 text-neutral-400 italic">{children}</blockquote>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <span className="text-[10px] text-neutral-600 mt-1 px-1 font-medium">{time}</span>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-500 flex items-center justify-center ml-3 mt-1 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105">
          U
        </div>
      )}
    </div>
  );
}
