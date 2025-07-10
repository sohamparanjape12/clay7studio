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