// src/app/page.tsx
import { Suspense } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Classes from '@/components/sections/Classes';
import Testimonials from '@/components/sections/Testimonials';
import Features from '@/components/sections/Features';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Classes />
      <Features />
      <Suspense fallback={<div className="py-20 text-center">Loading testimonials...</div>}>
        <Testimonials />
      </Suspense>
      <CTA />
    </main>
  );
}