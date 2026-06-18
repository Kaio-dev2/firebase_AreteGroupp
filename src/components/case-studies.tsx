'use client';

import { resolveProjectImage } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Code, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/data';
import type { WithId } from '@/firebase/firestore/use-collection';

export default function CaseStudies({ projects }: { projects: WithId<Project>[] }) {
  return (
    <section id="cases" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent/80 mb-3">
            Resultados
          </span>
          <h2 className="font-headline text-3xl font-bold text-white mb-4" style={{ textShadow: '0 0 10px hsla(var(--accent), 0.5)' }}>
            Estudos de Caso e Resultados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja como resolvemos problemas complexos e geramos valor real para nossos clientes.
          </p>
        </div>

        <Carousel
          opts={{ align: 'start', loop: false }}
          className="w-full"
        >
          <CarouselContent>
            {projects.map((project) => {
              const { url: imageUrl, hint: imageHint } = resolveProjectImage(project);
              return (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="group h-full overflow-hidden border-border bg-card shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/40 flex flex-col">
                    <div className="flex items-center justify-between gap-1.5 px-3 py-2 bg-secondary/60 border-b border-border">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                      </div>
                      <Badge variant="secondary" className="bg-accent/90 text-white text-xs">
                        {project.technology}
                      </Badge>
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
                    <CardHeader className="pb-2">
                      <CardTitle className="font-headline text-xl text-white">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs uppercase font-bold text-muted-foreground">O Problema</p>
                            <p className="text-sm text-foreground/90 line-clamp-3">{project.problem}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs uppercase font-bold text-muted-foreground">Tecnologia</p>
                            <p className="text-sm text-foreground/90">{project.technology}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs uppercase font-bold text-muted-foreground">O Resultado</p>
                            <p className="text-sm font-semibold text-white line-clamp-3">{project.solution}</p>
                          </div>
                        </div>
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent text-sm font-medium hover:underline">
                        Ver site <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-12" />
          <CarouselNext className="hidden sm:flex -right-4 lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}
