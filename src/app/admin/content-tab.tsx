'use client';

import { useState, useMemo } from 'react';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useFirestoreContent } from '@/hooks/use-content';
import { resolveProjectImage } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Pencil, Trash2, ExternalLink, Star } from 'lucide-react';
import type { ContentTypeConfig } from './content-config';
import type { WithId } from '@/firebase/firestore/use-collection';

/* -------------------------------------------------------------------------- */
/* Tab: list + create button                                                   */
/* -------------------------------------------------------------------------- */

export function ContentTab<T extends Record<string, any>>({ config }: { config: ContentTypeConfig<T> }) {
  const { items, isLoading } = useFirestoreContent<T>(config.collection, config.staticFallback);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-white">{config.label}</h1>
          <p className="text-sm text-muted-foreground">
            Edite aqui o que aparece na seção "{config.label}" do site.
          </p>
        </div>
        <ContentFormDialog config={config} mode="create">
          <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 font-bold">
            <Plus className="mr-2 h-4 w-4" /> {config.newButtonLabel}
          </Button>
        </ContentFormDialog>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <Card className="border-border bg-card">
          <CardContent className="py-12 text-center text-muted-foreground">
            {config.emptyStateText}
            <br />
            Clique em <span className="text-accent font-semibold">"{config.newButtonLabel}"</span> para começar a personalizar.
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ContentItemCard key={item.id} config={config} item={item} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preview card (per content type)                                             */
/* -------------------------------------------------------------------------- */

function ContentItemCard<T extends Record<string, any>>({ config, item }: { config: ContentTypeConfig<T>; item: WithId<T> }) {
  const { url: imageUrl, hint: imageHint } = resolveProjectImage(item as any);

  return (
    <Card className="overflow-hidden border-border bg-card shadow-lg flex flex-col">
      <div className="aspect-[3/2] relative overflow-hidden bg-gradient-to-br from-secondary/40 to-secondary/10">
        <Image
          src={imageUrl}
          alt={String(item[config.titleKey] ?? '')}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-top"
          data-ai-hint={imageHint}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-headline text-lg text-accent">{item[config.titleKey]}</CardTitle>
        {config.key === 'projects' && <CardDescription className="line-clamp-2">{item.description}</CardDescription>}
        {config.key === 'testimonials' && (
          <div className="flex">
            {[...Array(Number(item.avaliacao) || 0)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            {[...Array(5 - (Number(item.avaliacao) || 0))].map((_, i) => (
              <Star key={`e-${i}`} className="h-4 w-4 fill-muted text-muted" />
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow space-y-1 text-sm">
        {config.key === 'projects' && (
          <>
            <p><span className="text-accent font-semibold">Tecnologia: </span><span className="text-muted-foreground">{item.technology}</span></p>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent text-sm hover:underline">
              Ver site <ExternalLink className="h-3 w-3" />
            </a>
          </>
        )}
        {config.key === 'testimonials' && (
          <p className="text-muted-foreground line-clamp-3 italic">"{item.comentario}"</p>
        )}
      </CardContent>
      <CardFooter className="gap-2 border-t border-border pt-4">
        <ContentFormDialog config={config} mode="edit" item={item}>
          <Button variant="outline" size="sm" className="flex-1 border-border">
            <Pencil className="mr-2 h-3.5 w-3.5" /> Editar
          </Button>
        </ContentFormDialog>
        <DeleteContentDialog config={config} item={item} />
      </CardFooter>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Create / Edit dialog                                                        */
/* -------------------------------------------------------------------------- */

function ContentFormDialog<T extends Record<string, any>>({
  config,
  mode,
  item,
  children,
}: {
  config: ContentTypeConfig<T>;
  mode: 'create' | 'edit';
  item?: WithId<T>;
  children: React.ReactNode;
}) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const initial: Record<string, string> = useMemo(() => {
    const values: Record<string, string> = {};
    for (const field of config.fields) {
      const source = mode === 'edit' && item ? item : config.emptyValues;
      const raw = (source as any)[field.key];
      values[field.key] = raw === undefined || raw === null ? String(config.emptyValues[field.key] ?? '') : String(raw);
    }
    return values;
  }, [config, mode, item]);

  const [form, setForm] = useState<Record<string, string>>(initial);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setForm(initial);
    }
  };

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const updateSelect = (key: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const buildPayload = () => {
    const payload: Record<string, any> = {};
    for (const field of config.fields) {
      const value = form[field.key] ?? '';
      payload[field.key] = field.type === 'rating' ? Number(value) : value;
    }
    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;

    setSaving(true);
    try {
      const payload = buildPayload();
      if (mode === 'create') {
        await addDoc(collection(firestore, config.collection), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        toast({ title: 'Adicionado!', description: 'O conteúdo já aparece no site.' });
      } else if (item) {
        await updateDoc(doc(firestore, config.collection, item.id), payload);
        toast({ title: 'Atualizado!', description: 'As alterações foram salvas.' });
      }
      setOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar. Tente novamente.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto bg-card border-border sm:max-w-lg sm:w-full">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl text-white">
            {mode === 'create' ? `Novo: ${config.label}` : `Editar: ${item ? String(item[config.titleKey]) : ''}`}
          </DialogTitle>
          <DialogDescription>
            Preencha as informações que serão exibidas no site.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {config.fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={`${config.key}-${field.key}`}>{field.label}</Label>
              {field.type === 'textarea' && (
                <Textarea
                  id={`${config.key}-${field.key}`}
                  value={form[field.key] ?? ''}
                  onChange={update(field.key)}
                  required={field.required}
                  rows={2}
                  placeholder={field.placeholder}
                />
              )}
              {(field.type === 'text' || field.type === 'url') && (
                <Input
                  id={`${config.key}-${field.key}`}
                  type={field.type === 'url' ? 'url' : 'text'}
                  value={form[field.key] ?? ''}
                  onChange={update(field.key)}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              )}
              {field.type === 'rating' && (
                <Select value={form[field.key] ?? '5'} onValueChange={updateSelect(field.key)}>
                  <SelectTrigger id={`${config.key}-${field.key}`}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {'★'.repeat(n)}{'☆'.repeat(5 - n)} ({n})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.helperText && <p className="text-xs text-muted-foreground">{field.helperText}</p>}
            </div>
          ))}
          <DialogFooter>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 font-bold" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === 'create' ? 'Adicionar' : 'Salvar alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Delete confirmation                                                         */
/* -------------------------------------------------------------------------- */

function DeleteContentDialog<T extends Record<string, any>>({ config, item }: { config: ContentTypeConfig<T>; item: WithId<T> }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const label = String(item[config.deleteLabelKey] ?? '');

  const handleDelete = async () => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, config.collection, item.id));
      toast({ title: 'Removido', description: `"${label}" foi excluído.` });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir',
        description: 'Não foi possível remover o item.',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10">
          <Trash2 className="mr-2 h-3.5 w-3.5" /> Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir <span className="text-white font-semibold">"{label}"</span>? Essa ação não pode ser desfeita e o item deixará de aparecer no site.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
