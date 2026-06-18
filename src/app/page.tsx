
'use client';

import Header from '@/components/header';
import Hero from '@/components/hero';
import Benefits from '@/components/benefits';
import AboutUs from '@/components/about-us';
import ProjectsSection from '@/components/projects-section';
import CaseStudies from '@/components/case-studies';
import Testimonials from '@/components/testimonials';
import CountdownSection from '@/components/countdown-section';
import Newsletter from '@/components/newsletter';
import FAQ from '@/components/faq';
import Footer from '@/components/footer';
import { useProjects } from '@/hooks/use-projects';

export default function Home() {
  // Fetched once here and passed down to both CaseStudies and
  // ProjectsSection (instead of each of them subscribing to Firestore on
  // their own) so the homepage opens exactly one listener on the
  // `projects` collection. Two independent listeners on the same query
  // mounting at the same time is what triggered the Firestore SDK's
  // "INTERNAL ASSERTION FAILED ... Fe:-1" crash.
  const { projects } = useProjects();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutUs />
        <Benefits />
        <CaseStudies projects={projects} />
        <ProjectsSection projects={projects} />
        <CountdownSection />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
