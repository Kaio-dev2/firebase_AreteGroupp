'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'arete_visitor_name';

// sessionStorage: persists within the current browser tab/session only.
// Every new visit (new tab, new window, browser reopen) shows the intro again.
// Navigating between pages within the same SPA session skips it.
const storage = typeof window !== 'undefined' ? window.sessionStorage : null;

/* ─── SVG circuit traces for both screens ─── */
const GATE_TRACES = [
  { id: 'gt-a', d: 'M 0,80  H 60  V 30  H 160' },
  { id: 'gt-b', d: 'M 800,80  H 740 V 30  H 640' },
  { id: 'gt-c', d: 'M 0,360 H 60  V 410 H 160' },
  { id: 'gt-d', d: 'M 800,360 H 740 V 410 H 640' },
  { id: 'gt-e', d: 'M 300,0  V 50  H 380 V 100' },
  { id: 'gt-f', d: 'M 500,440 V 390 H 420 V 340' },
];

const BEAM_COLORS = [
  'hsla(199,100%,84%,0.98)',
  'hsla(205,95%,74%,0.52)',
  'hsla(212,90%,68%,0.28)',
  'hsla(218,85%,64%,0.13)',
];
const BEAM_SIZES = [4.5, 3, 2, 1.4];

function CircuitSVG({ traces }: { traces: typeof GATE_TRACES }) {
  return (
    <svg
      viewBox="0 0 800 440"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    >
      {traces.map((t) => (
        <g key={t.id}>
          <path
            id={t.id} d={t.d} fill="none"
            stroke="hsla(221,72%,65%,0.20)"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
          {BEAM_SIZES.map((r, i) => (
            <circle key={i} r={r} fill={BEAM_COLORS[i]}
              style={i === 0 ? {
                filter: 'drop-shadow(0 0 5px hsla(199,100%,72%,1)) drop-shadow(0 0 14px hsla(221,90%,62%,0.75))'
              } : {}}>
              <animateMotion
                dur={`${2.8 + i * 0.2}s`}
                begin={`${i * 0.15}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#${t.id}`} />
              </animateMotion>
            </circle>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ─── HUD corner brackets ─── */
function HudCorners() {
  return (
    <>
      {[
        { top: 16, left: 16, bw: '2px 0 0 2px' },
        { top: 16, right: 16, bw: '2px 2px 0 0' },
        { bottom: 16, left: 16, bw: '0 0 2px 2px' },
        { bottom: 16, right: 16, bw: '0 2px 2px 0' },
      ].map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          ...s,
          width: 18, height: 18,
          borderColor: 'hsla(221,83%,65%,0.55)',
          borderStyle: 'solid',
          borderWidth: s.bw,
          animation: `cornerPulse 4s ease-in-out ${i * 1}s infinite`,
        }} />
      ))}
    </>
  );
}

/* ─── Dot grid ─── */
function DotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: 'radial-gradient(circle, hsla(221,70%,65%,0.13) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
    }} />
  );
}

