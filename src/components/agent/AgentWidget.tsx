"use client";

import AgentDialog from "@/components/agent/AgentDialog";
import AgentLauncher from "@/components/agent/AgentLauncher";
import useAgentChat from "@/components/agent/useAgentChat";

const AgentWidget = () => {
  const chat = useAgentChat();

  return (
    <>
      <AgentLauncher onOpen={chat.open} />
      <AgentDialog
        isOpen={chat.isOpen}
        messages={chat.messages}
        status={chat.status}
        onClose={chat.close}
        onSend={chat.sendMessage}
      />
    </>
  );
};

export default AgentWidget;
