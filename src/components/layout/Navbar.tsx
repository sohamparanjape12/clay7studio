// src/components/layout/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import logo from '@/images/logo.png'
import Image from 'next/image'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Classes', href: '/classes' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[rgba(255,255,255,0.2)] shadow-sm sticky top-0 z-50" style={{ backdropFilter: 'blur(10px)' }}>
      {/* Top bar with contact info */}
      <div className="bg-amber-50 border-b border-amber-100 hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4 text-amber-800">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">Call us: +91-XXXXXXXXXX</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span className="hidden md:inline">Baner & Kothrud, Pune</span>
              </div>
            </div>
            <div className="text-amber-800">
              <span className="hidden sm:inline">★ 4.8/5 Rating on Justdial</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt={'logo'}
                height={40}
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-[#732b1d] hover:bg-[#7c2d2d] text-white">
              <Link href="/contact">Book a Class</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className={cn(
            'md:hidden p-2',
            mobileMenuOpen ? 'fixed left-0 right-0 animate-fade-up animate-once animate-ease-out animate-normal' : 'hidden'
          )}
        >
          <div className="space-y-1 p-2 bg-[rgba(255,255,255,1)] rounded-sm shadow-sm backdrop-blur-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-800 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Button asChild className="w-full bg-[#732b1d] hover:bg-[#7c2d2d] text-white">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Book a Class
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}