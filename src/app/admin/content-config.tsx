import {
  projects as staticProjects,
  testimonials as staticTestimonials,
  type Project,
  type Testimonial,
} from '@/lib/data';

export type FieldType = 'text' | 'url' | 'textarea' | 'rating';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

export interface ContentTypeConfig<T> {
  key: string;
  /** Tab label */
  label: string;
  /** Firestore collection name */
  collection: string;
  /** Static fallback shown when the collection is empty */
  staticFallback: T[];
  /** Fields shown (in order) in the create/edit form */
  fields: FieldConfig[];
  /** Default values for a brand-new item */
  emptyValues: Record<string, string | number>;
  /** Field used as the card title in the admin list */
  titleKey: string;
  /** Field used to confirm deletion (shown in the confirm dialog) */
  deleteLabelKey: string;
  newButtonLabel: string;
  emptyStateText: string;
}

export const projectConfig: ContentTypeConfig<Project> = {
  key: 'projects',
  label: 'Projetos',
  collection: 'projects',
  staticFallback: staticProjects,
  titleKey: 'title',
  deleteLabelKey: 'title',
  newButtonLabel: 'Novo projeto',
  emptyStateText: 'Nenhum projeto cadastrado ainda. O site está exibindo os projetos padrão. Esta lista alimenta tanto a seção "Projetos em Destaque" quanto a vitrine "Estudos de Caso e Resultados".',
  emptyValues: {
    title: '',
    description: '',
    imageUrl: '',
    problem: '',
    technology: '',
    solution: '',
    link: '',
  },
  fields: [
    { key: 'title', label: 'Título do projeto', type: 'text', required: true, placeholder: 'Ex: Loja de Roupas Premium' },
    { key: 'description', label: 'Descrição curta', type: 'textarea', required: true, placeholder: 'Resumo de uma ou duas frases sobre o projeto.' },
    { key: 'imageUrl', label: 'URL da imagem', type: 'url', required: true, placeholder: 'https://...', helperText: 'Cole o link de uma imagem ou screenshot do site (ex: hospedada no Imgur, Unsplash, etc).' },
    { key: 'problem', label: 'Problema', type: 'textarea', required: true, placeholder: 'Qual problema o cliente tinha antes?' },
    { key: 'technology', label: 'Tecnologias usadas', type: 'text', required: true, placeholder: 'Ex: Next.js, Tailwind CSS, Firebase' },
    { key: 'solution', label: 'Solução / Resultado entregue', type: 'textarea', required: true, placeholder: 'O que foi desenvolvido e qual resultado isso gerou?', helperText: 'Aparece como "Solução" nos destaques e como "O Resultado" na vitrine de estudos de caso.' },
    { key: 'link', label: 'Link do site', type: 'url', required: true, placeholder: 'https://meusite.com' },
  ],
};

export const testimonialConfig: ContentTypeConfig<Testimonial> = {
  key: 'testimonials',
  label: 'Depoimentos',
  collection: 'testimonials',
  staticFallback: staticTestimonials,
  titleKey: 'nome',
  deleteLabelKey: 'nome',
  newButtonLabel: 'Novo depoimento',
  emptyStateText: 'Nenhum depoimento cadastrado ainda. O site está exibindo os depoimentos padrão.',
  emptyValues: {
    nome: '',
    comentario: '',
    avaliacao: 5,
    imageUrl: '',
  },
  fields: [
    { key: 'nome', label: 'Nome do cliente', type: 'text', required: true, placeholder: 'Ex: Lucas M.' },
    { key: 'comentario', label: 'Depoimento', type: 'textarea', required: true, placeholder: 'O que o cliente disse sobre o serviço?' },
    { key: 'avaliacao', label: 'Avaliação (estrelas)', type: 'rating', required: true },
    { key: 'imageUrl', label: 'URL da foto', type: 'url', required: false, placeholder: 'https://... (opcional)', helperText: 'Foto do cliente. Se deixar vazio, será usada uma imagem padrão.' },
  ],
};

export const contentConfigs = [projectConfig, testimonialConfig];
