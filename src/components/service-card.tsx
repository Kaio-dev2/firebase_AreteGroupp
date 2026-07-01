'use client';

import { Service } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const whatsappUrl = `https://wa.me/5547933801637?text=Olá! Tenho interesse no serviço: ${encodeURIComponent(service.nome)}`;

  return (
    <Card className="group w-full overflow-hidden border-border bg-card shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
            <CardTitle className="font-headline text-xl text-accent">{service.nome}</CardTitle>
            {service.desconto && (
              <Badge variant="destructive" className="bg-accent text-accent-foreground text-sm">
                  <Tag className="mr-1 h-3 w-3"/>{service.desconto} OFF
              </Badge>
            )}
        </div>
        <CardDescription>{service.descricao}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Link href={service.link} className="text-sm text-accent hover:underline inline-flex items-center gap-1 mb-4">
          Ver mais detalhes técnicos
        </Link>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 mt-auto pt-6">
        <p className="text-2xl font-bold text-white">
          R$ {service.preco.toFixed(2)}
        </p>
        <div className="flex gap-2 w-full">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
                className="w-full bg-accent text-white font-bold transition-all duration-300 hover:bg-accent/90"
            >
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar com Arete
            </Button>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
