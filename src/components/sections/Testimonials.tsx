'use client'

// src/components/sections/Testimonials.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { getTestimonials } from '@/lib/supabase';
import { motion, Variants } from 'framer-motion';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

// Fallback testimonials if database is empty or fails to load
const fallbackTestimonials = [
  { id: 1, author_name: "Priya Sharma", rating: 5.0, review_text: "Amazing experience! Rashmi ma'am is incredibly patient and skilled. The therapeutic benefits are real - I feel so relaxed after each class.", source: "Justdial" },
  { id: 2, author_name: "Rahul Patil", rating: 4.5, review_text: "Great studio with a welcoming atmosphere. The pottery classes are well-structured and reasonably priced. Highly recommend!", source: "Google Reviews" },
  { id: 3, author_name: "Meera Joshi", rating: 5.0, review_text: "Fantastic for beginners! Clear instructions, ample time to practice, and such a positive ambiance. My kids loved the birthday party workshop too!", source: "Justdial" },
  { id: 4, author_name: "Anita Desai", rating: 4.8, review_text: "The therapeutic approach really works. I've been attending for 6 months and it's become my weekly stress relief session.", source: "Website" },
  { id: 5, author_name: "Vikram Singh", rating: 5.0, review_text: "Professional setup, excellent guidance, and amazing results. The wheel throwing classes exceeded my expectations.", source: "Google Reviews" },
  { id: 6, author_name: "Sneha Kulkarni", rating: 4.9, review_text: "Love the small group setting and personal attention. Rashmi ma'am makes even complex techniques seem easy to learn.", source: "Justdial" }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data.slice(0, 6));
        }
      } catch (error) {
        // fallback to static
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#f9f3f2] to-[#f2e7e5] md:px-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied students who have discovered the joy and therapeutic 
            benefits of pottery at Clay7Studio.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={fadeInUp} className="flex">
              <Card className="bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col w-full">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <Quote className="w-8 h-8 text-[#a56558] mb-4" />
                    <p className="text-gray-700 mb-4 italic">
                      "{testimonial.review_text}"
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(testimonial.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {testimonial.rating}/5
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.author_name}
                        </div>
                        <div className="text-sm text-gray-600">
                          via {testimonial.source}
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-[#732b1d] to-[#652619] rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.author_name.charAt(0)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">4.8/5</span>
            </div>
            <div className="text-gray-600">
              <div className="font-semibold">Overall Rating</div>
              <div className="text-sm">Based on 180+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}