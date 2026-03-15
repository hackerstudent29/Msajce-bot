"use client";

import { Settings, User, ChevronDown, Monitor, Cpu } from "lucide-react";

export default function Header() {
  return (
    <header className="h-14 border-b border-neutral-800 bg-[#0a0a0a] flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-neutral-600 flex items-center justify-center text-white">
          <Monitor className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white leading-none">MSAJCE Campus AI</h1>
          <p className="text-[10px] text-neutral-500 font-medium">Research Assistant</p>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">

        <div className="flex items-center gap-1.5">
          <button className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg transition-all cursor-pointer">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg transition-all cursor-pointer">
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
