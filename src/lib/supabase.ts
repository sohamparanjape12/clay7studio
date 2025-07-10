// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper functions for common database operations
export const getClasses = async () => {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('created_at', { ascending: true })
  
  if (error) {
    console.error('Error fetching classes:', error)
    throw error
  }
  
  return data
}

export const getClassBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching class:', error)
    throw error
  }
  
  return data
}

export const getTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching testimonials:', error)
    throw error
  }
  
  return data
}

export const createInquiry = async (inquiry: {
  name: string
  email: string
  phone?: string
  inquiry_type: 'General' | 'Class Registration' | 'Group Booking'
  message: string
  class_interest?: string
  event_type?: string
  num_participants?: number
  preferred_date?: string
}) => {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiry])
    .select()
  
  if (error) {
    console.error('Error creating inquiry:', error)
    throw error
  }
  
  return data[0]
}

export const createTestimonial = async (testimonial: {
  author_name: string;
  rating: number;
  review_text: string;
  source: string;
}) => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select();
  if (error) throw error;
  return data?.[0];
};

export const updateTestimonial = async (id: string, testimonial: {
  author_name: string;
  rating: number;
  review_text: string;
  source: string;
}) => {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data?.[0];
};

export const deleteTestimonial = async (id: string) => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const createClass = async (classObj: {
  name: string;
  slug: string;
  description: string;
  level: string;
  duration: string;
  price_details: string;
  benefits: string;
  image_url: string;
}) => {
  const { data, error } = await supabase
    .from('classes')
    .insert([classObj])
    .select();
  if (error) throw error;
  return data?.[0];
};

export const updateClass = async (id: string, classObj: {
  name: string;
  slug: string;
  description: string;
  level: string;
  duration: string;
  price_details: string;
  benefits: string;
  image_url: string;
}) => {
  const { data, error } = await supabase
    .from('classes')
    .update(classObj)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data?.[0];
};

export const deleteClass = async (id: string) => {
  const { error } = await supabase
    .from('classes')
    .delete()
    .eq('id', id);
  if (error) throw error;
};