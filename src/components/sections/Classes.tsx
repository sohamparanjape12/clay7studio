"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import wheelthrowingImage from '@/images/wheel-throwing.jpg';
import handbuildingImage from '@/images/hand-building.jpg';
import industrialImage from '@/images/industrial-pottery.jpg';
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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


const classes = [
  {
    id: 1,
    name: "Wheel Throwing Basics",
    level: "Beginner",
    duration: "8 weeks",
    price: "₹1,000 per session",
    description: "Learn the fundamentals of pottery wheel throwing in a supportive environment.",
    benefits: ["Stress relief", "Motor skill development", "Creative expression"],
    image: wheelthrowingImage,
    slug: "wheel-throwing-basics"
  },
  {
    id: 2,
    name: "Hand Building Workshop",
    level: "Beginner",
    duration: "6 weeks",
    price: "₹800 per session",
    description: "Explore pottery without the wheel using traditional hand-building techniques.",
    benefits: ["Therapeutic benefits", "Artistic expression", "Mindfulness"],
    image: handbuildingImage,
    slug: "hand-building-workshop"
  },
  {
    id: 3,
    name: "Industrial Level Pottery",
    level: "Advanced",
    duration: "3 months",
    price: "Contact for pricing",
    description: "Professional pottery training for bulk production and commercial applications.",
    benefits: ["Professional skills", "Business opportunities", "Advanced techniques"],
    image: industrialImage,
    slug: "industrial-level-pottery"
  }
];

export default function Classes() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#f9f3f2] to-[#f2e7e5] md:px-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Pottery Classes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From beginner-friendly sessions to advanced industrial training, 
            find the perfect class for your pottery journey.
          </p>
        </div>

        {/* Classes Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {classes.map((classItem) => (
            <motion.div variants={fadeInUp} className="flex">
            <Card key={classItem.id} className="flex overflow-hidden py-0 pb-5 hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                width={400}
                height={300} 
                  src={classItem.image} 
                  alt={classItem.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader className="pb-0 flex-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-[#fde9e4] text-[#732b1d] text-sm rounded-full">
                    {classItem.level}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900">{classItem.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="flex flex-col flex-1">
                <div className='flex-1 space-y-4 mb-4'>
                    <p className="text-gray-600 text-sm">{classItem.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{classItem.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Small groups</span>
                    </div>
                    </div>
                    
                    <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">Benefits:</div>
                    <div className="flex flex-wrap gap-2">
                        {classItem.benefits.map((benefit, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {benefit}
                        </span>
                        ))}
                    </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-lg font-bold text-[#732b1d]">{classItem.price}</div>
                  <Button asChild size="sm" className="bg-[#732b1d] hover:bg-[#652619] text-white">
                    <Link href={`/classes/${classItem.slug}`}>
                      Learn More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-[#732b1d] hover:bg-[#652619] text-white">
            <Link href="/classes">
              View All Classes
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}