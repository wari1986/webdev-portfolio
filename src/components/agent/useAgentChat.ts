"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import constants from "../../../constants";
import createId from "@/components/agent/utils/createId";
import createMessage from "@/components/agent/utils/createMessage";
import { AgentChatRequestMessage, AgentMessage } from "@/types/agent";

type ChatStatus = "idle" | "streaming" | "error";

const STORAGE_KEY = "agent-messages-v1";

const loadPersistedMessages = (): AgentMessage[] => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AgentMessage[];
  } catch {
    return [];
  }
};

const persistMessages = (messages: AgentMessage[]) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // sessionStorage unavailable — fail silently
  }
};

const useAgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [sessionId] = useState(() => createId());
  const hydrated = useRef(false);

  // Hydrate from sessionStorage on mount (client only)
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const saved = loadPersistedMessages();
    if (saved.length > 0) {
      setMessages(saved);
    }
  }, []);

  // Persist messages whenever they change
  useEffect(() => {
    if (!hydrated.current) return;
    persistMessages(messages);
  }, [messages]);

  const open = useCallback(() => {
    setIsOpen(true);
    setMessages((current) => {
      if (current.length > 0) return current;
      return [createMessage("assistant", constants.agent.greeting)];
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearMessages = useCallback(() => {
    const greeting = createMessage("assistant", constants.agent.greeting);
    setMessages([greeting]);
    setStatus("idle");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || status === "streaming") {
        return;
      }

      const userMessage = createMessage("user", trimmed);
      const nextMessages = [...messages, userMessage];

      setMessages(nextMessages);
      setStatus("streaming");

      const requestMessages: AgentChatRequestMessage[] = nextMessages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

      // Append a placeholder assistant message to stream into
      const assistantId = createId();
      const placeholder = { ...createMessage("assistant", ""), id: assistantId };
      setMessages((current) => [...current, placeholder]);

      try {
        const response = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: requestMessages, sessionId }),
        });

        if (!response.ok) {
          throw new Error(`Agent request failed: ${response.status}`);
        }

        if (!response.body) {
          throw new Error("Response body is null");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            try {
              const event = JSON.parse(data) as { text?: string };
              if (typeof event.text === "string") {
                accumulated += event.text;
                const snap = accumulated;
                setMessages((current) =>
                  current.map((m) => (m.id === assistantId ? { ...m, content: snap } : m)),
                );
              }
            } catch {
              // skip unparseable lines
            }
          }
        }

        setStatus("idle");
      } catch {
        setMessages((current) =>
          current.map((m) =>
            m.id === assistantId ? { ...m, content: constants.agent.transportErrorMessage } : m,
          ),
        );
        setStatus("error");
      }
    },
    [messages, sessionId, status],
  );

  return useMemo(
    () => ({
      isOpen,
      messages,
      status,
      open,
      close,
      clearMessages,
      sendMessage,
    }),
    [isOpen, messages, status, open, close, clearMessages, sendMessage],
  );
};

export default useAgentChat;
