import { describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "./turnstile";

describe("Turnstile verification", () => {
  it("requires the configured hostname and action", async () => {
    const fetcher = vi.fn(async () =>
      Response.json({
        success: true,
        hostname: "paulyrp.github.io",
        action: "website_message",
      }),
    ) as unknown as typeof fetch;

    await expect(
      verifyTurnstile(
        "token",
        {
          secret: "test-secret",
          expectedHostnames: "paulyrp.github.io",
          expectedAction: "website_message",
        },
        fetcher,
      ),
    ).resolves.toBe(true);
  });

  it("rejects a valid token issued for another hostname", async () => {
    const fetcher = vi.fn(async () =>
      Response.json({
        success: true,
        hostname: "attacker.example",
        action: "website_message",
      }),
    ) as unknown as typeof fetch;

    await expect(
      verifyTurnstile(
        "token",
        {
          secret: "test-secret",
          expectedHostnames: "paulyrp.github.io",
          expectedAction: "website_message",
        },
        fetcher,
      ),
    ).resolves.toBe(false);
  });
});
