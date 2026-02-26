import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleDot,
  Grid3X3,
  Speaker,
} from "lucide-react";
import { SlideGraphic } from "./SlideGraphics";

/**
 * Single-file slide deck for the Encode / freeCodeCamp workshop.
 * - Tailwind assumed.
 * - Keyboard nav: ←/→, Space, Home/End
 * - Presenter view toggle: P
 * - Overview grid toggle: O
 */

const PENTAFORM_PDF_PATH = "/pentaform-ai-ecosystem.pdf";
const PENTAFORM_PDF_PAGE_COUNT = 18;

const WORKSHOP_SLIDES = [
  {
    title: "Multimodal Models",
    kicker: "Local-first AI Workshop",
    body: (
      <>
        <p className="max-w-3xl text-lg leading-relaxed text-white/80">
          Multimodal models understand more than text - they can reason over
          images, audio, video, and documents.
        </p>
        <div className="mt-8 grid max-w-3xl grid-cols-2 gap-4">
          {[
            ["Text", "Instructions, chat, tool calls"],
            ["Images", "Screenshots, UI, photos"],
            ["Audio", "Speech, background context"],
            ["Video", "Events, actions, motion"],
          ].map(([h, d]) => (
            <div
              key={h}
              className="rounded-2xl border border-white/10 bg-black/25 p-4"
            >
              <div className="text-white">{h}</div>
              <div className="mt-1 text-sm text-white/70">{d}</div>
            </div>
          ))}
        </div>
      </>
    ),
    notes:
      "Define multimodal simply. Emphasize shared representation across modalities. This audience cares about running it locally.",
  },
  {
    title: "Cloud vs Local",
    kicker: "Tradeoffs that matter",
    hideGraphic: true,
    body: (
      <div className="mt-6 w-full max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
            <div className="text-lg text-white">Cloud</div>
            <ul className="mt-3 space-y-2 text-white/75">
              <li>• Easy scale, best frontier quality</li>
              <li>• Network latency + ongoing token cost</li>
              <li>• Less control over privacy + data flow</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
            <div className="text-lg text-white">Local</div>
            <ul className="mt-3 space-y-2 text-white/75">
              <li>• Private by default</li>
              <li>• Low latency, offline-capable</li>
              <li>• Quantization + hardware constraints</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-6">
          <div className="text-white/85">
            For this workshop, we focus on{" "}
            <span className="font-semibold text-white">local-first</span>: run
            models on your laptop / mini-PC, keep data private, iterate fast.
          </div>
        </div>
      </div>
    ),
    notes:
      "Keep it practical: latency, privacy, cost, control. Tie back to OpenClaw philosophy.",
  },
  {
    title: "What makes a model good locally?",
    kicker: "Builder checklist",
    hideGraphic: true,
    body: (
      <div className="mt-6 w-full max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          {[
            "Runs in Ollama / LM Studio",
            "Quantizes well (4-8 bit)",
            "Fast first-token latency",
            "Good OCR + screenshot understanding",
            "Stable + low hallucination on images",
            "Fits your VRAM budget",
          ].map((t) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-black/25 p-5 text-white/80"
            >
              <div className="text-white">{t}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-6">
          <div className="text-white/85">
            <span className="text-white">Rule of thumb:</span> the
            best model is the one you can run reliably on your machine.
          </div>
        </div>
      </div>
    ),
    notes: "Keep it actionable. This is what people ask during setup.",
  },
  {
    title: "Good Local Multimodal Models",
    kicker: "Practical VLM choices",
    compactHeading: true,
    body: (
      <div className="mt-4 grid w-full max-w-5xl grid-cols-2 gap-3">
        {[
          {
            name: "Qwen2.5-Omni-7B",
            why: "Native multimodal model (text + image + audio + video)",
            fit: "Desktop / server",
            href: "https://huggingface.co/Qwen/Qwen2.5-Omni-7B",
            color: "#8B5CF6",
            facts: [
              ["Params", "7B"],
              ["OmniBench avg", "56.13"],
              ["15s BF16 VRAM", "31.11GB"],
            ],
          },
          {
            name: "MiniCPM-V 2.6",
            why: "Efficient, strong small-model performance",
            fit: "Laptop / edge",
            href: "https://huggingface.co/openbmb/MiniCPM-V-2_6",
            color: "#06B6D4",
            facts: [
              ["Params", "8B"],
              ["Ollama size", "5.5GB"],
              ["OpenCompass avg", "65.2"],
            ],
          },
          {
            name: "Qwen2.5-VL-7B",
            why: "Strong OCR + visual reasoning; multilingual",
            fit: "Desktop / mini-PC",
            href: "https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct",
            color: "#F59E0B",
            facts: [
              ["Params", "8.29B"],
              ["Ollama size", "6.0GB"],
              ["MMMU (val)", "58.6"],
            ],
          },
          {
            name: "Gemma 3 4B",
            why: "Small multimodal model with strong local footprint",
            fit: "Laptop-friendly",
            href: "https://huggingface.co/google/gemma-3-4b-it",
            color: "#22C55E",
            facts: [
              ["Params", "4.3B"],
              ["Ollama size", "3.3GB"],
              ["Context", "128K"],
            ],
          },
        ].map((m) => (
          <div
            key={m.name}
            className="rounded-2xl border bg-black/25 p-4"
            style={{ borderColor: `${m.color}66` }}
          >
            <div className="flex items-center justify-between">
              <a
                href={m.href}
                target="_blank"
                rel="noreferrer"
                className="text-base text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white/80"
              >
                {m.name}
              </a>
              <div
                className="rounded-full border bg-black/30 px-3 py-1 text-xs text-white/80"
                style={{ borderColor: `${m.color}88` }}
              >
                {m.fit}
              </div>
            </div>
            <div className="mt-1.5 text-white/75">{m.why}</div>
            <div className="mt-2 text-[11px] leading-relaxed text-white/70">
              {m.facts.map(([label, value], factIndex) => (
                <span key={label}>
                  {factIndex > 0 ? " · " : ""}
                  <span className="text-white/55">{label}:</span> {value}
                </span>
              ))}
            </div>
            <a
              href={m.href}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs transition hover:text-white"
              style={{ color: m.color }}
            >
              View on Hugging Face
            </a>
          </div>
        ))}
      </div>
    ),
    notes:
      "Name-drop a few strong local options. Don't overclaim 'best' - emphasize 'good for local demos'.",
  },
];

