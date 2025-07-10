'use client';

import React from 'react';
import { Star, Award, Users, Clock, MapPin, Phone, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/logo.png';
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

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section className="relative bg-gradient-to-br from-[#f9f3f2] to-[#f2e7e5] py-20 overflow-hidden" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="max-w-6xl mx-auto px-4" variants={fadeInUp}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-[#732b1d]">Clay7Studio</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Where art meets therapy, and creativity flows through your hands. Discover the therapeutic power of pottery in Pune's most welcoming ceramic studio.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800">4.8/5</span>
                <span className="text-gray-600">from 180+ reviews</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 backdrop-blur-lg bg-gradient-to-br from-[#732b1d]/10 to-[#652619]/15 rounded-2xl flex items-center justify-center">
                <Image 
                    src={logo}
                    alt="Clay7Studio Hero Image"
                    className="h-40 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Founder Section */}
      <motion.section className="py-20 bg-white overflow-hidden" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="max-w-6xl mx-auto px-4" variants={fadeInUp}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-full h-96 bg-gradient-to-br from-[#fde9e4] to-[#f2e7e5] rounded-2xl flex items-center justify-center">
                <div className="text-[#732b1d] text-center">
                  <div className="w-32 h-32 bg-[#732b1d]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#732b1d]/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#732b1d]">RV</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Rashmi Vaidya</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Meet Our <span className="text-[#732b1d]">Founder</span>
              </h2>
              <div className="space-y-6">
                <div className="bg-[#732b1d]/5 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-[#732b1d] mb-3">Rashmi Vaidya</h3>
                  <p className="text-gray-700 mb-4">
                    Alumna of the prestigious JJ School of Art, Rashmi brings over 20 years of expertise in ceramic arts and pottery instruction. Her unique approach combines traditional techniques with modern therapeutic practices.
                  </p>
                  <div className="flex items-center gap-2 text-[#732b1d]">
                    <Award className="w-5 h-5" />
                    <span className="font-medium">JJ School of Art Graduate</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[#f9f3f2] rounded-lg">
                    <div className="text-2xl font-bold text-[#732b1d]">20+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-[#f9f3f2] rounded-lg">
                    <div className="text-2xl font-bold text-[#732b1d]">500+</div>
                    <div className="text-sm text-gray-600">Students Taught</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section className="py-20 bg-gradient-to-br from-[#f9f3f2] to-[#f2e7e5] overflow-hidden" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="max-w-6xl mx-auto px-4" variants={fadeInUp}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#732b1d]">Philosophy</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              At Clay7studio, we believe pottery is more than just shaping clay—it's about shaping minds, relieving stress, and creating lasting connections.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#732b1d]/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Sparkle className="w-8 h-8 text-[#732b1d]" />
              </div>
              <h3 className="text-xl font-semibold text-[#732b1d] mb-4">Therapeutic Approach</h3>
              <p className="text-gray-600">
                Our classes focus on the meditative and stress-relieving aspects of pottery, promoting mental wellness through creative expression.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#732b1d]/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="w-8 h-8 text-[#732b1d]" />
              </div>
              <h3 className="text-xl font-semibold text-[#732b1d] mb-4">Inclusive Learning</h3>
              <p className="text-gray-600">
                We welcome students of all ages and skill levels, creating a supportive environment where everyone can discover their artistic potential.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#732b1d]/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Award className="w-8 h-8 text-[#732b1d]" />
              </div>
              <h3 className="text-xl font-semibold text-[#732b1d] mb-4">Quality Instruction</h3>
              <p className="text-gray-600">
                With expert guidance and personalized attention, we ensure every student develops proper techniques and artistic confidence.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* What Makes Us Special */}
      <motion.section className="py-20 bg-white overflow-hidden" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="max-w-6xl mx-auto px-4" variants={fadeInUp}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Makes Us <span className="text-[#732b1d]">Special</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#732b1d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-[#732b1d]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Excellence</h3>
                  <p className="text-gray-600">
                    With a 4.8/5 star rating from over 180 reviews on Justdial, our commitment to quality instruction and student satisfaction speaks for itself.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#732b1d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#732b1d]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Diverse Offerings</h3>
                  <p className="text-gray-600">
                    From beginner wheel throwing to advanced industrial pottery, we offer classes for every skill level and interest, including special group workshops.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#732b1d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#732b1d]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
                  <p className="text-gray-600">
                    With extended hours and multiple time slots, we accommodate busy schedules while maintaining quality instruction standards.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#732b1d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-[#732b1d]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">B2B Services</h3>
                  <p className="text-gray-600">
                    Beyond individual classes, we offer professional crockery production services for businesses and bulk orders.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#732b1d]/5 to-[#fde9e4]/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#732b1d] mb-6">Our Impact</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl">
                  <div className="text-3xl font-bold text-[#732b1d] mb-2">500+</div>
                  <div className="text-gray-600">Students Transformed</div>
                </div>
                <div className="bg-white p-6 rounded-xl">
                  <div className="text-3xl font-bold text-[#732b1d] mb-2">2</div>
                  <div className="text-gray-600">Studio Locations</div>
                </div>
                <div className="bg-white p-6 rounded-xl">
                  <div className="text-3xl font-bold text-[#732b1d] mb-2">20+</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Studio Locations */}
      <motion.section className="py-20 bg-gradient-to-br from-[#f9f3f2] to-[#f2e7e5] overflow-hidden" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="max-w-6xl mx-auto px-4" variants={fadeInUp}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#732b1d]">Studio</span>
            </h2>
            <p className="text-xl text-gray-700">
              Visit us at either of our convenient Pune locations
            </p>
          </div>
          
          <div className="grid md:grid-cols-1 gap-8 md:px-50">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#732b1d] mb-4">Erandwane Studio</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#732b1d] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">
                      Joshi Rd, Plot 4/8, SriKrupa Bungalow, Diagonal opposite Lagu Bandhu Jewellers, Shankarrao Kirloskar Marg, off Karve Road, Erandwane, Pune, Maharashtra 411004
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#732b1d]" />
                  <p className="text-gray-700">09:00 AM - 07:00 PM</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#732b1d]" />
                  <p className="text-gray-700">+91-XXXXXXXXXX</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Call to Action */}
      <motion.section className="py-20 bg-[#732b1d] overflow-hidden" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="max-w-4xl mx-auto px-4 text-center" variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Pottery Journey?
          </h2>
          <p className="text-xl text-[#fde9e4] mb-8">
            Join our welcoming community and discover the therapeutic power of pottery. Whether you're a complete beginner or looking to refine your skills, we have the perfect class for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#732b1d] hover:bg-white/90">
              <Link href="/classes">
                View Classes
              </Link>
            </Button>
            <Button asChild size="lg" variant={'outline'} className="border-white text-[#732b1d] hover:bg-white hover:text-[#732b1d]">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutPage;