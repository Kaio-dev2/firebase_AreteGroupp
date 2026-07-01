import { Cpu, Sparkles, Home, Dumbbell, Code, Zap, Target, TrendingUp } from 'lucide-react';

export interface Service {
    id: string;
    nome: string;
    preco: number;
    descricao: string;
    desconto: string;
    animation: string;
    link: string;
}

export interface OfferPage {
  id: string;
  title: string;
  price: number;
  discount: string;
  imageUrl: string;
  imageHint: string;
  timer: string;
  description: string;
  copy: string;
  benefits: string[];
  ctaButton: {
    label: string;
    link: string;
  };
}

export interface Testimonial {
  id: string;
  nome: string;
  image?: string;
  imageUrl?: string;
  avaliacao: number;
  comentario: string;
  createdAt?: any;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageUrl?: string;
  problem: string;
  technology: string;
  solution: string;
  link: string;
  createdAt?: any;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  problem: string;
  technology: string;
  result: string;
  image?: string;
  imageUrl?: string;
  createdAt?: any;
}

export const services: Service[] = [
  {
    id: '1',
    nome: "Site Básico",
    preco: 200,
    descricao: "Sua vitrine profissional 24h por dia.",
    desconto: "10%",
    animation: "fade-in",
    link: "/ofertas/1"
  },
  {
    id: '2',
    nome: "Site Intermediário",
    preco: 300,
    descricao: "Design de elite focado em conversão.",
    desconto: "15%",
    animation: "fade-in",
    link: "/ofertas/2"
  },
  {
    id: '3',
    nome: "Loja Virtual Inicial",
    preco: 450,
    descricao: "Comece a vender hoje mesmo.",
    desconto: "20%",
    animation: "slide-up",
    link: "/ofertas/3"
  },
  {
    id: '4',
    nome: "Loja Profissional",
    preco: 600,
    descricao: "E-commerce robusto e otimizado.",
    desconto: "25%",
    animation: "slide-up",
    link: "/ofertas/4"
  },
  {
    id: '5',
    nome: "E-commerce Premium",
    preco: 800,
    descricao: "A solução definitiva para grandes vendas.",
    desconto: "30%",
    animation: "zoom-in",
    link: "/ofertas/5"
  },
  {
    id: '6',
    nome: "Plataforma Avançada",
    preco: 1000,
    descricao: "Sistemas web sob medida para sua empresa.",
    desconto: "20%",
    animation: "zoom-in",
    link: "/ofertas/6"
  },
  {
    id: '7',
    nome: "Projeto Personalizado",
    preco: 1290,
    descricao: "Exclusividade total para sua marca.",
    desconto: "35%",
    animation: "glow",
    link: "/ofertas/7"
  }
];

