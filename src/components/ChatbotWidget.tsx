// src/components/ChatbotWidget.tsx
"use client";

import { useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import useCookieBannerOffset from "@/hooks/useCookieBannerOffset";

type Author = "bot" | "user";
type Message = { id: string; author: Author; text: string };

export type ChatbotWidgetProps = {
  rightClassName?: string;   // e.g. "right-4"
  zIndexClass?: string;      // e.g. "z-50"
  title?: string;
  welcome?: string;
  extraFabBottom?: number;   // px above cookie UI for FAB (default 72 to sit above WhatsApp)
  extraPanelBottom?: number; // px above cookie UI for panel (default 160)
};

const uid = () =>
  (globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`);

export default function ChatbotWidget({
  rightClassName = "right-4",
  zIndexClass = "z-50",
  title = "MULTAI Support",
  welcome = "Hi! 👋 How can we help today?",
  extraFabBottom = 72,
  extraPanelBottom = 160,
}: ChatbotWidgetProps) {
  const [open, setOpen] = useState(false);

  // ✅ Explicitly type the array as Message[]
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", author: "bot", text: welcome },
  ]);

  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const cookieOffsetFab = useCookieBannerOffset(16 + extraFabBottom);
  const cookieOffsetPanel = useCookieBannerOffset(16 + extraPanelBottom);

  const send = () => {
    const v = text.trim();
    if (!v) return;

    // ✅ This now matches Message (author: "user" | "bot")
    setMessages((m) => [...m, { id: uid(), author: "user", text: v }]);
    setText("");

    // Demo bot reply (replace with your API call)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: uid(), author: "bot", text: "Thanks! We’ll reply shortly." },
      ]);
    }, 450);
  };

  return (
    <>
      {/* FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`fixed ${rightClassName} ${zIndexClass} h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600 transition grid place-items-center`}
        style={{ bottom: `calc(${cookieOffsetFab}px + env(safe-area-inset-bottom, 0px))` }}
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className={`fixed ${rightClassName} ${zIndexClass} w-[92vw] max-w-sm rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden`}
          role="dialog"
          aria-modal="true"
          aria-label="Website chat"
          style={{ bottom: `calc(${cookieOffsetPanel}px + env(safe-area-inset-bottom, 0px))` }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <div>
              <div className="text-sm font-semibold text-gray-900">{title}</div>
              <div className="text-xs text-gray-500">Typically replies in a few minutes</div>
            </div>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-gray-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto px-4 py-3 space-y-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.author === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={[
                    "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                    m.author === "user"
                      ? "bg-indigo-600 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-900 rounded-bl-sm",
                  ].join(" ")}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
                inputRef.current?.focus();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-3 py-2 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-[11px] text-gray-500">
              Please don’t share sensitive information.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
