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

  for (const entry of value.split(",").map((segment) => segment.trim())) {
    const params = entry.split(";").map((param) => param.trim());
    const forParam = params.find((param) => param.toLowerCase().startsWith("for="));
    if (!forParam) {
      continue;
    }

    const rawValue = forParam.slice(4).trim().replace(/^"|"$/g, "");
    if (rawValue) {
      return rawValue;
    }
  }
  return null;
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
  if (normalized.toLowerCase() === "unknown" || normalized.startsWith("_")) {
    return null;
  }

  return normalized || null;
};

const hashString = (value: string) => {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return (hash >>> 0).toString(36);
};

const createAnonymousClientId = (request: Request) => {
  const anonymousSignals = [
    request.headers.get("x-vercel-id")?.trim(),
    request.headers.get("x-request-id")?.trim(),
    request.headers.get("user-agent")?.trim(),
    request.headers.get("accept-language")?.trim(),
    request.headers.get("sec-ch-ua")?.trim(),
  ].filter(Boolean);

  if (anonymousSignals.length === 0) {
    return "anon:unknown";
  }

  return `anon:${hashString(anonymousSignals.join("|"))}`;
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

  return createAnonymousClientId(request);
};

export default getClientId;
