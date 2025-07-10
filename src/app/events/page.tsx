'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { CalendarIcon, Users, Clock, MapPin, Star, Heart, Gift, PartyPopper } from 'lucide-react'
import { format } from 'date-fns'
import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { createInquiry } from "@/lib/supabase"

interface EventType {
  id: string
  name: string
  description: string
  duration: string
  minParticipants: number
  maxParticipants: number
  pricePerPerson: number
  includes: string[]
  icon: React.ReactNode
  category: 'birthday' | 'corporate' | 'therapeutic' | 'special'
}

const eventTypes: EventType[] = [
  {
    id: 'birthday-party',
    name: 'Birthday Party Workshop',
    description: 'Make your special day memorable with a hands-on pottery experience! Perfect for kids and adults.',
    duration: '2-3 hours',
    minParticipants: 5,
    maxParticipants: 15,
    pricePerPerson: 800,
    includes: ['Clay and tools', 'Expert instruction', 'Firing service', 'Birthday decorations', 'Refreshments'],
    icon: <PartyPopper className="h-4 w-4" />,
    category: 'birthday'
  },
  {
    id: 'corporate-team',
    name: 'Corporate Team Building',
    description: 'Strengthen team bonds through collaborative pottery creation. Ideal for stress relief and creativity.',
    duration: '3-4 hours',
    minParticipants: 10,
    maxParticipants: 30,
    pricePerPerson: 1200,
    includes: ['All materials', 'Professional guidance', 'Team activities', 'Certificate', 'Light refreshments'],
    icon: <Users className="h-4 w-4" />,
    category: 'corporate'
  },
  {
    id: 'therapeutic-session',
    name: 'Therapeutic Pottery Session',
    description: 'Experience the healing power of clay. Perfect for stress relief, mindfulness, and emotional wellbeing.',
    duration: '2 hours',
    minParticipants: 3,
    maxParticipants: 8,
    pricePerPerson: 1000,
    includes: ['Guided meditation', 'Clay therapy', 'Personal consultation', 'Take-home piece'],
    icon: <Heart className="h-4 w-4" />,
    category: 'therapeutic'
  },
  {
    id: 'mothers-day',
    name: 'Mother\'s Day Special',
    description: 'Create beautiful memories with mom! A special workshop designed for mothers and children.',
    duration: '2.5 hours',
    minParticipants: 4,
    maxParticipants: 12,
    pricePerPerson: 900,
    includes: ['Special clay projects', 'Gift wrapping', 'Photo session', 'Complimentary tea/coffee'],
    icon: <Gift className="h-4 w-4" />,
    category: 'special'
  }
]

const containerVariants : Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants : Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiry_type: "Group Booking",
        message: formData.message,
        event_type: selectedEvent?.id,
        num_participants: Number(formData.participants),
        preferred_date: selectedDate ? selectedDate.toISOString().split("T")[0] : undefined,
        class_interest: undefined,
      });

      toast.success("Booking Request Submitted!", {
        description: "Thank you for your inquiry. We'll contact you soon to confirm the details.",
        duration: 5000,
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '', participants: '', message: '' });
      setSelectedEvent(null);
      setSelectedDate(undefined);
    } catch (error) {
      toast.error("Failed to submit booking request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'birthday':
        return 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800'
      case 'corporate':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800'
      case 'therapeutic':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
      case 'special':
        return 'bg-gradient-to-r from-[#fde9e4] to-[#f2e7e5] text-[#732b1d]'
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#fefefe]">
      <Toaster richColors />
      {/* Hero Section */}
      <motion.section
        className="py-20 pb-10 md:pb-20 md:pt-35 md:pb-10 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Special Events & Workshops
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Create unforgettable memories with our customized pottery workshops. 
            Perfect for birthdays, corporate events, therapeutic sessions, and special occasions.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="outline" className="px-4 py-2 bg-white/50 border-[#732b1d]/20 text-[#732b1d]">
              <Users className="h-4 w-4 mr-2" />
              Group Events
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-white/50 border-[#732b1d]/20 text-[#732b1d]">
              <Clock className="h-4 w-4 mr-2" />
              2-4 Hours
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-white/50 border-[#732b1d]/20 text-[#732b1d]">
              <MapPin className="h-4 w-4 mr-2" />
              Both Studios
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-white/50 border-[#732b1d]/20 text-[#732b1d]">
              <Star className="h-4 w-4 mr-2" />
              All Skill Levels
            </Badge>
          </motion.div>
        </div>
      </motion.section>

      {/* Event Types Grid */}
      <section className="py-10 md:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-900 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Event Type
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {eventTypes.map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                <Card className="hover:shadow-lg flex flex-col gap-2 transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm h-full">
                  <CardHeader className="pb-0">
                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium mb-1 ${getCategoryColor(event.category)}`}>
                      {event.icon}
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </div>
                    <CardTitle className="text-xl text-gray-900">{event.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex flex-col flex-1">
                    <div className='flex-1 space-y-4'>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{event.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{event.minParticipants}-{event.maxParticipants} participants</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                            ₹{event.pricePerPerson}
                        </span>
                        <span className="text-gray-500">per person</span>
                      </div>
                      <Button
                        className="w-full bg-[#732b1d] hover:bg-[#652619] text-white"
                        onClick={() => {
                          setSelectedEvent(event)
                          setIsBookDialogOpen(true)
                        }}
                      >
                        Book This Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Single Dialog for booking details */}
      <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
        <DialogContent>
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedEvent.icon}
                  {selectedEvent.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What's Included:</h4>
                  <ul className="text-sm space-y-1">
                    {selectedEvent.includes.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#732b1d] rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className="w-full bg-[#732b1d] hover:bg-[#652619] text-white"
                  onClick={() => {
                    const bookingForm = document.getElementById('booking-form')
                    if (bookingForm) {
                      bookingForm.scrollIntoView({ behavior: 'smooth' })
                    }
                    setIsBookDialogOpen(false)
                  }}
                >
                  Proceed to Book
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Form */}
      <section id="booking-form" className="py-10 md:py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900">
                Book Your Event
              </CardTitle>
              <p className="text-center text-gray-600">
                Fill out the form below and we'll contact you within 24 hours to confirm your booking.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="participants">Number of Participants *</Label>
                    <Input
                      id="participants"
                      type="number"
                      required
                      min="1"
                      value={formData.participants}
                      onChange={(e) => handleInputChange('participants', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label>Event Type *</Label>
                  <Select value={selectedEvent?.id || ''} onValueChange={(value) => {
                    const event = eventTypes.find(e => e.id === value);
                    setSelectedEvent(event || null);
                    if (event) {
                      setIsBookDialogOpen(true);
                    }
                  }}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select an event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          <div className="flex items-center gap-2">
                            {event.icon}
                            {event.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Preferred Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full mt-2 justify-start text-left font-normal ${
                          !selectedDate && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="message">Special Requirements or Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about any special requirements, dietary restrictions, or additional details..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#732b1d] hover:bg-[#652619] text-white py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            className="text-2xl font-bold text-gray-900 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Clay7studio for Your Event?
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[#732b1d] to-[#652619] rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Expert Guidance</h4>
              <p className="text-gray-600 text-sm">
                Led by Rashmi Vaidya with 20+ years of experience and JJ School of Art background
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[#732b1d] to-[#652619] rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Convenient Locations</h4>
              <p className="text-gray-600 text-sm">
                Two well-equipped studios in Baner and Kothrud with ample parking
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[#732b1d] to-[#652619] rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Proven Excellence</h4>
              <p className="text-gray-600 text-sm">
                4.8/5 star rating from 180+ reviews on Justdial
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}