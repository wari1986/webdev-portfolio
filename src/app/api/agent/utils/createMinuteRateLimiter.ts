const createMinuteRateLimiter = (rateLimitPerMinute: number) => {
  const minuteBucket = new Map<string, { count: number; resetAt: number }>();

  return (clientId: string) => {
    const now = Date.now();
    const existing = minuteBucket.get(clientId);

    if (!existing || now >= existing.resetAt) {
      minuteBucket.set(clientId, { count: 1, resetAt: now + 60_000 });
      return false;
    }

    if (existing.count >= rateLimitPerMinute) {
      return true;
    }

    existing.count += 1;
    minuteBucket.set(clientId, existing);
    return false;
  };
};

export default createMinuteRateLimiter;
