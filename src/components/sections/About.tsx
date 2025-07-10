'use client'

import { Button } from '@/components/ui/button';
import { Award, Heart, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import rashmiVaidya from '@/images/rashmi-vaidya.jpg';

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }
  }
};

export default function About() {
  return (
    <section className="py-20 bg-white md:px-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div className="relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInLeft}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-[#fde9e4] to-[#f2e7e5] rounded-2xl overflow-hidden shadow-xl">
              <Image 
                src={rashmiVaidya}
                alt="Rashmi Vaidya - Founder of Clay7studio"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -z-1 -top-4 -right-4 w-24 h-24 bg-[#732b1d] rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -z-1 -bottom-4 -left-4 w-16 h-16 bg-[#732b1d] rounded-full opacity-20 blur-xl"></div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInRight}
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Meet Your Pottery Guide
              </h2>
              <p className="text-lg text-gray-600">
                Founded by <strong>Rashmi Vaidya</strong>, a distinguished alumna of the prestigious 
                JJ School of Art with over 20 years of experience in pottery and ceramics.
              </p>
              <p className="text-gray-600">
                At Clay7studio, we believe pottery is more than just shaping clay – it's a journey 
                of self-discovery, stress relief, and creative expression. Our therapeutic approach 
                combines traditional techniques with modern wellness principles.
              </p>
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#f9f3f2] rounded-lg p-4 text-center">
                <Award className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">JJ School Graduate</div>
              </div>
              <div className="bg-[#f9f3f2] rounded-lg p-4 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Therapeutic Focus</div>
              </div>
              <div className="bg-[#f9f3f2] rounded-lg p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">All Skill Levels</div>
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-gray-50 rounded-xl p-6">
              <blockquote className="italic text-gray-700 text-lg">
                "Pottery is meditation in motion. Every piece you create is a reflection of your inner 
                journey, and every session brings you closer to mindful living."
              </blockquote>
              <cite className="font-medium mt-2 block">— Rashmi Vaidya, Founder</cite>
            </div>

            <Button asChild size="lg" variant="outline" className="border-[#732b1d] text-[#732b1d] hover:bg-[#732b1d]/10">
              <Link href="/about">
                Learn More About Us
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}