export const testimonials: Testimonial[] = [
  { id: '1', nome: 'Lucas Mendes',    comentario: 'A equipe entendeu exatamente o que eu precisava. O site ficou muito acima das minhas expectativas — rápido, bonito e já trouxe clientes novos na primeira semana.', image: 'testimonial-1', avaliacao: 5 },
  { id: '2', nome: 'Mariana Rocha',   comentario: 'Minha loja virtual decolou depois que a Arete cuidou do projeto. As vendas cresceram 40% no primeiro mês. Atendimento impecável do início ao fim.', image: 'testimonial-2', avaliacao: 5 },
  { id: '3', nome: 'Felipe Alves',    comentario: 'Custo-benefício excelente. Fui bem orientado durante todo o processo e o resultado final surpreendeu. Recomendo sem hesitar para qualquer empreendedor.', image: 'testimonial-3', avaliacao: 5 },
  { id: '4', nome: 'Camila Souza',    comentario: 'Design sofisticado e alinhado à identidade da minha marca. O site é elogiado por todos os meus clientes. A equipe tem um olhar apurado para detalhes.', image: 'testimonial-1', avaliacao: 5 },
  { id: '5', nome: 'Rafael Torres',   comentario: 'Prazo cumprido, comunicação clara e entrega além do combinado. Raramente vejo esse nível de comprometimento. A Arete Groupp é referência no que faz.', image: 'testimonial-2', avaliacao: 5 },
  { id: '6', nome: 'Juliana Pinto',   comentario: 'Estava insegura em investir, mas foi a melhor decisão que tomei. Hoje recebo contatos direto pelo Google toda semana. O ROI veio mais rápido do que imaginei.', image: 'testimonial-3', avaliacao: 5 },
  { id: '7', nome: 'Anderson Lima',   comentario: 'Meu consultório lotou a agenda em duas semanas após o site entrar no ar. A presença digital que a Arete construiu transformou completamente meu negócio.', image: 'testimonial-1', avaliacao: 5 },
  { id: '8', nome: 'Bianca Cardoso',  comentario: 'Perfeição na entrega e suporte real depois da conclusão. Qualquer ajuste é feito rapidamente. Sinto que tenho um parceiro digital de longo prazo.', image: 'testimonial-2', avaliacao: 5 },
  { id: '9', nome: 'Thiago Neves',    comentario: 'Recuperei o investimento em menos de três meses. É o tipo de parceria que todo empresário precisa — séria, profissional e focada em resultado.', image: 'testimonial-3', avaliacao: 5 },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'BM Barbearia e Cosméticos',
    description: 'Site institucional para barbearia premium com seção de serviços e loja de cosméticos.',
    image: 'project-1',
    problem: 'O cliente não tinha presença digital e perdia clientes por falta de um canal de apresentação profissional e agendamento online.',
    technology: 'HTML, CSS, JavaScript, GitHub Pages.',
    solution: 'Desenvolvimento de landing page com identidade visual sofisticada, botão de agendamento via WhatsApp e vitrine de produtos cosméticos.',
    link: 'https://kaio-dev2.github.io/BArbearia-daniel/'
  },
  {
    id: '2',
    title: 'AviVet — Clínica Veterinária',
    description: 'Plataforma de agendamento online para clínica especializada em medicina aviária.',
    image: 'project-2',
    problem: 'A clínica operava com agendamentos manuais por telefone, gerando erros, esquecimentos e alto custo operacional.',
    technology: 'Next.js, Tailwind CSS, Vercel.',
    solution: 'Sistema de agendamento online com cadastro de tutores, listagem de serviços e interface amigável para facilitar a marcação de consultas.',
    link: 'https://clinica-veterinaria-gamma.vercel.app/'
  },
  {
    id: '3',
    title: 'KaizenFit — Plataforma de Saúde',
    description: 'Dashboard completo de bem-estar com treinos, nutrição, IA Coach e ranking de usuários.',
    image: 'project-3',
    problem: 'Usuários precisavam de uma solução centralizada para acompanhar treinos, nutrição e evolução física sem usar múltiplos apps.',
    technology: 'Next.js, Firebase, Tailwind CSS, Vercel.',
    solution: 'Plataforma SaaS com dashboard gamificado, streak de dias seguidos, IA Coach personalizado e sistema de conquistas para engajamento.',
    link: 'https://kaizen-fit-x.vercel.app/'
  },
  {
    id: '4',
    title: 'Contabilidade Dashboard',
    description: 'Sistema financeiro completo com faturamento, despesas, obrigações fiscais e relatórios.',
    image: 'project-4',
    problem: 'Empresa sem visibilidade financeira em tempo real, dependendo de planilhas manuais para controlar faturamento e impostos.',
    technology: 'React, Recharts, Tailwind CSS, Vercel.',
    solution: 'Dashboard financeiro com gráficos de faturamento mensal, despesas por categoria, lucro líquido e painel de obrigações fiscais pendentes.',
    link: 'https://contabilidade-dashboard.vercel.app/'
  },
  {
    id: '5',
    title: 'Samshine Beauty — Cosméticos',
    description: 'Página de vendas para consultora de perfumes O Boticário e Natura com catálogo e avaliações.',
    image: 'project-5',
    problem: 'Consultora de beleza dependia apenas de grupos de WhatsApp para divulgar produtos, sem um canal profissional de vendas e vitrine.',
    technology: 'HTML, CSS, JavaScript, GitHub Pages.',
    solution: 'Landing page elegante com catálogo de perfumes, avaliações de clientes, provas sociais e botão direto para compra via WhatsApp.',
    link: 'https://lorvenshenry.github.io/samshine/#prova'
  },
  {
    id: '6',
    title: 'Neos Agência — Posicionamento Digital',
    description: 'Site institucional para agência de marketing, com foco em construir autoridade e percepção de valor para marcas.',
    imageUrl: '/projects/screenshots/neosagencia.jpg',
    problem: 'Marcas que postam e anunciam nas redes sociais, mas não são percebidas como autoridade e não entendem por que isso não converte em vendas.',
    technology: 'HTML, CSS, JavaScript.',
    solution: 'Site one-page com seções de diagnóstico, portfólio de serviços (Design Gráfico, Social Media, Tráfego Pago, Identidade Visual), apresentação da equipe, depoimentos e captura de e-book para geração de leads.',
    link: '/projects/neosagencia.html'
  },
  {
    id: '7',
    title: 'Método Fit 2.0',
    description: 'Landing page de vendas para programa de treinos e nutrição com foco em performance e resultados.',
    imageUrl: 'https://image.thum.io/get/width/1200/crop/800/https://metodo-fit-20-fit.vercel.app/',
    problem: 'Criador de conteúdo fitness sem uma página própria para apresentar o método e vender o programa, dependendo apenas de redes sociais.',
    technology: 'Next.js, Tailwind CSS, Vercel.',
    solution: 'Landing page de alta conversão apresentando o método, benefícios, prova social e chamada para ação direcionando à inscrição no programa.',
    link: 'https://metodo-fit-20-fit.vercel.app/'
  },
  {
    id: '8',
    title: 'LiNutri pelo Mundo — Ligia Ferreira',
    description: 'Site para nutricionista especializada em brasileiros morando ou viajando para o exterior, com consultoria online e e-book gratuito.',
    imageUrl: '/projects/screenshots/linutri.jpg',
    problem: 'Nutricionista sem um canal profissional para atrair brasileiros no exterior, captar leads e apresentar seus serviços de forma organizada.',
    technology: 'HTML, CSS, JavaScript.',
    solution: 'Site completo com apresentação pessoal, serviços de consultoria personalizados, captura de e-book ("Manual Prático de Alimentação para Intercambistas"), guias de alimentação por país e depoimentos de clientes.',
    link: '/projects/linutri.html'
  },
  {
    id: '9',
    title: 'Arraia Mídias — Estúdio Criativo Digital',
    description: 'Site institucional e portfólio em vídeo para estúdio de produção de conteúdo mobile, redes sociais e cobertura de eventos.',
    imageUrl: '/projects/screenshots/arraia-midias.jpg',
    problem: 'Estúdio de produção de conteúdo sem um portfólio organizado para apresentar trabalhos a clientes e fechar novos contratos.',
    technology: 'HTML, CSS, JavaScript.',
    solution: 'Site institucional com serviços (captação de vídeo mobile, gestão de redes sociais, cobertura de eventos, fotos polaroid), processo de trabalho e uma página dedicada de portfólio em vídeo com 21 trabalhos organizados por categoria.',
    link: '/projects/arraia-midias.html'
  },
  {
    id: '10',
    title: 'Dandara Thereza — Página de Vendas',
    description: 'Landing page de alta conversão para grupo VIP de conteúdo, com prova social e gatilhos de conversão.',
    imageUrl: '/projects/screenshots/dandara.jpg',
    problem: 'Criadora de conteúdo com grande audiência nas redes sociais, mas sem uma página de vendas profissional para converter seguidores em assinantes do grupo VIP.',
    technology: 'HTML, CSS, JavaScript.',
    solution: 'Landing page de alto impacto com identidade visual sofisticada, números de autoridade (seguidores, alunos, avaliação), depoimentos e botão de chamada para ação direto para o grupo VIP.',
    link: '/projects/dandara.html'
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'AviVet — Clínica Veterinária',
    client: 'Clinica Bem-Estar',
    problem: ' A clínica operava com agendamentos manuais por telefone, gerando erros, esquecimentos e alto custo operacional..',
    technology: 'Next.js 15, Tailwind CSS, Firebase Auth.',
    result: 'Sistema de agendamento online com cadastro de tutores, listagem de serviços e interface amigável para facilitar a marcação de consultas..',
    image: 'project-2'
  },
  {
    id: '2',
    title: 'KaizenFit — Plataforma de Saúde',
    client: 'KaizenFit',
    problem: 'Usuários precisavam de uma solução centralizada para acompanhar treinos, nutrição e evolução física sem usar múltiplos apps.',
    technology: 'React, Framer Motion, Cloud Firestore.',
    result: 'Plataforma SaaS com dashboard gamificado, streak de dias seguidos, IA Coach personalizado e sistema de conquistas para engajamento.',
    image: 'project-3'
  },
  {
    id: '3',
    title: 'BM Barbearia e Cosméticos',
    client: 'BM Barbearia e Cosméticos',
    problem: 'O cliente não tinha presença digital e perdia clientes por falta de um canal de apresentação profissional e agendamento online..',
    technology: 'Next.js, Firebase Functions, Realtime Database.',
    result: 'Desenvolvimento de landing page com identidade visual sofisticada, botão de agendamento via WhatsApp e vitrine de produtos cosméticos.',
    image: 'project-1'
  }
];

