"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Investment = {
  ticker: string;
  name: string;
  focus: string;
  symbol: string;
  accent: string;
};

const investments: Investment[] = [
  {
    ticker: "VXUS",
    name: "Vanguard Total International Stock ETF",
    focus: "International equities outside the United States",
    symbol: "NASDAQ:VXUS",
    accent: "from-sky-400/25 via-blue-500/10 to-transparent",
  },
  {
    ticker: "GDX",
    name: "VanEck Gold Miners ETF",
    focus: "Global gold-mining companies",
    symbol: "AMEX:GDX",
    accent: "from-amber-300/30 via-yellow-500/10 to-transparent",
  },
  {
    ticker: "EPU",
    name: "iShares MSCI Peru and Global Exposure ETF",
    focus: "Equities with economic exposure to Peru",
    symbol: "AMEX:EPU",
    accent: "from-red-400/25 via-rose-500/10 to-transparent",
  },
  {
    ticker: "SPUS",
    name: "SP Funds S&P 500 Sharia Industry Exclusions ETF",
    focus: "Sharia-compliant United States large-cap equities",
    symbol: "AMEX:SPUS",
    accent: "from-emerald-400/25 via-green-500/10 to-transparent",
  },
];

const highlights = [
  "Investment research",
  "Portfolio analysis",
  "Financial reporting",
  "Risk-aware decisions",
];

function TradingViewPanel({ investment }: { investment: Investment }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.dataset.tradingViewLoaded === "true") return;
    container.dataset.tradingViewLoaded = "true";

    const widgetContainer = document.createElement("div");
    widgetContainer.className =
      "tradingview-widget-container h-full min-h-[500px] w-full";

    const widget = document.createElement("div");
    widget.className =
      "tradingview-widget-container__widget h-[465px] w-full";

    const attribution = document.createElement("div");
    attribution.className =
      "tradingview-widget-copyright pt-3 text-center text-[13px] text-gray-400";

    const attributionLink = document.createElement("a");
    attributionLink.href = `https://www.tradingview.com/symbols/${investment.symbol.replace(":", "-")}/`;
    attributionLink.target = "_blank";
    attributionLink.rel = "noopener nofollow";
    attributionLink.className =
      "text-orange-300 underline decoration-orange-400/40 underline-offset-4";
    attributionLink.textContent = `${investment.ticker} market data`;

    attribution.append(attributionLink, " by TradingView");
    widgetContainer.append(widget, attribution);
    container.append(widgetContainer);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.text = JSON.stringify({
      symbols: [[investment.ticker, `${investment.symbol}|1D`]],
      chartOnly: false,
      width: "100%",
      height: "465",
      locale: "en",
      colorTheme: "dark",
      autosize: false,
      showVolume: true,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily:
        "var(--font-roboto), -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: "12",
      noTimeScale: false,
      valuesTracking: "1",
      changeMode: "price-and-percent",
      chartType: "area",
      lineWidth: 2,
      lineType: 0,
      dateRanges: [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M",
      ],
      isTransparent: true,
      backgroundColor: "rgba(9, 9, 11, 1)",
      gridLineColor: "rgba(255, 255, 255, 0.06)",
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });
    widgetContainer.append(script);
  }, [investment]);

  return (
    <div
      ref={containerRef}
      aria-label={`Interactive market information for ${investment.ticker}`}
      className="min-h-[500px] w-full"
    />
  );
}

export default function Market() {
  const [selected, setSelected] = useState<Investment | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-black px-5 pb-28 pt-32 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
          className="text-center text-5xl font-bold text-orange-400 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)] md:text-6xl"
        >
          Investment
        </motion.h1>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.15, duration: 0.8 }}
          className="mt-10 rounded-3xl border border-orange-500/20 bg-white/5 p-6 text-left shadow-lg backdrop-blur-sm sm:p-8"
        >
          <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
            My interest in business and investment developed from watching my
            mother build and manage her own business. Her example encouraged me
            to study how organisations create value, how financial information
            supports decisions, and how risk can be assessed carefully.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-gray-300 md:text-xl">
            I use this section to explore investment markets and strengthen my
            understanding of finance, accounting, and software design. The
            information is presented for general interest and does not
            constitute financial advice.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm text-orange-200"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <section aria-labelledby="current-investments" className="mt-24">
          <div className="max-w-3xl">
            <h2
              id="current-investments"
              className="mt-4 text-3xl font-bold sm:text-4xl"
            >
              Current investments
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {investments.map((investment, index) => {
              const isSelected = selected?.ticker === investment.ticker;

              return (
                <motion.button
                  key={investment.ticker}
                  type="button"
                  aria-expanded={isSelected}
                  aria-controls="selected-market-view"
                  onClick={() =>
                    setSelected(isSelected ? null : investment)
                  }
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: reduceMotion ? 0 : index * 0.08,
                    duration: 0.5,
                  }}
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                  className={`relative min-h-52 overflow-hidden rounded-[1.75rem] border p-6 text-left shadow-xl transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 ${
                    isSelected
                      ? "border-orange-300 bg-orange-400/10"
                      : "border-white/10 bg-zinc-950 hover:border-orange-400/40"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-br ${investment.accent}`}
                  />
                  <span className="relative flex h-full flex-col">
                    <span className="font-mono text-sm font-semibold tracking-[0.22em] text-orange-200">
                      {investment.ticker}
                    </span>
                    <span className="mt-5 text-xl font-bold leading-snug text-white">
                      {investment.name}
                    </span>
                    <span className="mt-auto pt-5 text-sm leading-relaxed text-gray-300">
                      {investment.focus}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-300">
                      {isSelected ? "Close market view" : "View market data"}
                      <i
                        aria-hidden="true"
                        className={`fas ${
                          isSelected ? "fa-minus" : "fa-arrow-right"
                        } text-xs`}
                      />
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                id="selected-market-view"
                key={selected.ticker}
                initial={
                  reduceMotion ? false : { opacity: 0, height: 0, y: 16 }
                }
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 8 }}
                transition={{ duration: reduceMotion ? 0 : 0.45 }}
                className="mt-8 overflow-hidden"
              >
                <div className="rounded-[2rem] border border-orange-400/20 bg-zinc-950 p-4 shadow-2xl sm:p-6">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-sm text-orange-300">
                        {selected.ticker}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-white">
                        {selected.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      aria-label={`Close ${selected.ticker} market view`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:border-orange-300 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
                    >
                      <i aria-hidden="true" className="fas fa-xmark" />
                    </button>
                  </div>
                  <TradingViewPanel investment={selected} />
                  <p className="mt-4 text-sm leading-relaxed text-gray-400">
                    Market information may be real-time, delayed, or end-of-day
                    depending on the exchange and data source. It shows the
                    market value of one ETF unit, not the value of my personal
                    position.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
