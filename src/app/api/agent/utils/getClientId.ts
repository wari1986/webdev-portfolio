const readForwardedFor = (value: string | null) => {
  if (!value) {
    return null;
  }

  const firstHop = value
    .split(",")
    .map((segment) => segment.trim())
    .find(Boolean);

  return firstHop || null;
};

const readForwardedHeader = (value: string | null) => {
  if (!value) {
    return null;
  }

  const entry = value
    .split(",")
    .map((segment) => segment.trim())
    .find((segment) => segment.toLowerCase().startsWith("for="));

  if (!entry) {
    return null;
  }

  const rawValue = entry.slice(4).trim().replace(/^"|"$/g, "");
  return rawValue || null;
};

const normalizeAddress = (value: string | null) => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const bracketedIpv6 = trimmed.match(/^\[([^\]]+)\](?::\d+)?$/);
  if (bracketedIpv6) {
    return bracketedIpv6[1];
  }

  const ipv4WithPort = trimmed.match(/^(\d{1,3}(?:\.\d{1,3}){3})(?::\d+)?$/);
  if (ipv4WithPort) {
    return ipv4WithPort[1];
  }

  const normalized = trimmed.replace(/^"|"$/g, "");
  return normalized || null;
};

const getClientId = (request: Request) => {
  const prioritizedAddress = [
    request.headers.get("x-real-ip"),
    request.headers.get("cf-connecting-ip"),
    readForwardedFor(request.headers.get("x-forwarded-for")),
    readForwardedFor(request.headers.get("x-vercel-forwarded-for")),
    readForwardedHeader(request.headers.get("forwarded")),
  ]
    .map(normalizeAddress)
    .find(Boolean);

  if (prioritizedAddress) {
    return prioritizedAddress;
  }

  const userAgent = request.headers.get("user-agent")?.trim() || "unknown-agent";
  const acceptLanguage = request.headers.get("accept-language")?.trim() || "unknown-lang";

  return `anon:${userAgent}:${acceptLanguage}`;
};

export default getClientId;
