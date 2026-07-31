import { describe, expect, it } from "vitest";
import {
  escapeGitHubText,
  isAllowedOrigin,
  parseChatPayload,
  parseMessagePayload,
  ValidationError,
} from "./validation";

const sessionId = "123e4567-e89b-42d3-a456-426614174000";

describe("request validation", () => {
  it("accepts a bounded chat ending with a user message", () => {
    expect(
      parseChatPayload({
        sessionId,
        messages: [{ role: "user", content: "  Hello  " }],
      }),
    ).toEqual({
      sessionId,
      messages: [{ role: "user", content: "Hello" }],
    });
  });

  it("rejects oversized chat content", () => {
    expect(() =>
      parseChatPayload({
        sessionId,
        messages: [{ role: "user", content: "x".repeat(601) }],
      }),
    ).toThrow(ValidationError);
  });

  it("accepts messages from every public tab", () => {
    for (const source of [
      "/",
      "/about",
      "/research",
      "/market",
      "/sport",
      "/contact",
    ]) {
      expect(
        parseMessagePayload({
          sessionId,
          message: "Public website message",
          turnstileToken: "token",
          source,
        }).source,
      ).toBe(source);
    }
  });

  it("rejects an unrecognised source path", () => {
    expect(() =>
      parseMessagePayload({
        sessionId,
        message: "Message",
        turnstileToken: "token",
        source: "/admin",
      }),
    ).toThrow(ValidationError);
  });
});

describe("security helpers", () => {
  it("allows only an exact configured origin", () => {
    expect(
      isAllowedOrigin(
        "https://paulyrp.github.io",
        "https://paulyrp.github.io",
      ),
    ).toBe(true);
    expect(
      isAllowedOrigin(
        "https://paulyrp.github.io.attacker.example",
        "https://paulyrp.github.io",
      ),
    ).toBe(false);
  });

  it("neutralises mentions and HTML in GitHub issue text", () => {
    expect(escapeGitHubText("<b>@everyone</b>")).toBe(
      "&lt;b&gt;@\u200Beveryone&lt;/b&gt;",
    );
  });
});
