"use client";

import { useEffect, useRef } from "react";

import AgentComposer from "@/components/agent/AgentComposer";
import AgentMessageList from "@/components/agent/AgentMessageList";
import { AgentMessage } from "@/types/agent";

type AgentDialogProps = {
  isOpen: boolean;
  messages: AgentMessage[];
  status: "idle" | "streaming" | "error";
  onClose: () => void;
  onSend: (content: string) => Promise<void>;
};

const FOCUSABLE_SELECTOR =
  "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

const AgentDialog = ({ isOpen, messages, status, onClose, onSend }: AgentDialogProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)?.[0]?.focus();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleQuickReply = (text: string) => {
    void onSend(text);
  };

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 p-5 transition-all duration-200 ease-out max-[640px]:p-0 ${
        isOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="agent-dialog-title"
        className="flex h-[min(74dvh,600px)] w-[min(440px,100vw)] flex-col overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_16px_48px_rgba(0,0,0,0.22)] max-[640px]:h-[82dvh] max-[640px]:w-screen max-[640px]:rounded-none"
      >
        <header className="flex items-center justify-between border-b border-[var(--color-divider)] px-4 py-3">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full bg-[var(--color-available)]"
              aria-hidden="true"
            />
            <p id="agent-dialog-title" className="m-0 text-[0.9rem] font-medium text-[var(--color-fg)]">
              Chat with Nicolay
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--color-border)] text-[var(--color-fg)]"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
        </header>

        <AgentMessageList messages={messages} status={status} onQuickReply={handleQuickReply} />
        <AgentComposer onSend={onSend} disabled={status === "streaming"} />
      </div>
    </div>
  );
};

export default AgentDialog;
