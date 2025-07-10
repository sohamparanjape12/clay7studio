// src/types/supabase.ts
// This file contains the generated types from Supabase
// You can generate this by running: supabase gen types typescript --project-id YOUR_PROJECT_ID

export interface Database {
  public: {
    Tables: {
      classes: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Industrial' | null
          duration?: string | null
          price_details?: string | null
          benefits?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Industrial' | null
          duration?: string | null
          price_details?: string | null
          benefits?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          author_name: string
          rating: number
          review_text: string
          source: string | null
          created_at: string
        }
        Insert: {
          id?: string
          author_name: string
          rating: number
          review_text: string
          source?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          author_name?: string
          rating?: number
          review_text?: string
          source?: string | null
          created_at?: string
        }
      }
      inquiries: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          inquiry_type?: 'General' | 'Class Registration' | 'Group Booking' | null
          message: string
          class_interest?: string | null
          event_type?: string | null
          num_participants?: number | null
          preferred_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          inquiry_type?: 'General' | 'Class Registration' | 'Group Booking' | null
          message?: string
          class_interest?: string | null
          event_type?: string | null
          num_participants?: number | null
          preferred_date?: string | null
          created_at?: string
        }
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}