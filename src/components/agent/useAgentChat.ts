"use client";

import { useCallback, useMemo, useState } from "react";

import constants from "../../../constants";
import createId from "@/components/agent/utils/createId";
import createMessage from "@/components/agent/utils/createMessage";
import { AgentChatRequestMessage, AgentChatResponse, AgentMessage } from "@/types/agent";

type ChatStatus = "idle" | "sending" | "error";

const useAgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [sessionId] = useState(() => createId());

  const open = useCallback(() => {
    setIsOpen(true);
    setMessages((current) => {
      if (current.length > 0) {
        return current;
      }
      return [createMessage("assistant", constants.agent.greeting)];
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || status === "sending") {
        return;
      }

      const userMessage = createMessage("user", trimmed);
      const nextMessages = [...messages, userMessage];

      setMessages(nextMessages);
      setStatus("sending");

      const requestMessages: AgentChatRequestMessage[] = nextMessages
        .filter((message) => message.role !== "system")
        .map((message) => ({ role: message.role as "user" | "assistant", content: message.content }));

      try {
        const response = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: requestMessages, sessionId }),
        });

        if (!response.ok) {
          throw new Error("Agent request failed");
        }

        const payload = (await response.json()) as AgentChatResponse;

        setMessages((current) => [...current, createMessage("assistant", payload.message.content)]);
        setStatus("idle");
      } catch {
        setMessages((current) => [
          ...current,
          createMessage("assistant", constants.agent.transportErrorMessage),
        ]);
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
      sendMessage,
    }),
    [isOpen, messages, status, open, close, sendMessage],
  );
};

export default useAgentChat;
