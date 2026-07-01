
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useVisitorName } from '@/components/intro-gate';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/#about', label: 'Sobre' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/projects', label: 'Projetos' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visitorName = useVisitorName();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll(); // run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500 border-b',
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl shadow-lg shadow-accent/10 border-border/60'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Logo
            className="h-7 w-7 text-accent"
            style={{ filter: 'drop-shadow(0 0 8px hsl(var(--accent)))' }}
          />
          <span
            className="font-headline text-xl font-bold text-white"
            style={{ textShadow: '0 0 8px hsl(var(--accent))' }}
          >
            Arete Groupp
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-all hover:text-accent hover:brightness-125',
                pathname === link.href ? 'text-accent' : 'text-foreground/70'
              )}
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Visitor name badge — replaces the old Firebase auth display */}
          {visitorName && (
            <div className="hidden md:flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium text-accent/90">{visitorName}</span>
            </div>
          )}

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/5547933801637"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="bg-accent text-white font-bold hover:bg-accent/90 flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Falar com Arete</span>
              <span className="sm:hidden">Falar</span>
            </Button>
          </a>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border">
          <nav className="flex flex-col items-center gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="w-full rounded-lg px-4 py-3 text-center text-base font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
            {visitorName && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>Olá, <span className="text-accent font-semibold">{visitorName}</span></span>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
