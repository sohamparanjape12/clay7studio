// src/types/index.ts

// Database types matching our Supabase schema
export interface Class {
  id: string
  name: string
  slug: string
  description: string | null
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Industrial' | null
  duration: string | null
  price_details: string | null
  benefits: string | null
  image_url: string | null
  created_at: string
}

export interface Testimonial {
  id: string
  author_name: string
  rating: number
  review_text: string
  source: string | null
  created_at: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  inquiry_type: 'General' | 'Class Registration' | 'Group Booking' | null
  message: string
  class_interest: string | null
  event_type: string | null
  num_participants: number | null
  preferred_date: string | null
  created_at: string
}

// Form types for user input
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ClassInquiryFormData {
  name: string
  email: string
  phone?: string
  message: string
  class_interest: string
}

export interface GroupBookingFormData {
  name: string
  email: string
  phone?: string
  message: string
  event_type: string
  num_participants: number
  preferred_date: string
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// Component prop types
export interface ClassCardProps {
  class: Class
  featured?: boolean
}

export interface TestimonialCardProps {
  testimonial: Testimonial
  compact?: boolean
}

export interface StudioLocation {
  name: string
  address: string
  hours: string
  phone: string
  mapUrl: string
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  description?: string
}

// Gallery types
export interface GalleryImage {
  id: string
  url: string
  alt: string
  category: 'student-work' | 'instructor-work' | 'commercial-projects' | 'studio'
  title?: string
  description?: string
}

// FAQ types
export interface FAQItem {
  question: string
  answer: string
  category?: string
}

// Supabase database type (for type-safe queries)
export interface Database {
  public: {
    Tables: {
      classes: {
        Row: Class
        Insert: Omit<Class, 'id' | 'created_at'>
        Update: Partial<Omit<Class, 'id' | 'created_at'>>
      }
      testimonials: {
        Row: Testimonial
        Insert: Omit<Testimonial, 'id' | 'created_at'>
        Update: Partial<Omit<Testimonial, 'id' | 'created_at'>>
      }
      inquiries: {
        Row: Inquiry
        Insert: Omit<Inquiry, 'id' | 'created_at'>
        Update: Partial<Omit<Inquiry, 'id' | 'created_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}