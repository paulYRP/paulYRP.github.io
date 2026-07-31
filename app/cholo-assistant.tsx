"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type TurnstileOptions = {
  sitekey: string;
  theme: "dark";
  size: "flexible";
  action: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

const siteApiUrl = (process.env.NEXT_PUBLIC_SITE_API_URL ?? "").replace(
  /\/$/,
  "",
);
const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
  "0x4AAAAAAECS3yC0_dwCTef1";

function TurnstileWidget({
  onTokenChange,
}: {
  onTokenChange: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);

  useEffect(() => {
    if (!scriptReady || !window.turnstile || !containerRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: turnstileSiteKey,
      theme: "dark",
      size: "flexible",
      action: "website_message",
      callback: onTokenChange,
      "expired-callback": () => onTokenChange(""),
      "error-callback": () => onTokenChange(""),
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [onTokenChange, scriptReady]);

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={() => setScriptReady(true)}
        onError={() => setScriptFailed(true)}
      />
      <div ref={containerRef} className="min-h-[65px] w-full" />
      {scriptFailed && (
        <p role="alert" className="text-sm text-red-300">
          The security check could not load. Please try again later.
        </p>
      )}
    </>
  );
}

export default function CholoAssistant() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const sessionIdRef = useRef("");
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<"chat" | "send">("chat");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello. I can explain public information on this website or help you prepare a short message.",
    },
  ]);
  const [chatPending, setChatPending] = useState(false);
  const [chatStatus, setChatStatus] = useState("");
  const [draftMessage, setDraftMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [sendPending, setSendPending] = useState(false);
  const [sendStatus, setSendStatus] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const askAssistant = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = chatInput.trim();
    if (!content || !siteApiUrl || chatPending) return;

    if (!sessionIdRef.current) {
      sessionIdRef.current = window.crypto.randomUUID();
    }
    const sessionId = sessionIdRef.current;

    const userMessage: ChatMessage = { role: "user", content };
    const nextMessages = [...messages, userMessage].slice(-6);
    setMessages(nextMessages);
    setChatInput("");
    setChatPending(true);
    setChatStatus("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch(`${siteApiUrl}/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, messages: nextMessages }),
        signal: controller.signal,
      });
      const result = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !result.reply) {
        throw new Error(result.error || "The assistant is unavailable.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: result.reply as string },
      ]);
    } catch {
      setChatStatus(
        "The assistant is temporarily unavailable. Your conversation has not been stored.",
      );
    } finally {
      window.clearTimeout(timeout);
      setChatPending(false);
    }
  };

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = draftMessage.trim();
    if (
      !message ||
      !consent ||
      !turnstileToken ||
      !siteApiUrl ||
      sendPending
    ) {
      return;
    }

    if (!sessionIdRef.current) {
      sessionIdRef.current = window.crypto.randomUUID();
    }
    const sessionId = sessionIdRef.current;

    setSendPending(true);
    setSendStatus("");

    try {
      const response = await fetch(`${siteApiUrl}/v1/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message,
          turnstileToken,
          source: pathname,
        }),
      });
      const result = (await response.json()) as {
        reference?: string;
        error?: string;
      };

      if (!response.ok || !result.reference) {
        throw new Error(result.error || "The message could not be sent.");
      }

      setSendStatus(`Message sent privately. Reference: ${result.reference}`);
      setDraftMessage("");
      setConsent(false);
      setTurnstileToken("");
      setTurnstileKey((key) => key + 1);
    } catch {
      setSendStatus(
        "The message could not be sent. Nothing was intentionally stored by this page.",
      );
      setTurnstileToken("");
      setTurnstileKey((key) => key + 1);
    } finally {
      setSendPending(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            aria-label="Website assistant"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
            className="fixed bottom-4 right-4 z-[70] flex h-[min(42rem,calc(100dvh-2rem))] w-[calc(100vw-2rem)] max-w-[25rem] flex-col overflow-hidden rounded-[1.75rem] border border-orange-400/30 bg-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:bottom-6 sm:right-6"
          >
            <header className="flex min-h-16 items-center justify-between border-b border-white/10 bg-black/75 px-4 py-3">
              <Image
                src="/home/images/image6.png"
                alt="CHOLO"
                width={88}
                height={30}
                className="site-logo-glow h-auto w-[88px]"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Hide website assistant"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gray-300 transition hover:bg-white/10 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                <i aria-hidden="true" className="fas fa-minus" />
              </button>
            </header>

            <div
              role="tablist"
              aria-label="Assistant options"
              className="grid grid-cols-2 border-b border-white/10 bg-black/45 p-2"
            >
              {(["chat", "send"] as const).map((panel) => {
                const isActive = activePanel === panel;
                return (
                  <button
                    key={panel}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActivePanel(panel)}
                    className={`min-h-11 rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${
                      isActive
                        ? "bg-orange-500 text-black"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {panel === "chat" ? "Chat" : "Send message"}
                  </button>
                );
              })}
            </div>

            {!siteApiUrl && (
              <p
                role="status"
                className="border-b border-amber-300/20 bg-amber-300/10 px-4 py-3 text-xs leading-relaxed text-amber-100"
              >
                The assistant is being connected and is temporarily offline.
              </p>
            )}

            {activePanel === "chat" ? (
              <div
                role="tabpanel"
                aria-label="Assistant chat"
                className="flex min-h-0 flex-1 flex-col"
              >
                <div
                  aria-live="polite"
                  className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4"
                >
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={`rounded-2xl p-3 text-sm ${
                        message.role === "assistant"
                          ? "mr-7 bg-orange-400/10 text-gray-200"
                          : "ml-7 bg-white/10 text-white"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <Image
                          src="/home/images/image6.png"
                          alt=""
                          width={46}
                          height={16}
                          className="site-logo-glow h-auto w-[46px]"
                        />
                      ) : (
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-300">
                          You
                        </p>
                      )}
                      <p className="mt-1.5 whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setDraftMessage(message.content);
                            setActivePanel("send");
                          }}
                          className="mt-2 min-h-10 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-gray-200 transition hover:border-orange-300 hover:text-orange-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                        >
                          Use as final message
                        </button>
                      )}
                    </div>
                  ))}
                  {chatPending && (
                    <p className="text-sm text-orange-200" role="status">
                      Thinking...
                    </p>
                  )}
                  {chatStatus && (
                    <p role="status" className="text-sm text-amber-200">
                      {chatStatus}
                    </p>
                  )}
                </div>

                <form
                  onSubmit={askAssistant}
                  className="border-t border-white/10 bg-black/55 p-3"
                >
                  <label htmlFor="assistant-question" className="sr-only">
                    Your question
                  </label>
                  <textarea
                    id="assistant-question"
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !event.shiftKey &&
                        !event.nativeEvent.isComposing
                      ) {
                        event.preventDefault();
                        event.currentTarget.form?.requestSubmit();
                      }
                    }}
                    maxLength={600}
                    rows={2}
                    disabled={!siteApiUrl || chatPending}
                    className="w-full resize-none rounded-2xl border border-white/15 bg-black/50 p-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 disabled:cursor-not-allowed disabled:opacity-55"
                    placeholder="Ask about this website..."
                  />
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-gray-500">
                      Enter to send · Shift + Enter for a new line
                    </span>
                    <button
                      type="submit"
                      aria-label="Send question"
                      disabled={
                        !siteApiUrl ||
                        !chatInput.trim() ||
                        chatPending
                      }
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500 text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                    >
                      <i aria-hidden="true" className="fas fa-paper-plane" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div
                role="tabpanel"
                aria-label="Send a private message"
                className="min-h-0 flex-1 overflow-y-auto p-4"
              >
                <p className="text-sm leading-relaxed text-gray-300">
                  Review exactly what will be stored. Do not include sensitive
                  personal information.
                </p>

                <form onSubmit={sendMessage} className="mt-4">
                  <label
                    htmlFor="final-message"
                    className="text-sm font-semibold text-gray-200"
                  >
                    Final message
                  </label>
                  <textarea
                    id="final-message"
                    value={draftMessage}
                    onChange={(event) => setDraftMessage(event.target.value)}
                    maxLength={2_000}
                    rows={6}
                    disabled={!siteApiUrl || sendPending}
                    className="mt-2 w-full resize-y rounded-2xl border border-white/15 bg-black/50 p-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 disabled:cursor-not-allowed disabled:opacity-55"
                    placeholder="Write your final message..."
                  />
                  <p className="mt-1 text-right text-[11px] text-gray-500">
                    {draftMessage.length}/2,000
                  </p>

                  <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-gray-300">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      disabled={!siteApiUrl || sendPending}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-orange-500"
                    />
                    <span>
                      I understand that this message will be stored as a private
                      GitHub Issue for review.
                    </span>
                  </label>

                  {siteApiUrl && (
                    <div className="mt-4 max-w-full overflow-hidden">
                      <TurnstileWidget
                        key={turnstileKey}
                        onTokenChange={setTurnstileToken}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      !siteApiUrl ||
                      !draftMessage.trim() ||
                      !consent ||
                      !turnstileToken ||
                      sendPending
                    }
                    className="mt-4 min-h-12 w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                  >
                    {sendPending
                      ? "Sending privately..."
                      : "Send private message"}
                  </button>

                  {sendStatus && (
                    <p role="status" className="mt-3 text-sm text-orange-200">
                      {sendStatus}
                    </p>
                  )}
                </form>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          type="button"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          onClick={() => setIsOpen(true)}
          aria-label="Open website assistant"
          className="fixed bottom-4 right-4 z-[70] flex h-16 w-20 items-center justify-center rounded-full border border-orange-400/30 bg-zinc-950 px-3 shadow-[0_16px_50px_rgba(0,0,0,0.65)] transition hover:border-orange-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 sm:bottom-6 sm:right-6"
        >
          <Image
            src="/home/images/image6.png"
            alt=""
            width={62}
            height={21}
            className="site-logo-glow h-auto w-[62px]"
          />
        </motion.button>
      )}
    </>
  );
}
