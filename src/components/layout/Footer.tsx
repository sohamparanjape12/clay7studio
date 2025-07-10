// src/components/layout/Footer.tsx
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star } from 'lucide-react'
import Image from 'next/image'
import logo from '@/images/logo.png'

const navigation = {
  classes: [
    { name: 'Wheel Throwing', href: '/classes/wheel-throwing-basics' },
    { name: 'Hand Building', href: '/classes/hand-building-workshop' },
    { name: 'Industrial Level', href: '/classes/industrial-level-pottery' },
    { name: 'Group Workshops', href: '/events' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Founder', href: '/about#founder' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Book a Class', href: '/contact' },
    { name: 'Group Booking', href: '/events' },
  ],
}

const locations = [
  {
    name: 'Erandwane Studio',
    address: 'Joshi Rd, Plot 4/8, SriKrupa Bungalow, Diagonal opposite Lagu Bandhu Jewellers, Shankarrao Kirloskar Marg, off Karve Road, Erandwane, Pune, Maharashtra 411004',
    hours: '09:00 AM - 07:00 PM',
    phone: '+91-XXXXXXXXXX',
  }
]

export default function Footer() {
  return (
    <footer className="md:py-10 bg-gradient-to-br from-[#f9f3f2] to-[#f2e7e5] md:px-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image src={logo} alt="Clay7studio Logo" height={42} />
            </div>
            <p className="text-gray-800 text-sm mb-4">
              Discover the therapeutic art of pottery with expert guidance from Rashmi Vaidya. 
              20+ years of experience in pottery education and ceramic arts.
            </p>
            <div className="flex items-center space-x-1 text-[#e5a194]">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">4.8/5 Rating</span>
              <span className="text-gray-800 text-sm">(180+ reviews)</span>
            </div>
          </div>

          {/* Classes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Classes</h3>
            <ul className="space-y-2">
              {navigation.classes.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-800 hover:text-[#e5a194] transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-800 hover:text-[#e5a194] transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-800 hover:text-[#e5a194] transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Studio Locations */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-6 text-center">Our Studio</h3>
          <div className="grid grid-cols-1 gap-8 md:w-[50%] mx-auto">
            {locations.map((location) => (
              <div key={location.name} className="flex flex-col md:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray/50">
                <h4 className="text-lg font-semibold mb-3 text-[#e5a194]">{location.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800">{location.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-800">{location.hours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-800">{location.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-800 text-sm">
              © 2024 Clay7Studio Pune. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link
                href="/contact"
                className="text-gray-800 hover:text-[#e5a194] transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="text-gray-800 hover:text-[#e5a194] transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}