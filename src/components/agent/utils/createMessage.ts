import { AgentMessage } from "@/types/agent";

import createId from "@/components/agent/utils/createId";

const createMessage = (role: AgentMessage["role"], content: string): AgentMessage => ({
  id: createId(),
  role,
  content,
  createdAt: new Date().toISOString(),
});

export default createMessage;
