'use client';

// src/components/sections/ClassesFeatures.tsx
import { motion, Variants } from 'framer-motion';
import { 
  UserCheck, 
  Clock, 
  Award, 
  Heart,
  Users,
  Target,
  Palette,
  CheckCircle 
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
    icon: UserCheck,
    title: "Personalized Attention",
    description: "Small class sizes ensure individual guidance and faster skill development."
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Multiple time slots throughout the week to accommodate your busy lifestyle."
  },
  {
    icon: Award,
    title: "Expert Instruction",
    description: "Learn from JJ School of Art graduate with 20+ years of experience."
  },
  {
    icon: Heart,
    title: "Therapeutic Focus",
    description: "Every class incorporates mindfulness and stress-relief techniques."
  },
  {
    icon: Users,
    title: "Supportive Community",
    description: "Join a welcoming community of pottery enthusiasts and creative souls."
  },
  {
    icon: Target,
    title: "Skill Progression",
    description: "Clear learning paths from beginner to advanced pottery techniques."
  },
  {
    icon: Palette,
    title: "Creative Freedom",
    description: "Express your artistic vision while learning foundational skills."
  },
  {
    icon: CheckCircle,
    title: "All Materials Included",
    description: "Clay, tools, glazes, and firing services included in class fees."
  }
];

const classTypes = [
  {
    level: "Beginner",
    title: "Foundation Classes",
    description: "Perfect for complete beginners wanting to explore pottery",
    features: ["Basic wheel throwing", "Hand building techniques", "Glazing basics", "Stress relief focus"],
    color: "bg-green-50 border-green-200"
  },
  {
    level: "Intermediate",
    title: "Skill Development",
    description: "Build on your foundation with advanced techniques",
    features: ["Complex forms", "Advanced glazing", "Surface decoration", "Portfolio building"],
    color: "bg-blue-50 border-blue-200"
  },
  {
    level: "Advanced",
    title: "Professional Training",
    description: "Master-level instruction for serious practitioners",
    features: ["Industrial techniques", "Business aspects", "Quality control", "Production methods"],
    color: "bg-purple-50 border-purple-200"
  }
];

export default function ClassesFeatures() {
  return (
    <section className="py-5 md:py-20 md:px-25 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* What Makes Our Classes Special */}
        <motion.div 
          className="mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Our Classes Special
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              More than just pottery lessons, we offer a holistic learning experience 
              that nurtures both your creative skills and personal well-being.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#732b1d]/10 rounded-2xl mb-4 group-hover:bg-[#732b1d]/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-[#732b1d]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Class Levels Overview */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our structured approach ensures you progress at your own pace while 
              building confidence and skills at every level.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {classTypes.map((type, index) => (
              <motion.div key={index} variants={fadeInUp} className={`${type.color} border-2 rounded-2xl p-8 hover:shadow-lg transition-shadow`}>
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-2xl border border-gray/50 rounded-full mb-4">
                    <span className="text-sm font-semibold text-gray-900">{type.level}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>

                <div className="space-y-3">
                  {type.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#732b1d]" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}