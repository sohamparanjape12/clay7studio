'use client'
// src/components/sections/Features.tsx
import { motion, Variants } from 'framer-motion';
import { 
  Heart, 
  Users, 
  MapPin, 
  Clock, 
  Award, 
  Palette,
  Target,
  Sparkles 
} from 'lucide-react';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const features = [
  {
    icon: Heart,
    title: "Therapeutic Approach",
    description: "Experience pottery as a form of meditation and stress relief, designed to promote mental wellness."
  },
  {
    icon: Award,
    title: "Expert Instruction",
    description: "Learn from Rashmi Vaidya, JJ School of Art graduate with 20+ years of pottery experience."
  },
  {
    icon: Users,
    title: "All Skill Levels",
    description: "From complete beginners to advanced practitioners, we have classes tailored for everyone."
  },
  {
    icon: MapPin,
    title: "Two Locations",
    description: "Conveniently located studios in Baner and Kothrud, both equipped with modern facilities."
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Multiple time slots available throughout the week to fit your busy lifestyle."
  },
  {
    icon: Palette,
    title: "Creative Expression",
    description: "Explore your artistic side while learning traditional and contemporary pottery techniques."
  },
  {
    icon: Target,
    title: "Small Group Classes",
    description: "Intimate class sizes ensure personalized attention and faster skill development."
  },
  {
    icon: Sparkles,
    title: "Holistic Experience",
    description: "Beyond pottery, enjoy a mindful journey that connects you with your inner creativity."
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white md:px-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Clay Seven?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're more than just a pottery studio – we're a sanctuary for creativity, 
            wellness, and personal growth through the art of clay.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp} className="group flex text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-[#f9f3f2] to-[#f2e7e5] rounded-2xl p-6 mb-4 group-hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#fde9e4] rounded-xl mb-4 group-hover:bg-[#f2e7e5] transition-colors">
                  <feature.icon className="w-6 h-6 text-[#732b1d]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-[#732b1d] to-[#652619] rounded-2xl p-8 text-white border-1 border-gray/50 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">4.8/5</div>
              <div className="text-[#fde9e4]">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">180+</div>
              <div className="text-[#fde9e4]">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">20+</div>
              <div className="text-[#fde9e4]">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2</div>
              <div className="text-[#fde9e4]">Studio Locations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}