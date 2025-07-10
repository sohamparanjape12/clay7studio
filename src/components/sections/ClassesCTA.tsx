'use client';

// src/components/sections/ClassesCTA.tsx
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ClassesCTA() {
  return (
    <section className="py-20 bg-[#732b1d] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Pottery Journey?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join hundreds of students who have discovered the therapeutic joy of pottery. 
            Book your first class today and experience the Clay7studio difference.
          </motion.p>

          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-white/80">Speak with our team to find the perfect class for you</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-white/80">Two convenient locations in Baner and Kothrud</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Book Online</h3>
              <p className="text-white/80">Schedule your first class at your convenience</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#732b1d] hover:bg-white/90">
              <Link href="/contact">
                Book Your First Class
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-[#732b1d] hover:text-[#732b1d]">
              <Link href="/contact">
                Get More Information
              </Link>
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 gap-8 text-center">
              <div>
                <h4 className="text-lg font-semibold mb-4">Erandwane Studio</h4>
                <div className="space-y-2 text-white/80">
                  <p>Joshi Rd, Plot 4/8, SriKrupa Bungalow, Diagonal opposite Lagu Bandhu Jewellers,</p>
                  <p>Shankarrao Kirloskar Marg, off Karve Road, Erandwane, Pune, Maharashtra 411004</p>
                  <p>Hours: 09:00 AM - 07:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}