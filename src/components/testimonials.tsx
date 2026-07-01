'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useTestimonials } from '@/hooks/use-projects';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Star, Quote } from 'lucide-react';

/* Unique gradient pairs — one per testimonial slot */
const AVATAR_GRADIENTS = [
  ['#1e40af', '#60a5fa'], // blue
  ['#6d28d9', '#c084fc'], // purple
  ['#065f46', '#34d399'], // emerald
  ['#b45309', '#fbbf24'], // amber
  ['#0f766e', '#5eead4'], // teal
  ['#9f1239', '#fb7185'], // rose
  ['#3730a3', '#a5b4fc'], // indigo
  ['#92400e', '#fcd34d'], // yellow
  ['#155e75', '#67e8f9'], // cyan
];

function Avatar({ name, index }: { name: string; index: number }) {
  const parts = name.trim().split(' ');
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();

  const [from, to] = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  const gradId = `av-grad-${index}`;

  return (
    <svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <circle cx="36" cy="36" r="36" fill={`url(#${gradId})`} />
      <text
        x="36" y="36"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="white"
        opacity="0.95"
      >
        {initials}
      </text>
    </svg>
  );
}

export default function Testimonials() {
  const { testimonials } = useTestimonials();
  const apiRef = useRef<CarouselApi | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const api = apiRef.current;
      if (!api) return;
      api.canScrollNext() ? api.scrollNext() : api.scrollTo(0);
    }, 3000);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  return (
    <section id="testimonials" className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-background/50 via-secondary/45 to-background/50 backdrop-blur-[2px]">
      <div className="container relative z-10 mx-auto px-4 md:px-6">

        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl text-white"
            style={{ textShadow: '0 0 10px hsla(var(--accent), 0.5)' }}>
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            A confiança de quem já transformou seu negócio conosco.
          </p>
        </div>

        <Carousel
          opts={{ align: 'center', loop: true }}
          setApi={(api) => { apiRef.current = api; }}
          className="mx-auto w-full max-w-2xl"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <CarouselContent>
            {testimonials.map((t, idx) => (
              <CarouselItem key={t.id}>
                <div className="p-1">
                  <Card className="border-border bg-card/80 shadow-lg backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">

                      {/* Quote icon */}
                      <Quote className="h-8 w-8 text-accent/40 mb-4 rotate-180" />

                      {/* Stars */}
                      <div className="flex gap-1 mb-5">
                        {[...Array(t.avaliacao)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(5 - t.avaliacao)].map((_, i) => (
                          <Star key={`e${i}`} className="h-5 w-5 fill-muted text-muted" />
                        ))}
                      </div>

                      {/* Testimonial text */}
                      <p className="text-base md:text-lg italic text-foreground/90 leading-relaxed mb-7">
                        "{t.comentario}"
                      </p>

                      {/* Avatar + name */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="rounded-full ring-2 ring-accent/30 overflow-hidden">
                          <Avatar name={t.nome} index={idx} />
                        </div>
                        <h3 className="font-headline text-base font-semibold text-white mt-1">
                          {t.nome}
                        </h3>
                        <div className="flex gap-1 mt-0.5">
                          {[...Array(3)].map((_, i) => (
                            <span key={i} className="h-1 w-1 rounded-full bg-accent/40" />
                          ))}
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      </div>
    </section>
  );
}
