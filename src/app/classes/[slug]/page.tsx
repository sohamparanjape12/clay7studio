"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, ArrowRight, Palette, Heart, Target } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const fallbackClasses = [
  {
    slug: "wheel-throwing-basics",
    name: "Wheel Throwing Basics",
    level: "Beginner",
    duration: "8 weeks",
    price_details: "₹1,000 per session (with wheel)",
    description: "Master the fundamentals of pottery wheel throwing in our signature therapeutic environment. Perfect for beginners looking to experience the meditative joy of creating pottery.",
    benefits: "Stress relief, Motor skill development, Creative expression, Mindfulness practice",
    image_url: "/images/wheel-throwing.jpg"
  },
  {
    slug: "hand-building-workshop",
    name: "Hand Building Workshop",
    level: "Beginner",
    duration: "6 weeks",
    price_details: "₹800 per session (without wheel)",
    description: "Explore the ancient art of hand-building pottery using traditional techniques. No wheel required - just your hands, clay, and imagination.",
    benefits: "Therapeutic benefits, Artistic expression, Mindfulness, Hand-eye coordination",
    image_url: "/images/hand-building.jpg"
  },
  {
    slug: "intermediate-pottery",
    name: "Intermediate Pottery",
    level: "Intermediate",
    duration: "10 weeks",
    price_details: "₹1,200 per session",
    description: "Take your pottery skills to the next level with advanced techniques, glazing methods, and complex forms. Build on your foundation knowledge.",
    benefits: "Advanced techniques, Glazing skills, Complex forms, Portfolio development",
    image_url: "/images/intermediate-pottery.jpg"
  },
  {
    slug: "therapeutic-pottery",
    name: "Therapeutic Pottery Sessions",
    level: "Beginner",
    duration: "4 weeks",
    price_details: "₹900 per session",
    description: "Specially designed sessions focusing on pottery as a therapeutic practice. Ideal for stress relief, mindfulness, and emotional well-being.",
    benefits: "Stress reduction, Emotional healing, Mindfulness, Mental wellness",
    image_url: "/images/therapeutic-pottery.jpg"
  },
  {
    slug: "kids-pottery",
    name: "Kids Pottery Classes",
    level: "Beginner",
    duration: "6 weeks",
    price_details: "₹700 per session",
    description: "Fun and engaging pottery classes designed specifically for children. Safe, creative, and educational introduction to ceramics.",
    benefits: "Motor skills, Creativity, Confidence building, Social interaction",
    image_url: "/images/kids-pottery.jpg"
  },
  {
    slug: "industrial-pottery",
    name: "Industrial Level Pottery",
    level: "Advanced",
    duration: "3 months",
    price_details: "Contact for pricing",
    description: "Professional pottery training for bulk production and commercial applications. Learn industrial techniques and business aspects.",
    benefits: "Professional skills, Business opportunities, Advanced techniques, Industry knowledge",
    image_url: "/images/industrial-pottery.jpg"
  }
];

function getLevelColor(level: string) {
  switch (level) {
    case "Beginner": return "bg-green-100 text-green-800 border-green-200";
    case "Intermediate": return "bg-blue-100 text-blue-800 border-blue-200";
    case "Advanced": return "bg-purple-100 text-purple-800 border-purple-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function getClassIcon(name: string) {
  if (name.toLowerCase().includes("therapeutic")) return Heart;
  if (name.toLowerCase().includes("kids")) return Users;
  if (name.toLowerCase().includes("industrial")) return Target;
  return Palette;
}

export default function ClassDetailsPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";
  const [classData, setClassData] = useState<any>(null);

  useEffect(() => {
    async function fetchClass() {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("slug", slug)
        .single();
      if (data) setClassData(data);
      else {
        // fallback to static
        const fallback = fallbackClasses.find((c) => c.slug === slug);
        setClassData(fallback || null);
      }
    }
    if (slug) fetchClass();
  }, [slug]);

  if (!classData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#732b1d] mb-2">Class Not Found</h2>
          <p className="text-gray-600">Sorry, we couldn't find this class.</p>
          <Button asChild className="mt-6 bg-[#732b1d] text-white">
            <Link href="/classes">Back to Classes</Link>
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = getClassIcon(classData.name);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="overflow-hidden h-[70vh] shadow-xl py-0 border-gray-200 bg-white">
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-1/2 w-full aspect-[4/3] md:aspect-auto relative">
              <img
                src={classData.image_url}
                alt={classData.name}
                className="w-full h-[100%] object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={`${getLevelColor(classData.level)} border`}>
                  {classData.level}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                <IconComponent className="w-5 h-5 text-[#732b1d]" />
              </div>
            </div>
            {/* Details */}
            <div className="md:w-1/2 w-full flex flex-col p-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl text-gray-900">{classData.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-base text-gray-600">4.8</span>
                  <span className="text-sm text-gray-400">(Avg. rating)</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex-1 space-y-4">
                    <p className="text-gray-700 text-base">{classData.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{classData.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Small groups</span>
                    </div>
                    </div>
                    <div>
                    <div className="text-sm font-medium text-gray-900 mb-1">Key Benefits:</div>
                    <div className="flex flex-wrap gap-2">
                        {classData.benefits.split(", ").map((benefit: string, idx: number) => (
                        <span key={idx} className="text-xs bg-[#732b1d]/10 text-[#732b1d] px-2 py-1 rounded">
                            {benefit}
                        </span>
                        ))}
                    </div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <div className="text-lg font-bold text-[#732b1d]">
                    {classData.price_details}
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#732b1d] hover:bg-[#732b1d]/90 text-white"
                  >
                    <Link href="/contact">
                      Book Now
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="text-[#732b1d] border-[#732b1d]">
            <Link href="/classes">&larr; Back to All Classes</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
