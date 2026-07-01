'use client';

import { resolveProjectImage } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/data';
import type { WithId } from '@/firebase/firestore/use-collection';

export default function ProjectsSection({ projects }: { projects: WithId<Project>[] }) {
  return (
    <section id="projects" className="relative overflow-hidden py-16 md:py-24 bg-background/55 backdrop-blur-[2px]">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent/80 mb-3">
            Portfólio
          </span>
          <h2 className="font-headline text-3xl font-bold text-white mb-4" style={{ textShadow: '0 0 10px hsla(var(--accent), 0.5)' }}>
            Nossos Projetos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Confira alguns dos sites profissionais que já entregamos para nossos clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => {
            const { url: imageUrl, hint: imageHint } = resolveProjectImage(project);
            return (
              <Card key={project.id} className="group card-tech overflow-hidden border-border bg-card shadow-lg">
                {/* Browser-window style frame so screenshots read as "live sites" */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-secondary/60 border-b border-border">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="card-img-wrap aspect-[3/2] relative overflow-hidden bg-gradient-to-br from-secondary/40 to-secondary/10">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    data-ai-hint={imageHint}
                  />
                </div>
                <CardHeader className="pb-1 sm:pb-2">
                  <CardTitle className="font-headline text-xl text-accent">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p><span className="text-accent font-semibold">Problema:</span> <span className="text-muted-foreground line-clamp-2">{project.problem}</span></p>
                    <p><span className="text-accent font-semibold">Tecnologia:</span> <span className="text-muted-foreground">{project.technology}</span></p>
                    <p className="hidden sm:block"><span className="text-accent font-semibold">Solução:</span> <span className="text-muted-foreground line-clamp-2">{project.solution}</span></p>
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent text-xs sm:text-sm font-medium hover:underline mt-1">
                    Ver site <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button variant="outline" size="lg" className="border-accent/50 hover:bg-accent/10 hover:border-accent text-white group">
              Ver todos os projetos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
