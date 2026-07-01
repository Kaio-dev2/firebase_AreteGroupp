import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Instagram, Linkedin, MessageSquare } from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/arete.groupp' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/aretegroupp' },
  { name: 'WhatsApp', icon: MessageSquare, href: 'https://wa.me/5547933801637' },
];

const footerLinks = [
  { title: 'Sobre Nós', href: '#' },
  { title: 'Política de Privacidade', href: '#' },
  { title: 'Contato', href: '#' },
  { title: 'Termos de Uso', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-t from-secondary/60 to-background/60 backdrop-blur-[2px] text-foreground">
      <div className="container relative z-10 mx-auto grid grid-cols-1 gap-8 px-4 py-10 sm:py-12 md:grid-cols-4 md:px-6">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link href="/" prefetch={false} className="w-fit">
            <Image
              src="/logo-full.png"
              alt="Arete Groupp — Tecnologia. Estratégia. Resultados."
              width={968}
              height={782}
              className="h-20 sm:h-24 md:h-28 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 16px hsla(var(--accent), 0.35))' }}
            />
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left max-w-[240px]">
            Transformando ideias em negócios digitais de sucesso.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-2">
          <h3 className="font-headline text-base sm:text-lg font-semibold mb-4 text-center md:text-left">
            Links Úteis
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 justify-center md:justify-start">
            {footerLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  prefetch={false}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-headline text-base sm:text-lg font-semibold mb-4">Siga-nos</h3>
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                asChild
                className="text-muted-foreground transition-all hover:text-accent hover:scale-110 hover:bg-accent/10"
              >
                <a href={social.href} aria-label={social.name} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
          <a
            href="https://instagram.com/arete.groupp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            @arete.groupp
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30 bg-background/40">
        <div className="container mx-auto flex items-center justify-center px-4 py-4 md:px-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Arete Groupp. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
