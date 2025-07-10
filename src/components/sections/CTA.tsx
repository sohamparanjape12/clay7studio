'use client';

// src/components/sections/CTA.tsx
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function CTA() {
  return (
    <motion.section
      className="py-20 bg-gradient-to-r from-[#732b1d] to-[#652619] md:px-20 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center text-white mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Pottery Journey?
          </h2>
          <p className="text-xl text-[#fde9e4] max-w-2xl mx-auto">
            Join our community of creative souls and experience the therapeutic benefits 
            of pottery in a supportive, expert-guided environment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - CTA Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Take the First Step
              </h3>
              <p className="text-[#fde9e4]">
                Whether you're looking for stress relief, creative expression, or a new hobby, 
                our pottery classes offer something special for everyone.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#fde9e4]">
                <MapPin className="w-5 h-5" />
                <span>Two convenient locations in Baner & Kothrud</span>
              </div>
              <div className="flex items-center gap-3 text-[#fde9e4]">
                <Clock className="w-5 h-5" />
                <span>Flexible scheduling to fit your lifestyle</span>
              </div>
              <div className="flex items-center gap-3 text-[#fde9e4]">
                <Phone className="w-5 h-5" />
                <span>Expert guidance from day one</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-[#732b1d] hover:bg-white/90">
                <Link href="/contact">
                  Book Your First Class
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-[#732b1d] hover:bg-white hover:text-[#732b1d]">
                <Link href="/classes">
                  View All Classes
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Contact Info Cards */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Erandwane Studio */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-4">Erandwane Studio</h4>
              <div className="space-y-3 text-[#fde9e4]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Joshi Rd, Plot 4/8, SriKrupa Bungalow, Diagonal opposite Lagu Bandhu Jewellers,</p>
                    <p className="text-sm">Shankarrao Kirloskar Marg, off Karve Road, Erandwane, Pune, Maharashtra 411004</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">08:30 AM - 18:30 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div className="mt-16 text-center" variants={itemVariants}>
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
            <div className="text-white">
              <div className="font-semibold">Ready to get started?</div>
              <div className="text-sm text-[#fde9e4]">Call us today for a free consultation</div>
            </div>
            <Button asChild size="lg" className="bg-white text-[#732b1d] hover:bg-white/90">
              <Link href="/contact">
                Contact Us Now
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}