import React from "react";
import { motion } from "framer-motion";

export const SLIDE_THEMES = [
  { glowA: "#4FD1C5", glowB: "#60A5FA", glowC: "#22D3EE" },
  { glowA: "#34D399", glowB: "#38BDF8", glowC: "#A78BFA" },
  { glowA: "#FB7185", glowB: "#F59E0B", glowC: "#F97316" },
  { glowA: "#22D3EE", glowB: "#A3E635", glowC: "#34D399" },
  { glowA: "#F59E0B", glowB: "#FB7185", glowC: "#A78BFA" },
  { glowA: "#60A5FA", glowB: "#34D399", glowC: "#22D3EE" },
];

function GraphicShell({ title, subtitle, children }) {
  return (
    <div className="h-full rounded-3xl border border-white/15 bg-black/25 p-4 backdrop-blur-sm">
      <div className="mb-3">
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
          Visual Layer
        </div>
        <div className="font-semibold text-white/90">{title}</div>
        <div className="text-xs text-white/60">{subtitle}</div>
      </div>
      <div className="h-[calc(100%-4rem)]">{children}</div>
    </div>
  );
}

function MultimodalGraphic() {
  return (
    <GraphicShell title="Shared Representation" subtitle="Multimodal AI Architecture">
      <svg viewBox="0 0 280 170" className="h-full w-full rounded-2xl border border-white/10 bg-[#020611]">
        <defs>
          <radialGradient id="mmCore" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.45)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.05)" />
          </radialGradient>
        </defs>
        <circle cx="140" cy="85" r="34" fill="url(#mmCore)" stroke="rgba(125,211,252,0.6)" />
        <text x="140" y="89" textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.9)">
          Shared Space
        </text>
        {[
          { label: "Text", x: 44, y: 30, c: "rgba(96,165,250,0.35)" },
          { label: "Image", x: 222, y: 30, c: "rgba(167,139,250,0.3)" },
          { label: "Audio", x: 44, y: 130, c: "rgba(52,211,153,0.32)" },
          { label: "Video", x: 222, y: 130, c: "rgba(251,113,133,0.3)" },
        ].map((m) => (
          <g key={m.label}>
            <rect
              x={m.x - 28}
              y={m.y - 14}
              width="56"
              height="28"
              rx="9"
              fill={m.c}
              stroke="rgba(255,255,255,0.26)"
            />
            <text x={m.x} y={m.y + 3.2} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.9)">
              {m.label}
            </text>
            <line x1={m.x} y1={m.y} x2="140" y2="85" stroke="rgba(255,255,255,0.32)" strokeDasharray="3 3" />
          </g>
        ))}
      </svg>
    </GraphicShell>
  );
}

