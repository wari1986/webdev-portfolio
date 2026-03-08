"use client";

type AgentLauncherProps = {
  onOpen: () => void;
};

const AgentLauncher = ({ onOpen }: AgentLauncherProps) => {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed bottom-5 right-5 z-40 inline-flex h-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-4 text-[0.83rem] font-semibold text-[var(--color-fg)] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition hover:translate-y-[-1px] hover:shadow-[0_12px_26px_rgba(0,0,0,0.2)] max-[640px]:bottom-3.5 max-[640px]:right-3.5"
      aria-label="Open chat with Nicolay"
    >
      Chat with Nicolay
    </button>
  );
};

export default AgentLauncher;
