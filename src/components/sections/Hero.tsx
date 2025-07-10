'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import herobg from '@/images/hero-bg.jpg';
import Image from 'next/image';
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
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const scaleIn: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Hero() {
  return (
    <section className="relative flex items-center bg-gradient-to-br from-[#f9f3f2] to-[#f2e7e5] md:px-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#732b1d] rounded-full blur-lg"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#732b1d] rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#732b1d] rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Rating Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">4.8/5 from 180+ reviews</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Discover the 
                <span className="text-[#732b1d]"> Therapeutic </span>
                Art of Pottery
              </h1>
              <p className="text-xl text-gray-600 max-w-xl">
                Join Pune's premier pottery studio where creativity meets mindfulness. 
                Learn from expert instructors in a calming, supportive environment.
              </p>
            </motion.div>

            {/* Key Points */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4">
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold text-[#732b1d]">20+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold text-[#732b1d]">2</div>
                <div className="text-sm text-gray-600">Studio Locations</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold text-[#732b1d]">All</div>
                <div className="text-sm text-gray-600">Skill Levels</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-10 mb-5">
              <Button asChild size="lg" className="bg-[#732b1d] hover:bg-[#652619] text-white">
                <Link href="/classes">
                  Explore Classes
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#732b1d] text-[#732b1d] hover:bg-[#732b1d]/10">
                <Link href="/contact">
                  Book a Session
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <div className="relative flex items-center justify-center">
            <motion.div 
              className="aspect-square w-[20em] h-[25em] md:w-full bg-gradient-to-br from-[#fde9e4] to-[#f2e7e5] rounded-3xl overflow-hidden shadow-2xl"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <Image 
                src={herobg} 
                alt="Pottery class in session at Clay7studio"
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
            
            {/* Floating Cards */}
            <motion.div 
              className="absolute -top-6 -left-1 bg-white rounded-xl p-4 shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="text-sm font-medium text-gray-900">Expert Instruction</div>
              <div className="text-xs text-gray-600">JJ School of Art Graduate</div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -right-1 bg-white rounded-xl p-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="text-sm font-medium text-gray-900">Therapeutic Benefits</div>
              <div className="text-xs text-gray-600">Stress Relief & Mindfulness</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}