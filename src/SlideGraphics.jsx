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
  const inputs = [
    { name: "Image", detail: "screenshots", y: 30, type: "image" },
    { name: "Text", detail: "prompts", y: 68, type: "text" },
    { name: "Video", detail: "events", y: 106, type: "video" },
  ];
  const outputs = [
    { name: "Caption", detail: "summaries", y: 30, type: "caption" },
    { name: "Speech", detail: "audio reply", y: 68, type: "speech" },
    { name: "Action", detail: "decisions", y: 106, type: "action" },
  ];

  function Icon({ type, x, y }) {
    const iconStroke = "rgba(195,208,224,0.82)";
    if (type === "image") {
      return (
        <g>
          <rect x={x + 6} y={y + 7} width="20" height="14" rx="2" fill="none" stroke={iconStroke} />
          <circle cx={x + 22} cy={y + 11} r="2.2" fill={iconStroke} />
          <path d={`M${x + 8} ${y + 19}l5-5 4 3 4-5 5 7`} fill="none" stroke={iconStroke} />
        </g>
      );
    }
    if (type === "text" || type === "caption") {
      return (
        <g>
          <line x1={x + 7} y1={y + 10} x2={x + 25} y2={y + 10} stroke={iconStroke} />
          <line x1={x + 7} y1={y + 15} x2={x + 23} y2={y + 15} stroke={iconStroke} />
          <line x1={x + 7} y1={y + 20} x2={x + 20} y2={y + 20} stroke={iconStroke} />
        </g>
      );
    }
    if (type === "video") {
      return (
        <g>
          <rect x={x + 6} y={y + 7} width="20" height="14" rx="2" fill="none" stroke={iconStroke} />
          <polygon points={`${x + 13},${y + 11} ${x + 13},${y + 17} ${x + 18},${y + 14}`} fill={iconStroke} />
        </g>
      );
    }
    if (type === "speech") {
      return (
        <g fill="none" stroke={iconStroke}>
          <path d={`M${x + 7} ${y + 16}c2 0 2-5 4-5s2 10 4 10 2-14 4-14 2 18 4 18 2-9 4-9`} />
        </g>
      );
    }
    return (
      <g fill="none" stroke={iconStroke} strokeWidth="1.4" strokeLinecap="round">
        <circle cx={x + 16} cy={y + 10} r="4.5" />
        <path d={`M${x + 10} ${y + 23}c1-5 3-7 6-7s5 2 6 7`} />
        <line x1={x + 16} y1={y + 14} x2={x + 16} y2={y + 20} />
      </g>
    );
  }

  return (
    <GraphicShell title="Shared Representation" subtitle="Inputs and outputs through one model core">
      <svg viewBox="0 0 280 170" className="h-full w-full">
        <defs>
          <radialGradient id="multiCoreGlow" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.02" />
          </radialGradient>
          <linearGradient id="multiPanelBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#020816" />
            <stop offset="100%" stopColor="#00040f" />
          </linearGradient>
          <marker id="flowArrowMuted" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L8,4 L0,8 z" fill="rgba(174,192,212,0.72)" />
          </marker>
        </defs>
        <rect x="0" y="0" width="280" height="170" fill="url(#multiPanelBg)" />
        <text x="10" y="16" fontSize="8.5" fill="rgba(191,203,219,0.76)">Inputs</text>
        <text x="236" y="16" fontSize="8.5" fill="rgba(191,203,219,0.76)">Outputs</text>

        <circle cx="140" cy="84" r="44" fill="url(#multiCoreGlow)" />

        <path
          d="M108 102c-9 0-16-7-16-16 0-7 4-13 11-15 2-10 10-16 21-16 7 0 13 3 18 8 3-2 6-3 10-3 10 0 18 8 18 18 0 1 0 2-0.2 2.8 6 2.2 10 7.4 10 14.2 0 8.8-7.2 16-16 16H108z"
          fill="rgba(6,16,35,0.9)"
          stroke="rgba(148,182,207,0.76)"
          strokeWidth="1.4"
        />
        <text x="139" y="82" textAnchor="middle" fontSize="9" fill="rgba(233,241,250,0.96)">
          Multimodal
        </text>
        <text x="139" y="93" textAnchor="middle" fontSize="9" fill="rgba(233,241,250,0.96)">
          Processing
        </text>

        {inputs.map((n, i) => (
          <g key={n.name}>
            <rect
              x="10"
              y={n.y}
              width="34"
              height="28"
              rx="6"
              fill="rgba(8,19,39,0.9)"
              stroke="rgba(136,167,194,0.42)"
            />
            <Icon type={n.type} x={10} y={n.y} />
            <text x="48" y={n.y + 11} fontSize="8" fill="rgba(229,238,249,0.94)">{n.name}</text>
            <text x="48" y={n.y + 21} fontSize="6.6" fill="rgba(179,195,212,0.7)">{n.detail}</text>
            <motion.path
              d={`M82 ${n.y + 14} C 90 ${n.y + 14}, 98 ${n.y + 14}, 106 ${n.y + 14}`}
              fill="none"
              stroke="rgba(160,182,205,0.56)"
              strokeWidth="1.2"
              markerEnd="url(#flowArrowMuted)"
              initial={{ opacity: 0.32 }}
              animate={{ opacity: [0.32, 0.74, 0.32] }}
              transition={{ duration: 2.2, delay: i * 0.22, repeat: Infinity }}
            />
          </g>
        ))}

        {outputs.map((n, i) => (
          <g key={n.name}>
            <rect
              x="236"
              y={n.y}
              width="34"
              height="28"
              rx="6"
              fill="rgba(8,19,39,0.9)"
              stroke="rgba(136,167,194,0.42)"
            />
            <Icon type={n.type} x={236} y={n.y} />
            <text x="196" y={n.y + 11} textAnchor="end" fontSize="8" fill="rgba(229,238,249,0.94)">{n.name}</text>
            <text x="196" y={n.y + 21} textAnchor="end" fontSize="6.6" fill="rgba(179,195,212,0.7)">{n.detail}</text>
            <motion.path
              d={`M173 ${n.y + 14} C 186 ${n.y + 14}, 204 ${n.y + 14}, 234 ${n.y + 14}`}
              fill="none"
              stroke="rgba(160,182,205,0.56)"
              strokeWidth="1.2"
              markerEnd="url(#flowArrowMuted)"
              initial={{ opacity: 0.32 }}
              animate={{ opacity: [0.32, 0.74, 0.32] }}
              transition={{ duration: 2.2, delay: 0.35 + i * 0.22, repeat: Infinity }}
            />
          </g>
        ))}

        <text x="140" y="162" textAnchor="middle" fontSize="8" fill="rgba(188,201,218,0.74)">
          Shared multimodal representation
        </text>
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
    { n: "LLaVA", v: 88, c: "#FB7185" },
    { n: "MiniCPM-V", v: 77, c: "#60A5FA" },
    { n: "Qwen-VL", v: 92, c: "#F59E0B" },
    { n: "Gemma-V", v: 80, c: "#34D399" },
  ];
  return (
    <GraphicShell title="Model Fit Map" subtitle="Demo reliability vs footprint">
      <div className="h-full rounded-2xl border border-white/10 bg-slate-950/65 p-3">
        <div className="mb-2 text-[11px] text-white/60">Practical local score</div>
        <div className="space-y-2.5">
          {rows.map((r, i) => (
            <div key={r.n}>
              <div className="mb-1 flex items-center justify-between text-[11px] text-white/70">
                <span>{r.n}</span>
                <span>{r.v}</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: r.c }}
                  initial={{ width: "8%" }}
                  animate={{ width: `${r.v}%` }}
                  transition={{ duration: 0.9, delay: i * 0.16 }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-white/55">
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">OCR strength</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">Latency profile</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">VRAM fit</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-2">Tooling support</div>
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

function TallyGraphic() {
  const points = [
    { x: 34, y: 42, r: 7, c: "#34D399" },
    { x: 88, y: 78, r: 6, c: "#60A5FA" },
    { x: 134, y: 60, r: 8, c: "#FB7185" },
    { x: 182, y: 96, r: 7, c: "#F59E0B" },
    { x: 240, y: 58, r: 9, c: "#A78BFA" },
  ];

  return (
    <GraphicShell title="Memory Graph" subtitle="Episodes linked into useful context">
      <svg viewBox="0 0 280 170" className="h-full w-full">
        <motion.path
          d="M24 45C62 12 96 128 140 74C170 38 205 137 252 56"
          fill="none"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4 }}
        />
        {points.map((p, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <circle cx={p.x} cy={p.y} r={p.r + 7} fill={`${p.c}22`} />
            <circle cx={p.x} cy={p.y} r={p.r} fill={p.c} />
          </motion.g>
        ))}
        <rect
          x="26"
          y="114"
          width="92"
          height="38"
          rx="10"
          fill="rgba(2,6,23,0.72)"
          stroke="rgba(255,255,255,0.18)"
        />
        <rect
          x="126"
          y="114"
          width="126"
          height="38"
          rx="10"
          fill="rgba(2,6,23,0.72)"
          stroke="rgba(255,255,255,0.18)"
        />
        <text x="34" y="136" fontSize="10" fill="rgba(255,255,255,0.78)">
          capture -&gt; distill
        </text>
        <text x="134" y="136" fontSize="10" fill="rgba(255,255,255,0.78)">
          recall -&gt; proactive assist
        </text>
      </svg>
    </GraphicShell>
  );
}

function BigIdeaGraphic() {
  return (
    <GraphicShell title="Companion Orbit" subtitle="From query engine to lived memory">
      <div className="relative h-full overflow-hidden rounded-2xl border border-[#3b4f77]/60 bg-[#000822]/85">
        <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/45 bg-cyan-300/10 shadow-[0_0_60px_rgba(89,213,245,0.38)]" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(89,213,245,0.85)]" />
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-200/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(93,224,198,0.8)]" />
        </motion.div>
        <div className="absolute bottom-3 left-1/2 w-full -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.2em] text-slate-300/55">
          presence • memory • agency
        </div>
      </div>
    </GraphicShell>
  );
}

export function SlideGraphic({ index }) {
  if (index === 0) return <MultimodalGraphic />;
  if (index === 1) return <CloudLocalGraphic />;
  if (index === 2) return <ModelsGraphic />;
  if (index === 3) return <ChecklistGraphic />;
  if (index === 4) return <TallyGraphic />;
  return <BigIdeaGraphic />;
}