const PENTAFORM_SLIDES = Array.from(
  { length: PENTAFORM_PDF_PAGE_COUNT },
  (_, pageIndex) => ({
    title: `Pentaform AI Ecosystem · ${pageIndex + 1}`,
    kicker: "Pentaform AI Ecosystem",
    hideGraphic: true,
    pdfPage: pageIndex + 1,
    body: null,
    notes: `Source PDF page ${pageIndex + 1}.`,
  })
);

const SLIDES = [...PENTAFORM_SLIDES, ...WORKSHOP_SLIDES];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function useHotkeys(handlers) {
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) {
        return;
      }

      const k = e.key;
      if (handlers[k]) {
        e.preventDefault();
        handlers[k](e);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlers]);
}

function ProgressDots({ index, setIndex }) {
  return (
    <div className="flex items-center gap-2">
      {SLIDES.map((_, i) => {
        const active = i === index;
        const Icon = active ? CircleDot : Circle;
        return (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-full p-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label={`Go to slide ${i + 1}`}
          >
            <Icon className={`h-4 w-4 ${active ? "text-white" : "text-white/40"}`} />
          </button>
        );
      })}
    </div>
  );
}

function SlideFrame({ slide, index, staticMode = false }) {
  if (slide.pdfPage) {
    return (
      <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white">
        <iframe
          src={`${PENTAFORM_PDF_PATH}#page=${slide.pdfPage}&view=FitH`}
          title={`Pentaform AI Ecosystem page ${slide.pdfPage}`}
          className="h-full w-full"
          loading={staticMode ? "eager" : "lazy"}
        />
      </div>
    );
  }

  const showVisual = !slide.hideGraphic;
  const visualClass = staticMode ? "block" : "hidden xl:block";
  const contentGridClass = showVisual
    ? "grid h-full gap-5 xl:grid-cols-[minmax(0,1fr)_320px]"
    : "grid h-full gap-5 grid-cols-1";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-wide text-white/60">
            {slide.kicker}
          </div>
          <h1
            className={`font-heading mt-2 leading-tight text-white ${
              slide.compactHeading
                ? "text-3xl md:text-4xl lg:text-[2.8rem]"
                : "text-4xl md:text-5xl lg:text-[3.2rem]"
            }`}
          >
            {slide.title}
          </h1>
        </div>
        <div className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white/70 xl:block">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <div className="mt-4 min-h-0 flex-1">
        <div className={contentGridClass}>
          <div className="min-w-0">{slide.body}</div>
          {showVisual
            ? (staticMode ? (
                <div className={visualClass}>
                  <SlideGraphic index={index} />
                </div>
              ) : (
                <motion.div
                  className={visualClass}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                >
                  <SlideGraphic index={index} />
                </motion.div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

function PresenterPanel({ slide, index }) {
  return (
    <div className="h-full w-full rounded-3xl border border-white/10 bg-black/25 p-6">
      <div className="flex items-center justify-between">
        <div className="text-white">Presenter Notes</div>
        <div className="text-sm text-white/60">
          Slide {index + 1} / {SLIDES.length}
        </div>
      </div>
      <div className="mt-4 whitespace-pre-wrap leading-relaxed text-white/80">
        {slide.notes || "-"}
      </div>
    </div>
  );
}

export default function EncodeWorkshopDeck() {
  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);
  const [presenter, setPresenter] = useState(false);
  const printMode =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("print-pdf");

  const go = useCallback(
    (delta) => setIndex((i) => clamp(i + delta, 0, SLIDES.length - 1)),
    []
  );

  const handlers = useMemo(
    () => ({
      ArrowRight: () => go(1),
      ArrowLeft: () => go(-1),
      " ": () => go(1),
      Home: () => setIndex(0),
      End: () => setIndex(SLIDES.length - 1),
      o: () => setOverview((v) => !v),
      O: () => setOverview((v) => !v),
      p: () => setPresenter((v) => !v),
      P: () => setPresenter((v) => !v),
      Escape: () => {
        setOverview(false);
        setPresenter(false);
      },
    }),
    [go]
  );

  useHotkeys(handlers);

  if (printMode) {
    return (
      <div className="deck-typography print-deck bg-[#0b0b0f] text-white">
        {SLIDES.map((s, i) => (
          <section key={i} className="print-slide">
            <div className="print-slide-inner rounded-[28px] border border-white/10 bg-gradient-to-b from-white/5 to-black/40 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              <SlideFrame slide={s} index={i} staticMode />
            </div>
          </section>
        ))}
      </div>
    );
  }

  const slide = SLIDES[index];

  return (
    <div className="deck-typography min-h-screen w-full bg-[#0b0b0f] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
            <span className="font-semibold">E</span>
          </div>
          <div>
            <div className="text-white">Encode Workshop Deck</div>
            <div className="text-sm text-white/60">
              ←/→ to navigate · O overview · P presenter
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOverview((v) => !v)}
            className={`rounded-2xl border border-white/10 px-3 py-2 ${
              overview ? "bg-white/15" : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-sm text-white/80">
              <Grid3X3 className="h-4 w-4" /> Overview
            </span>
          </button>
          <button
            onClick={() => setPresenter((v) => !v)}
            className={`rounded-2xl border border-white/10 px-3 py-2 ${
              presenter ? "bg-white/15" : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-sm text-white/80">
              <Speaker className="h-4 w-4" /> Notes
            </span>
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        {overview ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i);
                  setOverview(false);
                }}
                className={`rounded-3xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10 ${
                  i === index ? "ring-2 ring-white/25" : ""
                }`}
              >
                <div className="text-xs uppercase tracking-wide text-white/60">
                  Slide {i + 1}
                </div>
                <div className="mt-2 text-lg text-white">{s.title}</div>
                <div className="mt-2 line-clamp-2 text-sm text-white/60">
                  {s.kicker}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className={`grid gap-4 ${presenter ? "grid-cols-1 lg:grid-cols-5" : "grid-cols-1"}`}>
            <div className={presenter ? "lg:col-span-3" : ""}>
              <div
                className="relative mx-auto aspect-[16/9] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/5 to-black/40 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
                style={{ width: "min(100%, calc((100dvh - 210px) * 16 / 9))" }}
              >
                <div className="absolute inset-0 p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                      transition={{ duration: 0.25 }}
                      className="h-full"
                    >
                      <SlideFrame slide={slide} index={index} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => go(-1)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                  >
                    <span className="inline-flex items-center gap-2 text-sm text-white/80">
                      <ChevronLeft className="h-4 w-4" /> Prev
                    </span>
                  </button>
                  <button
                    onClick={() => go(1)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                  >
                    <span className="inline-flex items-center gap-2 text-sm text-white/80">
                      Next <ChevronRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>

                <ProgressDots index={index} setIndex={setIndex} />

                <div className="text-sm text-white/60">
                  {index + 1} / {SLIDES.length}
                </div>
              </div>
            </div>

            {presenter ? (
              <div className="lg:col-span-2">
                <PresenterPanel slide={slide} index={index} />
                <div className="mt-4 rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="text-white">Quick prompts</div>
                  <div className="mt-3 space-y-2 text-sm text-white/75">
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                      "Show me an example screenshot and ask the model to explain
                      it."
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                      "Try OCR on a receipt. What's the total and items?"
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                      "What's the smallest model that still works well?"
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
