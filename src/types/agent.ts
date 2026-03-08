export type AgentRole = "system" | "user" | "assistant";

export type AgentMessage = {
  id: string;
  role: AgentRole;
  content: string;
  createdAt: string;
};

export type AgentChatRequestMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AgentChatRequest = {
  messages: AgentChatRequestMessage[];
  sessionId?: string;
};

export type AgentChatResponse = {
  message: {
    role: "assistant";
    content: string;
  };
  meta: {
    model: string;
    latencyMs: number;
    contextVersion: string;
  };
};

export type AgentProviderInput = {
  messages: AgentChatRequestMessage[];
  systemPrompt: string;
};

export type AgentProviderOutput = {
  content: string;
  model: string;
};

export interface AgentProvider {
  generateReply(input: AgentProviderInput): Promise<AgentProviderOutput>;
}
