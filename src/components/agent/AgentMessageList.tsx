"use client";

import { useEffect, useRef } from "react";

import { AgentMessage } from "@/types/agent";

type AgentMessageListProps = {
  messages: AgentMessage[];
  status: "idle" | "sending" | "error";
};

const AgentMessageList = ({ messages, status }: AgentMessageListProps) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 max-[640px]:px-3" aria-live="polite">
      <ul className="m-0 list-none p-0 space-y-2.5">
        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <li key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <p
                className={`m-0 max-w-[85%] rounded-xl px-3 py-2 text-[0.9rem] leading-[1.4] ${
                  isUser
                    ? "bg-[var(--color-fg)] text-[var(--color-panel)]"
                    : "bg-[var(--color-panel-soft)] text-[var(--color-fg)]"
                }`}
              >
                {message.content}
              </p>
            </li>
          );
        })}
      </ul>
      {status === "sending" ? <p className="mt-2 mb-0 text-[0.8rem] text-[var(--color-fg-muted)]">Thinking...</p> : null}
      <div ref={endRef} />
    </div>
  );
};

export default AgentMessageList;
