"use client";

import { useEffect, useRef } from "react";

import AgentComposer from "@/components/agent/AgentComposer";
import AgentMessageList from "@/components/agent/AgentMessageList";
import { AgentMessage } from "@/types/agent";

type AgentDialogProps = {
  isOpen: boolean;
  messages: AgentMessage[];
  status: "idle" | "sending" | "error";
  onClose: () => void;
  onSend: (content: string) => Promise<void>;
};

const FOCUSABLE_SELECTOR =
  "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

const AgentDialog = ({ isOpen, messages, status, onClose, onSend }: AgentDialogProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) {
        return;
      }

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

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40 p-4 max-[640px]:items-end max-[640px]:p-0">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="agent-dialog-title"
        className="flex h-[min(74dvh,640px)] w-[min(460px,100vw)] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] shadow-2xl max-[640px]:h-[86dvh] max-[640px]:w-full max-[640px]:rounded-t-2xl max-[640px]:rounded-b-none"
      >
        <header className="flex items-center justify-between border-b border-[var(--color-divider)] px-4 py-3">
          <div>
            <p id="agent-dialog-title" className="m-0 text-[0.95rem] font-semibold text-[var(--color-fg)]">
              Chat with Nicolay
            </p>
            <p className="m-0 text-[0.78rem] text-[var(--color-fg-muted)]">AI sidekick</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-fg)]"
            aria-label="Close chat"
          >
            ×
          </button>
        </header>

        <AgentMessageList messages={messages} status={status} />
        <AgentComposer onSend={onSend} disabled={status === "sending"} />
      </div>
    </div>
  );
};

export default AgentDialog;
