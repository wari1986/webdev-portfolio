import { z } from "zod";

import agentConfig from "@/config/agent";

const maxRequestMessages = agentConfig.maxConversationMessages * 8;

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z
    .string()
    .trim()
    .min(1)
    .max(agentConfig.maxInputChars),
});

const agentRequestSchema = z.object({
  // Allow longer histories and trim them later in the API route.
  messages: z.array(messageSchema).min(1).max(maxRequestMessages),
  sessionId: z.string().min(1).max(100).optional(),
});

const parseAgentRequest = (value: unknown) => {
  return agentRequestSchema.safeParse(value);
};

export default parseAgentRequest;
