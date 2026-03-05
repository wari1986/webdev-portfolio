"use client";

import { FormEvent, useState } from "react";

type AgentComposerProps = {
  disabled: boolean;
  onSend: (content: string) => Promise<void>;
};

const AgentComposer = ({ disabled, onSend }: AgentComposerProps) => {
  const [value, setValue] = useState("");

  const submitValue = async () => {
    const nextValue = value.trim();
    if (!nextValue || disabled) {
      return;
    }

    setValue("");
    await onSend(nextValue);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitValue();
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-[var(--color-divider)] p-3 flex items-end gap-2 max-[640px]:p-2.5">
      <label htmlFor="agent-input" className="sr-only">
        Ask Nicolay&apos;s AI sidekick
      </label>
      <textarea
        id="agent-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask about projects, products, skills..."
        rows={2}
        className="min-h-12 flex-1 resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-2 text-[0.9rem] text-[var(--color-fg)] outline-none focus:border-[var(--color-fg-muted)]"
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
        className="h-12 rounded-lg border border-[var(--color-border)] px-4 text-[0.85rem] font-semibold text-[var(--color-fg)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default AgentComposer;
