'use client';

// src/components/sections/ClassesGrid.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, ArrowRight, Heart, Target, Palette } from 'lucide-react';
import Link from 'next/link';
import { getClasses } from '@/lib/supabase';
import { motion, Variants } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

const fallbackClasses = [
    {
      id: 1,
      name: "Wheel Throwing Basics",
      slug: "wheel-throwing-basics",
      level: "Beginner",
      duration: "8 weeks",
      price_details: "₹1,000 per session (with wheel)",
      description: "Master the fundamentals of pottery wheel throwing in our signature therapeutic environment. Perfect for beginners looking to experience the meditative joy of creating pottery.",
      benefits: "Stress relief, Motor skill development, Creative expression, Mindfulness practice",
      image_url: "/images/wheel-throwing.jpg"
    },
    {
      id: 2,
      name: "Hand Building Workshop",
      slug: "hand-building-workshop",
      level: "Beginner",
      duration: "6 weeks",
      price_details: "₹800 per session (without wheel)",
      description: "Explore the ancient art of hand-building pottery using traditional techniques. No wheel required - just your hands, clay, and imagination.",
      benefits: "Therapeutic benefits, Artistic expression, Mindfulness, Hand-eye coordination",
      image_url: "/images/hand-building.jpg"
    },
    {
      id: 3,
      name: "Intermediate Pottery",
      slug: "intermediate-pottery",
      level: "Intermediate",
      duration: "10 weeks",
      price_details: "₹1,200 per session",
      description: "Take your pottery skills to the next level with advanced techniques, glazing methods, and complex forms. Build on your foundation knowledge.",
      benefits: "Advanced techniques, Glazing skills, Complex forms, Portfolio development",
      image_url: "/images/intermediate-pottery.jpg"
    },
    {
      id: 4,
      name: "Therapeutic Pottery Sessions",
      slug: "therapeutic-pottery",
      level: "Beginner",
      duration: "4 weeks",
      price_details: "₹900 per session",
      description: "Specially designed sessions focusing on pottery as a therapeutic practice. Ideal for stress relief, mindfulness, and emotional well-being.",
      benefits: "Stress reduction, Emotional healing, Mindfulness, Mental wellness",
      image_url: "/images/therapeutic-pottery.jpg"
    },
    {
      id: 5,
      name: "Kids Pottery Classes",
      slug: "kids-pottery",
      level: "Beginner",
      duration: "6 weeks",
      price_details: "₹700 per session",
      description: "Fun and engaging pottery classes designed specifically for children. Safe, creative, and educational introduction to ceramics.",
      benefits: "Motor skills, Creativity, Confidence building, Social interaction",
      image_url: "/images/kids-pottery.jpg"
    },
    {
      id: 6,
      name: "Industrial Level Pottery",
      slug: "industrial-pottery",
      level: "Advanced",
      duration: "3 months",
      price_details: "Contact for pricing",
      description: "Professional pottery training for bulk production and commercial applications. Learn industrial techniques and business aspects.",
      benefits: "Professional skills, Business opportunities, Advanced techniques, Industry knowledge",
      image_url: "/images/industrial-pottery.jpg"
    }
  ];

export default function ClassesGrid() {
  const [displayClasses, setDisplayClasses] = useState(fallbackClasses);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const fetchedClasses = await getClasses();
        if (fetchedClasses && fetchedClasses.length > 0) {
          setDisplayClasses(fetchedClasses);
        }
      } catch {
        // fallback to static
      }
    };
    fetchClasses();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Advanced': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClassIcon = (name: string) => {
    if (name.toLowerCase().includes('therapeutic')) return Heart;
    if (name.toLowerCase().includes('kids')) return Users;
    if (name.toLowerCase().includes('industrial')) return Target;
    return Palette;
  };

  return (
    <section id="classes-grid" className="py-5 md:py-15 md:px-25 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Class
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each class is carefully designed to provide both technical skill development 
            and therapeutic benefits in a supportive environment.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mx-auto"
        >
          <CarouselContent className="gap-2 py-5">
            {displayClasses.map((classItem) => {
              const IconComponent = getClassIcon(classItem.name);
              return (
                <CarouselItem
                  key={classItem.id}
                  className="md:basis-1/3 lg:basis-1/3"
                >
                  <motion.div variants={fadeInUp} className="flex h-full">
                    <Card className="overflow-hidden py-0 pb-5 flex flex-col gap-0 hover:shadow-xl transition-all duration-300 bg-white border-gray-200 w-full h-full">
                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden relative mb-5">
                        <img 
                          src={classItem.image_url} 
                          alt={classItem.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={`${getLevelColor(classItem.level)} border`}>
                            {classItem.level}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                          <IconComponent className="w-5 h-5 text-[#732b1d]" />
                        </div>
                      </div>
                      
                      <CardHeader className="pb-0">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl text-gray-900 leading-tight">
                            {classItem.name}
                          </CardTitle>
                          <div className="flex items-center gap-1 ml-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">4.8</span>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 flex flex-col flex-1">
                        <div className='flex-1 space-y-4'>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {classItem.description}
                          </p>
                          
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
                            <div className="text-sm font-medium text-gray-900">Key Benefits:</div>
                            <div className="flex flex-wrap gap-2">
                              {classItem.benefits.split(', ').slice(0, 3).map((benefit, index) => (
                                <span key={index} className="text-xs bg-[#732b1d]/10 text-[#732b1d] px-2 py-1 rounded">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-lg font-bold text-[#732b1d]">
                            {classItem.price_details}
                          </div>
                          <Button 
                            asChild 
                            size="sm" 
                            className="bg-[#732b1d] hover:bg-[#732b1d]/90 text-white"
                          >
                            <Link href={`/classes/${classItem.slug}`}>
                              Learn More
                              <ArrowRight className="ml-1 w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}