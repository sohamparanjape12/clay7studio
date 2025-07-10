// src/app/classes/page.tsx
import { Suspense } from 'react';
import ClassesHero from '@/components/sections/ClassesHero';
import ClassesGrid from '@/components/sections/ClassesGrid';
import ClassesFeatures from '@/components/sections/ClassesFeatures';
import ClassesCTA from '@/components/sections/ClassesCTA';

export default function ClassesPage() {
  return (
    <main className="bg-white">
      <ClassesHero />
      <Suspense fallback={<div className="py-20 text-center">Loading classes...</div>}>
        <ClassesGrid />
      </Suspense>
      <ClassesFeatures />
      <ClassesCTA />
    </main>
  );
}