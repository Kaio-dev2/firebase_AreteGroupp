'use client';

import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { WithId } from '@/firebase/firestore/use-collection';

/**
 * Subscribes to a Firestore collection (ordered by `createdAt` desc) and
 * falls back to a static array (from `src/lib/data.ts`) when that
 * collection has no documents yet, is still loading, or is unavailable.
 *
 * This lets the public site keep working with the original built-in
 * content, while anything added/edited through /admin (stored in
 * Firestore) takes precedence and updates live for every visitor.
 */
export function useFirestoreContent<T>(
  collectionName: string,
  staticFallback: T[]
): { items: WithId<T>[]; isLoading: boolean } {
  const firestore = useFirestore();

  const contentQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, collectionName), orderBy('createdAt', 'desc')) : null),
    [firestore, collectionName]
  );

  const { data, isLoading } = useCollection<T>(contentQuery);

  if (data && data.length > 0) {
    return { items: data, isLoading: false };
  }

  if (isLoading) {
    return { items: [], isLoading: true };
  }

  return {
    items: staticFallback.map((item) => ({ ...item })) as WithId<T>[],
    isLoading: false,
  };
}
