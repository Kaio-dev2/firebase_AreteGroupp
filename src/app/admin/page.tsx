'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Logo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, LayoutDashboard, Briefcase, MessageSquareQuote, ExternalLink } from 'lucide-react';
import { contentConfigs } from './content-config';
import { ContentTab } from './content-tab';

/**
 * TEMPORARY admin authentication.
 *
 * This is a simple hardcoded check kept in the browser session, used while
 * a real authentication provider (Google / GitHub via Firebase Auth) is set
 * up. It does NOT call Firebase Auth, so `request.auth` will be `null` for
 * Firestore writes made from this panel - the collections managed here have
 * been temporarily relaxed to allow that (see firestore.rules).
 *
 * Replace this with real Firebase Auth + `roles_admin` once OAuth is ready.
 */
const ADMIN_USERNAME = 'AdminKaioeLorvens';
const ADMIN_EMAIL = 'aretegroupp@gmail.com';
const ADMIN_PASSWORD = 'aretegroupp@gmail.com';
const SESSION_KEY = 'arete_admin_session';

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAuthed(sessionStorage.getItem(SESSION_KEY) === 'true');
  }, []);

  if (isAuthed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAuthed) {
    return <AdminLogin onSuccess={() => setIsAuthed(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthed(false)} />;
}

/* -------------------------------------------------------------------------- */
/* Login                                                                       */
/* -------------------------------------------------------------------------- */

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const identifier = login.trim().toLowerCase();
    const validIdentifier =
      identifier === ADMIN_USERNAME.toLowerCase() || identifier === ADMIN_EMAIL.toLowerCase();
    const validPassword = password === ADMIN_PASSWORD;

    // Small delay so the button feedback feels intentional, not instant/fake.
    setTimeout(() => {
      if (validIdentifier && validPassword) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        onSuccess();
      } else {
        toast({
          variant: 'destructive',
          title: 'Falha no login',
          description: 'Usuário ou senha incorretos.',
        });
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl -top-24 -left-24 animate-blob"></div>
        <div className="absolute h-[500px] w-[500px] rounded-full bg-secondary blur-3xl -bottom-24 -right-24 animate-blob [animation-delay:2s]"></div>
      </div>

      <Card className="w-full max-w-md z-10 border-border bg-card/80 backdrop-blur-md shadow-2xl">
        <CardHeader className="space-y-1 flex flex-col items-center text-center">
          <Logo className="h-10 w-10 text-accent mb-2" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--accent)))' }} />
          <CardTitle className="text-2xl font-bold font-headline text-white">Painel Administrativo</CardTitle>
          <CardDescription>Acesso restrito — Arete Groupp</CardDescription>
        </CardHeader>
        {/* autoComplete="off" on the form + a hidden dummy field are required because
            most browsers ignore autocomplete="off" on individual inputs and will
            still auto-fill the first text/password fields with previously saved
            credentials for this site. This combination reliably prevents that. */}
        <form onSubmit={handleSubmit} autoComplete="off">
          <input type="text" name="prevent_autofill_user" autoComplete="off" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
          <input type="password" name="prevent_autofill_pass" autoComplete="new-password" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin_login_field">Usuário ou e-mail</Label>
              <Input
                id="admin_login_field"
                name="admin_login_field"
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="AdminKaioeLorvens"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin_password_field">Senha</Label>
              <Input
                id="admin_password_field"
                name="admin_password_field"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 h-11 font-bold" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Entrar'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                   */
/* -------------------------------------------------------------------------- */

const TAB_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  projects: Briefcase,
  testimonials: MessageSquareQuote,
};

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-2 min-w-0">
            <LayoutDashboard className="h-5 w-5 md:h-6 md:w-6 text-accent shrink-0" />
            <span className="font-headline text-base md:text-lg font-bold text-white truncate">
              <span className="sm:hidden">Painel</span>
              <span className="hidden sm:inline">Painel Administrativo</span>
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                <ExternalLink className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Ver site</span>
              </Button>
            </a>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-white">
              <LogOut className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-6">
        <Tabs defaultValue={contentConfigs[0].key} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 h-auto">
            {contentConfigs.map((config) => {
              const Icon = TAB_ICONS[config.key] ?? Briefcase;
              return (
                <TabsTrigger key={config.key} value={config.key} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2.5 text-xs sm:text-sm">
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{config.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* forceMount: all three tabs' Firestore listeners (useCollection)
              mount once at page load and stay mounted, hidden via the
              native `hidden` attribute when inactive. Mounting/unmounting
              these listeners on every tab switch triggers a known
              firebase-js-sdk v11.9 race ("INTERNAL ASSERTION FAILED ... Fe:-1")
              when a query's onSnapshot is rapidly re-subscribed. */}
          {contentConfigs.map((config) => (
            <TabsContent key={config.key} value={config.key} forceMount>
              <ContentTab config={config} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