export const offerPages: OfferPage[] = [
  {
    id: "1",
    title: "Site Básico",
    price: 200,
    discount: "10%",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    imageHint: "simple website",
    timer: "72h",
    description: "Sua vitrine profissional 24h por dia.",
    copy: "Cansado de perder clientes por não ter um endereço digital? O Site Básico é a solução ideal para quem precisa de credibilidade imediata. Transformamos sua ideia em uma página profissional, rápida e otimizada para ser encontrada pelo seu público-alvo.",
    benefits: [
      "Layout Moderno e Responsivo (PC, Tablet e Celular)",
      "Botão de WhatsApp Direto para Conversão",
      "Otimização de SEO Inicial (Para ser achado no Google)",
      "Certificado SSL de Segurança Incluso",
      "Página de 'Link na Bio' Personalizada"
    ],
    ctaButton: {
      label: "Quero meu site agora!",
      link: "https://wa.me/5547933801637"
    }
  },
  {
    id: "2",
    title: "Site Intermediário",
    price: 300,
    discount: "15%",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    imageHint: "modern website",
    timer: "72h",
    description: "Design de elite focado em conversão de leads.",
    copy: "Não basta estar na internet, é preciso convencer. O Site Intermediário utiliza técnicas de Copywriting e UX Design para guiar seu cliente até a compra. É a escolha de profissionais que querem se destacar da concorrência com um visual premium.",
    benefits: [
      "Design Exclusivo e Personalizado",
      "Até 5 Seções Estratégicas (Sobre, Serviços, Galeria, etc)",
      "Integração com Google Analytics e Pixel do Facebook",
      "Formulário de Contato Inteligente",
      "Velocidade de Carregamento Ultra-Rápida"
    ],
    ctaButton: {
      label: "Quero minha landing page agora!",
      link: "https://wa.me/5547933801637"
    }
  },
  {
    id: "3",
    title: "Loja Virtual Inicial",
    price: 450,
    discount: "20%",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    imageHint: "ecommerce start",
    timer: "72h",
    description: "Comece a vender hoje mesmo com segurança.",
    copy: "O dropshipping e o e-commerce nunca foram tão acessíveis. Criamos uma estrutura completa para você cadastrar seus produtos e receber pagamentos online sem dor de cabeça. Ideal para quem quer iniciar sua jornada no comércio eletrônico.",
    benefits: [
      "Cadastro de até 50 Produtos Iniciais",
      "Integração com Meios de Pagamento (Mercado Pago/Stripe)",
      "Sistema de Cálculo de Frete Automático",
      "Painel de Gerenciamento Simples para o Lojista",
      "Layout Focado em Mobile Commerce"
    ],
    ctaButton: {
      label: "Quero minha loja agora!",
      link: "https://wa.me/5547933801637"
    }
  },
  {
    id: "4",
    title: "Loja Profissional",
    price: 600,
    discount: "25%",
    imageUrl: "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
    imageHint: "professional store",
    timer: "72h",
    description: "E-commerce robusto para quem busca escala.",
    copy: "Sua loja está crescendo e você precisa de mais? A Loja Profissional oferece ferramentas avançadas de marketing e automação. Otimizada para SEO pesado e alta carga de acessos, garantindo que você nunca perca uma venda.",
    benefits: [
      "Produtos Ilimitados",
      "Integração com ERP e Sistemas de Estoque",
      "Sistema de Cupons de Desconto e Promoções",
      "Blog Integrado para SEO de Conteúdo",
      "Relatórios de Vendas Detalhados"
    ],
    ctaButton: {
      label: "Quero escalar minhas vendas!",
      link: "https://wa.me/5547933801637"
    }
  },
  {
    id: "5",
    title: "E-commerce Premium",
    price: 800,
    discount: "30%",
    imageUrl: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9c2",
    imageHint: "premium ecommerce",
    timer: "72h",
    description: "A solução definitiva para grandes operações de vendas.",
    copy: "Sua marca merece o melhor. Um e-commerce premium com checkout em uma página, recuperação de carrinho abandonado e design que grita autoridade. Tudo o que as grandes marcas usam para faturar milhões, agora ao seu alcance.",
    benefits: [
      "Checkout de Uma Única Página (Aumenta Conversão)",
      "Sistema de Recuperação de Carrinho Via WhatsApp",
      "Suporte VIP Prioritário por 60 Dias",
      "Consultoria de Marketing Digital Inclusa",
      "Integração com Marketplace (Amazon, Mercado Livre)"
    ],
    ctaButton: {
      label: "Quero a solução premium!",
      link: "https://wa.me/5547933801637"
    }
  },
  {
    id: "6",
    title: "Plataforma Avançada",
    price: 1000,
    discount: "20%",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    imageHint: "advanced platform",
    timer: "72h",
    description: "Sistemas web complexos sob medida para sua empresa.",
    copy: "Precisa de algo que não existe no mercado? Desenvolvemos plataformas SaaS, sistemas de agendamento ou dashboards de gestão personalizados. Tecnologia de ponta para automatizar e escalar seu negócio físico ou digital.",
    benefits: [
      "Desenvolvimento em Next.js e Firebase",
      "Área de Login Segura para Clientes",
      "Banco de Dados em Tempo Real",
      "Integração com APIs Externas",
      "Infraestrutura Escalável em Nuvem"
    ],
    ctaButton: {
      label: "Quero meu sistema exclusivo!",
      link: "https://wa.me/5547933801637"
    }
  },
  {
    id: "7",
    title: "Projeto Personalizado",
    price: 1290,
    discount: "35%",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
    imageHint: "custom project",
    timer: "72h",
    description: "Exclusividade total: Branding, Site e Estratégia.",
    copy: "O pacote completo para quem quer dominar o mercado. Além do site, entregamos toda a identidade visual e a estratégia de lançamento. Você não recebe apenas um site, recebe uma máquina de vendas pronta para ligar.",
    benefits: [
      "Identidade Visual Completa (Logo, Cores, Fontes)",
      "Site Profissional + Landing Page de Venda",
      "Configuração de Campanhas (Google/Meta Ads)",
      "Treinamento de Gestão da Plataforma",
      "Hospedagem Grátis por 1 Ano"
    ],
    ctaButton: {
      label: "Quero o pacote completo!",
      link: "https://wa.me/5547933801637"
    }
  }
];

export const categories = [];
export const products = [];
export const deals = [];
