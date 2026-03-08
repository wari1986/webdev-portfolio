"use client";

import { FormEvent, useRef, useState } from "react";

type AgentComposerProps = {
  disabled: boolean;
  onSend: (content: string) => Promise<void>;
};

const AgentComposer = ({ disabled, onSend }: AgentComposerProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const submitValue = async () => {
    const nextValue = value.trim();
    if (!nextValue || disabled) return;
    setValue("");
    // Reset height after clearing
    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    });
    await onSend(nextValue);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitValue();
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-[var(--color-divider)] p-3 flex items-end gap-2 max-[640px]:p-2.5">
      <label htmlFor="agent-input" className="sr-only">
        Ask Nicolay&apos;s AI
      </label>
      <textarea
        ref={textareaRef}
        id="agent-input"
        value={value}
        rows={1}
        onChange={(event) => {
          setValue(event.target.value);
          resize();
        }}
        placeholder="Ask about projects, stack, background..."
        className="flex-1 resize-none overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-2 text-[0.9rem] text-[var(--color-fg)] outline-none focus:border-[var(--color-fg-muted)]"
        style={{ minHeight: "40px" }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void submitValue();
          }
        }}
      />
      <button
        type="submit"
        disabled={disabled || value.trim().length === 0}
        className="h-10 rounded-sm border border-[var(--color-border)] px-4 text-[0.95rem] text-[var(--color-fg)] transition hover:bg-[var(--color-panel-soft)] disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Send"
      >
        →
      </button>
    </form>
  );
};

export default AgentComposer;
