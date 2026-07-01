import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const highlights = [
  'Sites rápidos, modernos e que aparecem no Google',
  'Atendimento personalizado do início ao fim',
  'Entrega dentro do prazo combinado',
  'Suporte após a entrega do projeto',
];

export default function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-24 bg-background/55 backdrop-blur-[2px]">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div className="space-y-6">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent/80 mb-3">
                Quem somos
              </span>
              <h2
                className="font-headline text-3xl font-bold text-white md:text-4xl"
                style={{ textShadow: '0 0 10px hsla(var(--accent), 0.5)' }}
              >
                Sobre a Arete Groupp
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Nascemos para ajudar negócios brasileiros a crescerem no digital. Sabemos que muitos empreendedores têm ótimos produtos, mas precisam de uma presença online profissional para vender mais.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Nossa equipe transforma ideias em sites, lojas e sistemas que realmente funcionam — bonitos, rápidos e pensados para converter visitantes em clientes.
            </p>

            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/90">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              { value: '+150', label: 'Projetos Entregues' },
              { value: '98%', label: 'Clientes Satisfeitos' },
              { value: '+5',  label: 'Anos no Mercado' },
              { value: '24h', label: 'Suporte Dedicado' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-lg transition-all hover:border-accent/30 hover:shadow-accent/10"
              >
                <p className="font-headline text-3xl md:text-4xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
