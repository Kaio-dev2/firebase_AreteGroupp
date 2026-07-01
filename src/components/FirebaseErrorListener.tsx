'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * An invisible component that listens for globally emitted 'permission-error' events
 * and logs them to the console for debugging.
 *
 * IMPORTANT: this component intentionally does NOT throw the error, and uses
 * console.warn (not console.error). Throwing here would propagate to the nearest
 * error boundary (the whole app, since this sits in the root layout) and crash the
 * entire site for every visitor whenever a single Firestore read/write is denied by
 * the security rules - including expected cases like an anonymous visitor not having
 * admin rights. Likewise, console.error is intercepted by Next.js's dev overlay and
 * rendered as a full-screen error, which has the same effect as throwing. warn keeps
 * the issue visible in the browser console without breaking the public site.
 */
export function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      console.warn('[Firestore Permission Error]', error.message, error.request);
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null;
}