function CloudLocalGraphic() {
  return (
    <GraphicShell title="Decision Surface" subtitle="Control, cost, and latency">
      <svg viewBox="0 0 280 170" className="h-full w-full">
        <rect
          x="18"
          y="20"
          width="108"
          height="130"
          rx="18"
          fill="rgba(56,189,248,0.12)"
          stroke="rgba(125,211,252,0.45)"
        />
        <rect
          x="154"
          y="20"
          width="108"
          height="130"
          rx="18"
          fill="rgba(34,197,94,0.12)"
          stroke="rgba(134,239,172,0.45)"
        />

        <path
          d="M55 78c0-12 10-22 22-22 5 0 9 1 13 4 3-8 11-13 20-13 12 0 21 9 22 21 9 1 16 9 16 18 0 10-8 18-18 18H72c-10 0-17-8-17-18 0-4 0-6 0-8z"
          fill="rgba(14,165,233,0.4)"
        />
        <rect
          x="179"
          y="54"
          width="56"
          height="56"
          rx="10"
          fill="rgba(2,6,23,0.75)"
          stroke="rgba(134,239,172,0.6)"
        />
        <rect x="188" y="63" width="38" height="38" rx="6" fill="none" stroke="rgba(167,243,208,0.7)" />
        {[
          [171, 73, 179, 73],
          [171, 91, 179, 91],
          [171, 109, 179, 109],
          [235, 73, 243, 73],
          [235, 91, 243, 91],
          [235, 109, 243, 109],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(167,243,208,0.65)"
            strokeWidth="2"
          />
        ))}
        <motion.path
          d="M126 85C139 75 145 75 154 85"
          fill="none"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0.2, opacity: 0.25 }}
          animate={{ pathLength: 1, opacity: [0.25, 0.85, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <text x="41" y="137" fontSize="10" fill="rgba(186,230,253,0.9)">
          Cloud
        </text>
        <text x="191" y="137" fontSize="10" fill="rgba(187,247,208,0.92)">
          Local
        </text>
      </svg>
    </GraphicShell>
  );
}

function ModelsGraphic() {
  const rows = [
    { n: "Qwen2.5-Omni-7B", params: 7.0, c: "#8B5CF6" },
    { n: "MiniCPM-V 2.6", params: 8.0, c: "#06B6D4" },
    { n: "Qwen2.5-VL-7B", params: 8.29, c: "#F59E0B" },
    { n: "Gemma 3 4B", params: 4.3, c: "#22C55E" },
  ];
  return (
    <GraphicShell title="Model Fit Map" subtitle="Published parameter count (B)">
      <div className="h-full rounded-2xl border border-white/10 bg-slate-950/65 p-3">
        <div className="mb-2 text-[11px] text-white/60">Actual model parameters (billions)</div>
        <div className="space-y-2.5">
          {rows.map((r, i) => (
            <div key={r.n}>
              <div className="mb-1 flex items-center justify-between text-[11px] text-white/70">
                <span>{r.n}</span>
                <span>{r.params.toFixed(2)}B</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: r.c }}
                  initial={{ width: "8%" }}
                  animate={{ width: `${(r.params / 8.29) * 100}%` }}
                  transition={{ duration: 0.9, delay: i * 0.16 }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-white/55">
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">Qwen2.5-Omni: 7B</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">MiniCPM-V 2.6: 8B</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">Qwen2.5-VL-7B: 8.29B</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">Gemma 3 4B: 4.3B</div>
        </div>
      </div>
    </GraphicShell>
  );
}

function ChecklistGraphic() {
  return (
    <GraphicShell title="Local Readiness Radar" subtitle="What to validate first">
      <svg viewBox="0 0 280 170" className="h-full w-full">
        <g transform="translate(140,85)">
          {[58, 44, 30, 16].map((r) => (
            <polygon
              key={r}
              points={`0,-${r} ${r * 0.88},-${r * 0.45} ${r * 0.88},${r * 0.45} 0,${r} -${r * 0.88},${r * 0.45} -${r * 0.88},-${r * 0.45}`}
              fill="none"
              stroke="rgba(255,255,255,0.16)"
            />
          ))}
          {[0, 60, 120, 180, 240, 300].map((d) => {
            const x = 58 * Math.cos((d - 90) * (Math.PI / 180));
            const y = 58 * Math.sin((d - 90) * (Math.PI / 180));
            return (
              <line key={d} x1="0" y1="0" x2={x} y2={y} stroke="rgba(255,255,255,0.2)" />
            );
          })}
          <motion.polygon
            points="0,-49 40,-17 45,22 0,40 -36,19 -38,-17"
            fill="rgba(34,211,238,0.25)"
            stroke="rgba(103,232,249,0.9)"
            strokeWidth="1.3"
            initial={{ scale: 0.88, opacity: 0.6 }}
            animate={{ scale: [0.88, 1, 0.88], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </g>
        <text x="140" y="166" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.62)">
          Quantization · OCR · Latency · Stability · VRAM · Tooling
        </text>
      </svg>
    </GraphicShell>
  );
}

export function SlideGraphic({ index }) {
  if (index === 0) return <MultimodalGraphic />;
  if (index === 1) return <CloudLocalGraphic />;
  if (index === 2) return <ChecklistGraphic />;
  if (index === 3) return <ModelsGraphic />;
  return <ModelsGraphic />;
}
