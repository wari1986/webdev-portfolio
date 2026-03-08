import constants from "../../../../constants";

type OpenAIResponseOutputPart = {
  type?: string;
  text?: string;
};

type OpenAIResponseOutputItem = {
  type?: string;
  content?: OpenAIResponseOutputPart[];
};

type OpenAIResponse = {
  output?: OpenAIResponseOutputItem[];
};

const extractAssistantText = (response: OpenAIResponse): string => {
  const text = response.output
    ?.filter((item) => item.type === "message")
    .flatMap((item) => item.content ?? [])
    .filter((part) => part.type === "output_text")
    .map((part) => part.text ?? "")
    .join("\n")
    .trim();

  return text || constants.agent.unknownContextMessage;
};

export default extractAssistantText;
