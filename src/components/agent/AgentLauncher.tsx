"use client";

type AgentLauncherProps = {
  onOpen: () => void;
};

const AgentLauncher = ({ onOpen }: AgentLauncherProps) => {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed bottom-5 right-5 z-40 hidden items-center justify-center rounded-sm border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-2.5 text-[0.83rem] text-[var(--color-fg)] shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition hover:bg-[var(--color-panel-soft)] sm:inline-flex"
      aria-label="Open chat with Nicolay"
    >
      Chat with Nicolay →
    </button>
  );
};

export default AgentLauncher;
