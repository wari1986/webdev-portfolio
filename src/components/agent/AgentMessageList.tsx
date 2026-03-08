"use client";

import { useEffect, useRef } from "react";

import { AgentMessage } from "@/types/agent";

type AgentMessageListProps = {
  messages: AgentMessage[];
  status: "idle" | "streaming" | "error";
  onQuickReply: (text: string) => void;
};

const QUICK_REPLIES = ["What are you building?", "What's your tech stack?", "Tell me about a project"];

// Minimal inline markdown renderer: bold, inline code, lists, line breaks
const MarkdownContent = ({ text }: { text: string }) => {
  const renderInline = (str: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
    let last = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > last) {
        parts.push(str.slice(last, match.index));
      }
      const token = match[0];
      if (token.startsWith("`")) {
        parts.push(
          <code key={match.index} className="rounded bg-[var(--color-border)] px-[3px] py-px font-mono text-[0.82em]">
            {token.slice(1, -1)}
          </code>,
        );
      } else {
        parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
      }
      last = match.index + token.length;
    }

    if (last < str.length) parts.push(str.slice(last));
    return parts;
  };

  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const listMatch = line.match(/^[-*]\s+(.+)/);
    const numMatch = line.match(/^\d+\.\s+(.+)/);

    if (listMatch || numMatch) {
      const items: React.ReactNode[] = [];
      while (i < lines.length) {
        const l = lines[i];
        const lm = l.match(/^[-*]\s+(.+)/);
        const nm = l.match(/^\d+\.\s+(.+)/);
        if (!lm && !nm) break;
        items.push(<li key={i}>{renderInline((lm ?? nm)![1])}</li>);
        i++;
      }
      const Tag = numMatch ? "ol" : "ul";
      nodes.push(
        <Tag key={`list-${i}`} className="my-1 ml-4 space-y-0.5 text-[0.9rem] leading-[1.5]">
          {items}
        </Tag>,
      );
      continue;
    }

    if (line.trim() === "") {
      nodes.push(<div key={`gap-${i}`} className="h-1.5" />);
    } else {
      nodes.push(
        <p key={i} className="m-0 text-[0.9rem] leading-[1.5]">
          {renderInline(line)}
        </p>,
      );
    }
    i++;
  }

  return <div className="space-y-0.5">{nodes}</div>;
};

const ThinkingDots = () => (
  <span className="inline-flex items-center gap-[3px]" aria-label="Thinking">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="inline-block h-[5px] w-[5px] rounded-full bg-[var(--color-fg-muted)]"
        style={{ animation: `agent-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
      />
    ))}
  </span>
);

const AgentMessageList = ({ messages, status, onQuickReply }: AgentMessageListProps) => {
  const endRef = useRef<HTMLDivElement | null>(null);
  const showQuickReplies = messages.length <= 1 && status === "idle";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 max-[640px]:px-3" aria-live="polite">
      <ul className="m-0 list-none p-0 space-y-2.5">
        {messages.map((message) => {
          const isUser = message.role === "user";
          const isEmpty = message.content === "" && status === "streaming";
          return (
            <li key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[88%] rounded-md px-3 py-2 ${
                  isUser
                    ? "bg-[var(--color-fg)] text-[var(--color-panel)]"
                    : "bg-[var(--color-panel-soft)] text-[var(--color-fg)]"
                }`}
              >
                {isEmpty ? <ThinkingDots /> : <MarkdownContent text={message.content} />}
              </div>
            </li>
          );
        })}
      </ul>

      {status === "error" && (
        <p className="mt-2 mb-0 text-[0.78rem] text-red-500">Something went wrong. Try again.</p>
      )}

      {showQuickReplies && (
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onQuickReply(q)}
              className="rounded-sm border border-[var(--color-border)] px-2.5 py-1 text-[0.78rem] text-[var(--color-fg-muted)] transition hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
};

export default AgentMessageList;
