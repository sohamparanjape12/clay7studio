// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Clay7studio Pune - Pottery Classes & Workshops',
    template: '%s | Clay7studio Pune'
  },
  description: 'Discover the therapeutic art of pottery at Clay7studio Pune. Expert instruction by Rashmi Vaidya with 20+ years experience. Classes for all levels from beginner to industrial. Studios in Baner & Kothrud.',
  keywords: [
    'pottery classes pune',
    'ceramic classes pune',
    'pottery workshop pune',
    'clay modeling pune',
    'pottery classes baner',
    'pottery classes kothrud',
    'rashmi vaidya pottery',
    'therapeutic pottery',
    'pottery classes for beginners',
    'industrial pottery training'
  ],
  authors: [{ name: 'Clay7studio Pune' }],
  creator: 'Clay7studio Pune',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clay7studio.com',
    siteName: 'Clay7studio Pune',
    title: 'Clay7studio Pune - Pottery Classes & Workshops',
    description: 'Discover the therapeutic art of pottery at Clay7studio Pune. Expert instruction by Rashmi Vaidya with 20+ years experience.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clay7studio Pune - Pottery Classes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clay7studio Pune - Pottery Classes & Workshops',
    description: 'Discover the therapeutic art of pottery at Clay7studio Pune. Expert instruction by Rashmi Vaidya with 20+ years experience.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, 'antialiased')}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}