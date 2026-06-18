'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { useProjects } from '@/hooks/use-projects';
import { resolveProjectImage } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export default function ProjectsPage() {
  const { projects } = useProjects();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent/80 mb-3">
              Portfólio completo
            </span>
            <h1 className="font-headline text-4xl font-bold text-white mb-4" style={{ textShadow: '0 0 10px hsla(var(--accent), 0.5)' }}>
              Nossos Projetos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore alguns dos trabalhos que realizamos. De portfólios minimalistas a sistemas complexos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const { url: imageUrl, hint: imageHint } = resolveProjectImage(project);
              return (
                <Card key={project.id} className="group overflow-hidden border-border bg-card shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 hover:border-accent/40">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-secondary/60 border-b border-border">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="aspect-[3/2] relative overflow-hidden bg-gradient-to-br from-secondary/40 to-secondary/10">
                    <Image
                      src={imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      data-ai-hint={imageHint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl text-accent">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-accent font-semibold">Problema: </span>
                        <span className="text-muted-foreground">{project.problem}</span>
                      </div>
                      <div>
                        <span className="text-accent font-semibold">Tecnologia: </span>
                        <span className="text-muted-foreground">{project.technology}</span>
                      </div>
                      <div>
                        <span className="text-accent font-semibold">Solução: </span>
                        <span className="text-muted-foreground">{project.solution}</span>
                      </div>
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent text-sm font-medium hover:underline mt-1">
                      Ver site <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
