'use client';

import { useFirestoreContent } from './use-content';
import { projects as staticProjects, testimonials as staticTestimonials, type Project, type Testimonial } from '@/lib/data';
import type { WithId } from '@/firebase/firestore/use-collection';

/**
 * Returns the list of projects to display on the public site.
 *
 * It subscribes to the `projects` collection on Firestore. If that
 * collection has documents, they take precedence. Otherwise (collection
 * empty, still loading, or unavailable) it falls back to the static
 * projects defined in `src/lib/data.ts`, so the site keeps working even
 * before any project has been registered through /admin.
 *
 * This same list feeds both the "Projetos em Destaque" highlights (top 3)
 * and the "Estudos de Caso e Resultados" showcase carousel (all items), so
 * any project added or edited in /admin updates both sections live.
 */
export function useProjects(): { projects: WithId<Project>[]; isLoading: boolean } {
  const { items, isLoading } = useFirestoreContent<Project>('projects', staticProjects);
  return { projects: items, isLoading };
}

/**
 * Same pattern as {@link useProjects}, for the testimonials carousel.
 */
export function useTestimonials(): { testimonials: WithId<Testimonial>[]; isLoading: boolean } {
  const { items, isLoading } = useFirestoreContent<Testimonial>('testimonials', staticTestimonials);
  return { testimonials: items, isLoading };
}
