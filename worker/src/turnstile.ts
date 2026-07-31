import { parseAllowedValues } from "./validation";

type TurnstileResponse = {
  success?: boolean;
  hostname?: string;
  action?: string;
};

export type TurnstileConfiguration = {
  secret: string;
  expectedHostnames: string;
  expectedAction: string;
};

export async function verifyTurnstile(
  token: string,
  configuration: TurnstileConfiguration,
  fetcher: typeof fetch = fetch,
): Promise<boolean> {
  if (!configuration.secret) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetcher(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: configuration.secret,
          response: token,
          idempotency_key: crypto.randomUUID(),
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) return false;
    const result = (await response.json()) as TurnstileResponse;
    const hostnames = parseAllowedValues(configuration.expectedHostnames);

    return Boolean(
      result.success &&
        result.hostname &&
        hostnames.has(result.hostname) &&
        result.action === configuration.expectedAction,
    );
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