type Phase = 'gate' | 'welcome' | 'done';

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('done');
  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [welcomeIn, setWelcomeIn] = useState(false);
  const [gateIn, setGateIn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setName(stored);
      setPhase('done');
    } else {
      setPhase('gate');
      setTimeout(() => setGateIn(true), 80);
    }
  }, []);

  useEffect(() => {
    if (phase === 'gate') setTimeout(() => inputRef.current?.focus(), 600);
  }, [phase]);

  const handleSubmit = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const finalName = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    sessionStorage.setItem(STORAGE_KEY, finalName);
    setName(finalName);
    setGateIn(false);
    setTimeout(() => {
      setPhase('welcome');
      setTimeout(() => setWelcomeIn(true), 200);
    }, 400);
    setTimeout(() => setPhase('done'), 4200);
  }, [inputValue]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  }, [handleSubmit]);

  if (phase === 'done') return <>{children}</>;

  return (
    <>
      <style>{`
        @keyframes cornerPulse {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.52; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanSweep {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes expandRing {
          0%   { transform: scale(0.3); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      {/* ── GATE PHASE ── */}
      {phase === 'gate' && (
        <div
          className="fixed inset-0 z-[99999] overflow-hidden"
          style={{ background: 'hsl(222,39%,4%)' }}
        >
          <DotGrid />
          <CircuitSVG traces={GATE_TRACES} />
          <HudCorners />

          {/* Scan bar */}
          <div className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, hsla(221,83%,65%,0.4), transparent)',
              animation: 'scanSweep 8s linear infinite',
            }} />

          {/* Aurora glow */}
          <div className="absolute pointer-events-none rounded-full"
            style={{
              width: '60vw', height: '60vw', maxWidth: 700, maxHeight: 700,
              top: '-20%', left: '-10%',
              background: 'radial-gradient(circle, hsla(221,90%,58%,0.18) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }} />
          <div className="absolute pointer-events-none rounded-full"
            style={{
              width: '50vw', height: '50vw', maxWidth: 600, maxHeight: 600,
              bottom: '-15%', right: '-10%',
              background: 'radial-gradient(circle, hsla(199,95%,55%,0.14) 0%, transparent 70%)',
              filter: 'blur(90px)',
            }} />

          {/* Content card */}
          <div
            className="relative z-10 flex h-full flex-col items-center justify-center px-4"
            style={{
              opacity: gateIn ? 1 : 0,
              transform: gateIn ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {/* Top label */}
            <div className="mb-8 flex flex-col items-center gap-2"
              style={{ animation: gateIn ? 'fadeSlideUp 0.5s ease 0.1s both' : 'none' }}>
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/50" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent/65">
                  Arete Groupp
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/50" />
              </div>
            </div>

            {/* Main card */}
            <div
              className="w-full max-w-sm rounded-2xl border p-6 sm:p-8 md:p-10"
              style={{
                background: 'hsla(222,39%,6%,0.85)',
                borderColor: 'hsla(221,70%,60%,0.18)',
                boxShadow: '0 0 60px -10px hsla(221,83%,50%,0.15), 0 24px 48px -16px hsla(0,0%,0%,0.5)',
                backdropFilter: 'blur(12px)',
                animation: gateIn ? 'fadeSlideUp 0.5s ease 0.2s both' : 'none',
              }}
            >
              {/* Heading */}
              <div className="mb-8 text-center">
                <h1 className="font-headline text-2xl font-bold text-white md:text-3xl mb-2">
                  Bem-vindo(a) 👋
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Antes de começar, como podemos te chamar?
                </p>
              </div>

              {/* Input */}
              <div className="space-y-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Seu nome..."
                    maxLength={32}
                    className="w-full rounded-xl border bg-transparent px-4 py-3.5 text-center text-white placeholder:text-muted-foreground/50 focus:outline-none transition-all text-base"
                    style={{
                      borderColor: inputValue ? 'hsla(221,83%,65%,0.5)' : 'hsla(221,50%,50%,0.2)',
                      boxShadow: inputValue ? '0 0 0 1px hsla(221,83%,65%,0.15)' : 'none',
                    }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim()}
                  className="group w-full rounded-xl px-6 py-3.5 font-semibold text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-35 disabled:cursor-not-allowed"
                  style={{
                    background: inputValue.trim()
                      ? 'linear-gradient(135deg, hsl(var(--accent)), hsla(199,95%,55%,0.9))'
                      : 'hsla(221,50%,50%,0.2)',
                    color: 'white',
                    boxShadow: inputValue.trim() ? '0 4px 20px -4px hsla(221,83%,50%,0.4)' : 'none',
                  }}
                >
                  Entrar na Arete
                </button>
              </div>

              {/* Bottom hint */}
              <p className="mt-6 text-center text-[11px] text-muted-foreground/40 uppercase tracking-wider">
                Tecnologia · Estratégia · Resultados
              </p>
            </div>

            {/* Version / build indicator */}
            <div className="mt-6 flex items-center gap-2 text-[10px] text-muted-foreground/35 uppercase tracking-widest"
              style={{ animation: gateIn ? 'fadeSlideUp 0.5s ease 0.4s both' : 'none' }}>
              <span className="inline-block h-1 w-1 rounded-full bg-accent/40" />
              Sistema Online
              <span className="inline-block h-1 w-1 rounded-full bg-accent/40" />
            </div>
          </div>
        </div>
      )}

      {/* ── WELCOME PHASE ── */}
      {phase === 'welcome' && (
        <div
          className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center"
          style={{ background: 'hsl(222,39%,4%)' }}
        >
          <DotGrid />
          <CircuitSVG traces={GATE_TRACES} />
          <HudCorners />

          {/* Expanding rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[0, 0.5, 1].map((delay) => (
              <div key={delay}
                className="absolute rounded-full border"
                style={{
                  width: 280, height: 280,
                  borderColor: 'hsla(221,83%,65%,0.18)',
                  animation: `expandRing 2.5s ease-out ${delay}s infinite`,
                }} />
            ))}
          </div>

          {/* Glow center */}
          <div className="absolute pointer-events-none rounded-full"
            style={{
              width: 400, height: 400,
              background: 'radial-gradient(circle, hsla(221,90%,58%,0.20) 0%, transparent 70%)',
              filter: 'blur(60px)',
              transition: 'opacity 0.6s',
              opacity: welcomeIn ? 1 : 0,
            }} />

          {/* Text content */}
          <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center"
            style={{
              opacity: welcomeIn ? 1 : 0,
              transform: welcomeIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent/60">
                Conexão estabelecida
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/50" />
            </div>

            <h1 className="font-headline text-3xl sm:text-4xl font-bold text-white leading-tight md:text-5xl lg:text-6xl">
              Bem-vindo,{' '}
              <span
                className="text-accent"
                style={{ textShadow: '0 0 30px hsla(var(--accent),0.7), 0 0 60px hsla(var(--accent),0.3)' }}
              >
                {name}
              </span>
            </h1>

            <p className="text-base text-muted-foreground max-w-xs leading-relaxed md:text-lg md:max-w-sm">
              Vamos começar sua jornada com a{' '}
              <span className="text-foreground/80 font-medium">Arete Groupp</span>
            </p>

            <div className="mt-4 flex items-center gap-2.5 text-xs text-accent/55 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Carregando experiência personalizada
            </div>
          </div>
        </div>
      )}

      {/* Always render children (hidden behind overlay) */}
      <div style={{ position: 'absolute', visibility: 'hidden' }}>{children}</div>
    </>
  );
}

/* Hook for other components to read the stored name */
export function useVisitorName(): string {
  const [name, setName] = useState('');
  useEffect(() => {
    setName(sessionStorage.getItem(STORAGE_KEY) ?? '');
  }, []);
  return name;
}
