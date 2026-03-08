const constants = {
  agent: {
    greeting:
      "Hey, I'm Nicolay's AI sidekick. Ask me about my projects, products, skills, background, or current tech stack.",
    fallbackMessage:
      "My circuits just blinked for a second. Try again and I can still walk you through Nicolay's work and background.",
    transportErrorMessage: "I lost the thread for a moment. Ask again and I will pick it up from there.",
    unknownContextMessage:
      "I don't have enough context for that yet. Ask me about projects, products, skills, or what I'm building.",
    outOfScopeMessage:
      "I can only help with Nicolay's background, projects, products, skills, and technologies used on this site. Ask me something in that scope.",
    interactionLimitMessage:
      "You've reached this chat's question limit for now. Open a new session in a bit and I can continue.",
    topicKeywords: [
      "nicolay",
      "portfolio",
      "project",
      "product",
      "skill",
      "stack",
      "technology",
      "technologies",
      "tech",
      "experience",
      "background",
      "career",
      "work",
      "building",
      "automation",
      "ai",
      "react",
      "next",
      "next.js",
      "typescript",
      "trading",
      "full-stack",
      "frontend",
      "backend",
    ],
    directIntroPatterns: [
      "who are you",
      "tell me about yourself",
      "what do you do",
      "what are you building",
      "what are you working on",
    ],
    defaults: {
      model: "gpt-4o-mini",
      maxConversationMessages: 12,
      maxInputChars: 800,
      maxOutputTokens: 260,
      temperature: 0.5,
      topP: 0.9,
      rateLimitPerMinute: 20,
      maxQuestionsPerSession: 14,
      sessionWindowMs: 30 * 60_000,
      contextVersion: "portfolio-v1",
    },
  },
};

export default constants;
