"use client"

// src/components/sections/ClassesHero.tsx
import { Button } from '@/components/ui/button';
import { ArrowDown, Star, Users, Clock } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ClassesHero() {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#732b1d]/5 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#732b1d]/5 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#732b1d]/10 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >

          {/* Main Content */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Pottery Classes for
              <span className="text-[#732b1d]"> Every Journey</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From therapeutic beginner sessions to advanced industrial training, 
              discover the perfect pottery class to match your goals and skill level.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div className="grid grid-cols-3 md:grid-cols-3 gap-8 max-w-2xl mx-auto" variants={fadeInUp}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#732b1d]/10 rounded-2xl mb-4">
                <Users className="w-8 h-8 text-[#732b1d]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">All Levels</div>
              <div className="text-sm text-gray-600">Beginner to Advanced</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#732b1d]/10 rounded-2xl mb-4">
                <Clock className="w-8 h-8 text-[#732b1d]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Flexible</div>
              <div className="text-sm text-gray-600">Multiple Time Slots</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#732b1d]/10 rounded-2xl mb-4">
                <Star className="w-8 h-8 text-[#732b1d]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Expert</div>
              <div className="text-sm text-gray-600">20+ Years Experience</div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
            <Button 
              size="lg" 
              className="bg-[#732b1d] hover:bg-[#732b1d]/90 text-white"
              onClick={() => document.getElementById('classes-grid')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Classes
              <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-[#732b1d] text-[#732b1d] hover:bg-[#732b1d]/5"
            >
              Book a Trial Class
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}