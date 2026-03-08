import { AgentProviderInput } from "@/types/agent";

const mapOpenAIInput = (input: AgentProviderInput) => {
  const priorMessages = input.messages.map((message) => ({
    role: message.role,
    content: [{ type: "input_text", text: message.content }],
  }));

  return [
    {
      role: "system",
      content: [{ type: "input_text", text: input.systemPrompt }],
    },
    ...priorMessages,
  ];
};

export default mapOpenAIInput;
