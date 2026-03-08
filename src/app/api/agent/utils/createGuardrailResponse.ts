import { NextResponse } from "next/server";

const createGuardrailResponse = (content: string, model: string, contextVersion: string) => {
  return NextResponse.json({
    message: {
      role: "assistant",
      content,
    },
    meta: {
      model,
      latencyMs: 0,
      contextVersion,
    },
  });
};

export default createGuardrailResponse;
