// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as +91-XXXXX-XXXXX
  if (cleaned.length === 10) {
    return `+91-${cleaned.slice(0, 5)}-${cleaned.slice(5)}`
  }
  
  return phone
}

// Format price display
export function formatPrice(price: string | null): string {
  if (!price) return 'Contact for pricing'
  return price
}

// Format date for display
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Generate class level badge color
export function getClassLevelColor(level: string | null): string {
  switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-800'
    case 'Intermediate':
      return 'bg-blue-100 text-blue-800'
    case 'Advanced':
      return 'bg-purple-100 text-purple-800'
    case 'Industrial':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Generate star rating display
export function generateStarRating(rating: number): string {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  
  let stars = '★'.repeat(fullStars)
  if (hasHalfStar) stars += '☆'
  
  return stars
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (Indian format)
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/
  const cleaned = phone.replace(/\D/g, '')
  return phoneRegex.test(cleaned)
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Generate slug from string
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Parse benefits string to array
export function parseBenefits(benefits: string | null): string[] {
  if (!benefits) return []
  return benefits.split(',').map(benefit => benefit.trim())
}

// Studio locations data
export const STUDIO_LOCATIONS = [
  {
    name: 'Baner Studio',
    address: 'Row House No 6 Samruddhi Survy No. 136/2/2 Yogita Park, Balewadi Phata, Pune, Maharashtra, Near Paw Factor, Baner-411045',
    hours: '08:30 AM - 18:30 PM',
    phone: '+91-XXXXXXXXXX',
    mapUrl: 'https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3783.0!2d73.8!3d18.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzAwLjAiTiA3M8KwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin',
  },
  {
    name: 'Kothrud Studio',
    address: 'Shivtirth Nagar Paud Road Kothrud 45 Sr. No. 120, next to Truegrocery, opposite of Karhad Urban Bank',
    hours: '10:00 AM - 6:00 PM',
    phone: '+91-XXXXXXXXXX',
    mapUrl: 'https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3783.0!2d73.8!3d18.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzAwLjAiTiA3M8KwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin',
  },
]

// FAQ data
export const FAQ_DATA = [
  {
    question: "What age group can join pottery classes?",
    answer: "Our pottery classes are suitable for all ages starting from 4 years old. We offer specialized programs for children, teens, and adults with age-appropriate techniques and guidance.",
    category: "General"
  },
  {
    question: "Do I need to bring my own materials?",
    answer: "No, we provide all necessary materials including clay, tools, aprons, and firing services. You just need to come with comfortable clothes and enthusiasm to learn!",
    category: "Materials"
  },
  {
    question: "What should I wear to pottery classes?",
    answer: "Wear comfortable, old clothes that you don't mind getting dirty. Closed-toe shoes are recommended for safety. We provide aprons, but clay can be messy!",
    category: "Preparation"
  },
  {
    question: "How long does it take to complete a pottery piece?",
    answer: "A typical pottery piece takes 2-3 weeks to complete, including drying time, bisque firing, glazing, and final firing. The actual hands-on time varies by project complexity.",
    category: "Process"
  },
  {
    question: "Can I book a private group workshop?",
    answer: "Yes! We offer private group workshops for birthdays, anniversaries, team building, and special events. We can accommodate groups of 20-30 people with advance booking.",
    category: "Group Events"
  },
  {
    question: "What is the cancellation policy?",
    answer: "We require 24-hour notice for class cancellations. For group bookings, please provide at least 48-hour notice. Contact us directly for specific cancellation terms.",
    category: "Policy"
  }
]