type LimitCheck = {
  allowed: boolean;
  count: number;
};

const createSessionQuestionLimiter = (maxQuestions: number, sessionWindowMs: number) => {
  const sessionBucket = new Map<string, { count: number; resetAt: number }>();

  return (sessionKey: string): LimitCheck => {
    const now = Date.now();
    const existing = sessionBucket.get(sessionKey);

    if (!existing || now >= existing.resetAt) {
      sessionBucket.set(sessionKey, { count: 1, resetAt: now + sessionWindowMs });
      return { allowed: true, count: 1 };
    }

    if (existing.count >= maxQuestions) {
      return { allowed: false, count: existing.count };
    }

    existing.count += 1;
    sessionBucket.set(sessionKey, existing);
    return { allowed: true, count: existing.count };
  };
};

export default createSessionQuestionLimiter;
