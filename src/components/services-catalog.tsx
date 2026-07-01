'use client';

import { useState } from 'react';
import { Globe, ShoppingBag, Code2, Link2, Instagram, Palette, ArrowRight, Check } from 'lucide-react';

const services = [
  {
    id: 'site',
    icon: Globe,
    title: 'Site Profissional',
    subtitle: 'Landing Page & Institucional',
    description: 'Seu negócio apresentado de forma bonita e profissional na internet. Ideal para atrair clientes, gerar confiança e vender mais.',
    features: ['Design exclusivo e moderno', 'Funciona no celular', 'Aparece no Google', 'Formulário de contato'],
    accent: 'hsl(221,83%,60%)',
    popular: false,
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: 'Loja Online',
    subtitle: 'Venda 24h por dia',
    description: 'Loja virtual completa para você vender seus produtos na internet, receber pagamentos e gerenciar tudo com facilidade.',
    features: ['Receba pagamentos online', 'Catálogo de produtos', 'Painel de controle', 'Pedidos automáticos'],
    accent: 'hsl(160,80%,45%)',
    popular: true,
  },
  {
    id: 'sistema',
    icon: Code2,
    title: 'Sistema para o Negócio',
    subtitle: 'Organize sua empresa',
    description: 'Sistema simples e personalizado para organizar seu negócio: agendamentos, cadastro de clientes, controle de pedidos e muito mais.',
    features: ['Acesso por login', 'Controle de clientes', 'Agendamentos online', 'Relatórios simples'],
    accent: 'hsl(270,80%,65%)',
    popular: false,
  },
  {
    id: 'pagina-central',
    icon: Link2,
    title: 'Página Central',
    subtitle: 'Tudo em um só lugar',
    description: 'Uma página que reúne todos os seus links, serviços e redes sociais em um único endereço fácil de compartilhar com qualquer pessoa.',
    features: ['Visual personalizado', 'Todos os seus links', 'Fácil de atualizar', 'Domínio próprio'],
    accent: 'hsl(32,95%,55%)',
    popular: false,
  },
  {
    id: 'bio-instagram',
    icon: Instagram,
    title: 'Bio do Instagram',
    subtitle: 'Link profissional na bio',
    description: 'Substitua o link único da bio por uma página bonita que direciona seus seguidores para onde você quiser: WhatsApp, loja, catálogo.',
    features: ['Parece um app profissional', 'Carrega super rápido', 'Fácil de atualizar', 'Conta os cliques'],
    accent: 'hsl(330,80%,60%)',
    popular: false,
  },
  {
    id: 'logo',
    icon: Palette,
    title: 'Logo & Identidade Visual',
    subtitle: 'A cara da sua marca',
    description: 'Criamos o logo e a identidade visual da sua marca do zero — cores, tipografia e estilo que representam quem você é.',
    features: ['Logo em alta resolução', 'Versão colorida e branca', 'Arquivos para usar em tudo', 'Manual de marca'],
    accent: 'hsl(45,95%,55%)',
    popular: false,
  },
];

const WA_LINK = 'https://wa.me/5547933801637';

export default function ServicesCatalog() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="servicos" className="relative overflow-hidden py-10 sm:py-14 md:py-24 bg-secondary/45 backdrop-blur-[2px]">
      <div className="container relative z-10 mx-auto px-4 md:px-6">

        <div className="mb-8 md:mb-12 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent/80 mb-3">
            O que fazemos
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ textShadow: '0 0 10px hsla(var(--accent), 0.5)' }}>
            Catálogo de Serviços
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Escolha o que você precisa e entre em contato — faremos um orçamento sem compromisso.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const isHovered = hovered === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative group flex flex-col rounded-2xl border bg-card overflow-hidden transition-all duration-300"
                style={{
                  borderColor: isHovered ? service.accent + '55' : 'hsl(var(--border))',
                  boxShadow: isHovered ? `0 0 0 1px ${service.accent}33, 0 16px 40px -12px ${service.accent}33` : 'none',
                  transform: isHovered ? 'translateY(-3px)' : 'none',
                }}
              >
                {service.popular && (
                  <div className="absolute top-3 right-3 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ background: service.accent }}>
                    Popular
                  </div>
                )}

                <div className="h-1 w-full transition-opacity duration-300"
                  style={{ background: service.accent, opacity: isHovered ? 0.7 : 0.2 }} />

                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isHovered ? service.accent + '22' : 'hsl(var(--secondary))',
                        boxShadow: isHovered ? `0 0 16px ${service.accent}44` : 'none',
                      }}>
                      <Icon className="h-5 w-5 transition-colors duration-300"
                        style={{ color: isHovered ? service.accent : 'hsl(var(--muted-foreground))' }} />
                    </div>
                    <div>
                      <h3 className="font-headline text-base sm:text-lg font-bold text-white leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 mb-5 flex-1">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
                        <Check className="h-3.5 w-3.5 flex-shrink-0 transition-colors duration-300"
                          style={{ color: isHovered ? service.accent : 'hsl(var(--muted-foreground))' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`${WA_LINK}?text=Olá! Tenho interesse no serviço: ${service.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-300"
                    style={{
                      background: isHovered ? service.accent : 'hsl(var(--secondary))',
                      color: isHovered ? '#fff' : 'hsl(var(--muted-foreground))',
                    }}
                  >
                    Solicitar orçamento
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Não encontrou o que procura? A gente resolve — fazemos projetos sob medida.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent/10 hover:border-accent">
            Falar sobre projeto personalizado
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
