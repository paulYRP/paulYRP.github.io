import { describe, expect, it, vi } from "vitest";
import { Env, handleRequest } from "./index";

const allowedOrigin = "https://paulyrp.github.io";
const sessionId = "123e4567-e89b-42d3-a456-426614174000";

function environment(): Env {
  return {
    AI: {
      run: vi.fn(async () => ({ response: "A concise public answer." })),
    },
    CHAT_RATE_LIMITER: {
      limit: vi.fn(async () => ({ success: true })),
    },
    MESSAGE_RATE_LIMITER: {
      limit: vi.fn(async () => ({ success: true })),
    },
    ALLOWED_ORIGINS: allowedOrigin,
    TURNSTILE_HOSTNAMES: "paulyrp.github.io",
    GITHUB_APP_ID: "4441027",
    GITHUB_INSTALLATION_ID: "150201889",
    GITHUB_OWNER: "paulYRP",
    GITHUB_REPO: "paulyrp-website-messages",
    TURNSTILE_SECRET_KEY: "secret",
    GITHUB_APP_PRIVATE_KEY: "private-key",
  };
}

describe("Worker routing and CORS", () => {
  it("returns a non-sensitive health response", async () => {
    const response = await handleRequest(
      new Request("https://worker.example/health"),
      environment(),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });

  it("rejects an unapproved origin without reflecting it", async () => {
    const response = await handleRequest(
      new Request("https://worker.example/v1/chat", {
        method: "POST",
        headers: {
          Origin: "https://attacker.example",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          messages: [{ role: "user", content: "Hello" }],
        }),
      }),
      environment(),
    );

    expect(response.status).toBe(403);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it("returns a bounded AI response to the configured origin", async () => {
    const response = await handleRequest(
      new Request("https://worker.example/v1/chat", {
        method: "POST",
        headers: {
          Origin: allowedOrigin,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          messages: [{ role: "user", content: "What is this website?" }],
        }),
      }),
      environment(),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      allowedOrigin,
    );
    await expect(response.json()).resolves.toEqual({
      reply: "A concise public answer.",
    });
  });

  it("rejects non-JSON request bodies", async () => {
    const response = await handleRequest(
      new Request("https://worker.example/v1/chat", {
        method: "POST",
        headers: {
          Origin: allowedOrigin,
          "Content-Type": "text/plain",
        },
        body: "not json",
      }),
      environment(),
    );

    expect(response.status).toBe(400);
  });
});
