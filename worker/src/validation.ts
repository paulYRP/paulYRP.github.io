export type PublicChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatPayload = {
  sessionId: string;
  messages: PublicChatMessage[];
};

export type MessagePayload = {
  sessionId: string;
  message: string;
  turnstileToken: string;
  source: "/" | "/about" | "/research" | "/market" | "/sport" | "/contact";
};

export class ValidationError extends Error {
  constructor(message = "Invalid request.") {
    super(message);
    this.name = "ValidationError";
  }
}

const sessionIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const disallowedControlCharacters = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const bidirectionalControlCharacters = /[\u202A-\u202E\u2066-\u2069]/g;
const allowedSources = new Set([
  "/",
  "/about",
  "/research",
  "/market",
  "/sport",
  "/contact",
] as const);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normaliseText(value: unknown, maximumLength: number): string {
  if (typeof value !== "string") throw new ValidationError();

  const text = value
    .replace(/\r\n?/g, "\n")
    .replace(disallowedControlCharacters, "")
    .replace(bidirectionalControlCharacters, "")
    .trim();

  if (!text || text.length > maximumLength) throw new ValidationError();
  return text;
}

function parseSessionId(value: unknown): string {
  if (typeof value !== "string" || !sessionIdPattern.test(value)) {
    throw new ValidationError();
  }
  return value.toLowerCase();
}

export function parseChatPayload(value: unknown): ChatPayload {
  if (!isRecord(value) || !Array.isArray(value.messages)) {
    throw new ValidationError();
  }

  if (value.messages.length < 1 || value.messages.length > 6) {
    throw new ValidationError();
  }

  let totalCharacters = 0;
  const messages = value.messages.map((item): PublicChatMessage => {
    if (
      !isRecord(item) ||
      (item.role !== "user" && item.role !== "assistant")
    ) {
      throw new ValidationError();
    }

    const content = normaliseText(item.content, 600);
    totalCharacters += content.length;
    return { role: item.role, content };
  });

  if (
    totalCharacters > 2_400 ||
    messages[messages.length - 1]?.role !== "user"
  ) {
    throw new ValidationError();
  }

  return {
    sessionId: parseSessionId(value.sessionId),
    messages,
  };
}

export function parseMessagePayload(value: unknown): MessagePayload {
  if (!isRecord(value)) throw new ValidationError();

  const turnstileToken = normaliseText(value.turnstileToken, 2_048);
  if (
    typeof value.source !== "string" ||
    !allowedSources.has(value.source as MessagePayload["source"])
  ) {
    throw new ValidationError();
  }

  return {
    sessionId: parseSessionId(value.sessionId),
    message: normaliseText(value.message, 2_000),
    turnstileToken,
    source: value.source as MessagePayload["source"],
  };
}

export function parseAllowedValues(value: string): Set<string> {
  return new Set(
    value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
  );
}

export function isAllowedOrigin(
  origin: string | null,
  allowedOrigins: string,
): origin is string {
  return Boolean(origin && parseAllowedValues(allowedOrigins).has(origin));
}

export function escapeGitHubText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/@/g, "@\u200B");
}
