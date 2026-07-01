import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { CartProvider } from '@/components/cart-context';
import IntroGate from '@/components/intro-gate';



export const metadata: Metadata = {
  title: 'Arete Groupp | Tecnologia. Estratégia. Resultados.',
  description: 'Transforme sua ideia em um negócio digital de sucesso. Tecnologia, estratégia e resultados em cada projeto.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth dark">
      <body className={cn("font-body bg-background antialiased overflow-x-hidden")}>
        {/* Global animated aurora background — fixed, sits behind the entire
            site (not per-section), so it reads as one continuous canvas as
            the page scrolls instead of isolated per-section glows. */}
        <div className="global-bg" aria-hidden="true">
          <div className="global-bg__grid" />
          <div className="global-bg__aurora global-bg__aurora--1" />
          <div className="global-bg__aurora global-bg__aurora--2" />
          <div className="global-bg__aurora global-bg__aurora--3" />

          {/* Circuit traces — echoes the connector-node motif from the logo.
              Real light beams travel along each trace (SVG animateMotion
              follows every bend precisely) with a soft comet trail, and a
              brief flash on the destination node as each beam arrives —
              like a connection being made. Traces hand off to one another
              in a relay (briefly overlapping) so there's almost always
              something moving, never every trace lit at once. */}
          <svg
            className="circuit-svg"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[
              { key: 'a', id: 'trace-a', delay: 0,  d: 'M -20,220 H 320 V 80 H 640',             nodes: [[320,220,3],[640,80,4]] },
              { key: 'b', id: 'trace-b', delay: 2,  d: 'M 1940,160 H 1600 V 300 H 1280',          nodes: [[1600,160,3],[1280,300,4]] },
              { key: 'c', id: 'trace-c', delay: 4,  d: 'M -20,900 H 260 V 1000 H 480 V 910 H 700',nodes: [[480,1000,3],[700,910,4]] },
              { key: 'd', id: 'trace-d', delay: 6,  d: 'M 1940,870 H 1680 V 970 H 1400',          nodes: [[1680,870,3],[1400,970,4]] },
              { key: 'e', id: 'trace-e', delay: 8,  d: 'M -20,550 H 200 V 440 H 480',             nodes: [[200,550,3],[480,440,4]] },
              { key: 'f', id: 'trace-f', delay: 10, d: 'M 1940,630 H 1740 V 510 H 1460',          nodes: [[1740,630,3],[1460,510,4]] },
              { key: 'g', id: 'trace-g', delay: 12, d: 'M 720,0 V 160 H 960 V 300',               nodes: [[720,160,3],[960,300,4]] },
              { key: 'h', id: 'trace-h', delay: 14, d: 'M 1180,1080 V 940 H 960 V 800',           nodes: [[1180,940,3],[960,800,4]] },
            ].map((t) => {
              const lastIdx = t.nodes.length - 1;
              const flashDelay = t.delay + 3.4;
              return (
                <g key={t.key} className={`circuit-group circuit-group--${t.key}`}>
                  <path id={t.id} className="circuit-path" d={t.d} />

                  <circle className="circuit-beam circuit-beam--head" r="4.5">
                    <animateMotion dur="4s" begin={`${t.delay}s`} repeatCount="indefinite">
                      <mpath href={`#${t.id}`} />
                    </animateMotion>
                  </circle>
                  <circle className="circuit-beam circuit-beam--trail1" r="3">
                    <animateMotion dur="4s" begin={`${t.delay + 0.15}s`} repeatCount="indefinite">
                      <mpath href={`#${t.id}`} />
                    </animateMotion>
                  </circle>
                  <circle className="circuit-beam circuit-beam--trail2" r="2">
                    <animateMotion dur="4s" begin={`${t.delay + 0.3}s`} repeatCount="indefinite">
                      <mpath href={`#${t.id}`} />
                    </animateMotion>
                  </circle>
                  <circle className="circuit-beam circuit-beam--trail3" r="1.5">
                    <animateMotion dur="4s" begin={`${t.delay + 0.45}s`} repeatCount="indefinite">
                      <mpath href={`#${t.id}`} />
                    </animateMotion>
                  </circle>

                  {t.nodes.map(([cx, cy, r], i) =>
                    i === lastIdx ? (
                      <circle
                        key={i}
                        className="circuit-node circuit-node--end"
                        style={{ animationDelay: `0s, ${flashDelay}s` }}
                        cx={cx} cy={cy} r={r}
                      />
                    ) : (
                      <circle key={i} className="circuit-node" cx={cx} cy={cy} r={r} />
                    )
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Fixed decorative tech overlays — purely visual, pointer-events: none */}
        <div className="scanline-overlay fixed inset-0 z-[9997] pointer-events-none" aria-hidden="true" />
        <div className="hud-corner hud-corner-tl" aria-hidden="true" />
        <div className="hud-corner hud-corner-tr" aria-hidden="true" />
        <div className="hud-corner hud-corner-bl" aria-hidden="true" />
        <div className="hud-corner hud-corner-br" aria-hidden="true" />

        {/* Actual site content — explicit stacking context above the aurora */}
        <div className="relative z-[1]">
          <IntroGate>
            <FirebaseClientProvider>
              <CartProvider>
                {children}
                <Toaster />
              </CartProvider>
            </FirebaseClientProvider>
          </IntroGate>
        </div>
      </body>
    </html>
  );
}
