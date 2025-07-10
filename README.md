# Clay7studio Pune - Website Prototype

A modern, responsive website prototype for Clay7studio, a highly-regarded pottery class provider in Pune, Maharashtra, India. This prototype demonstrates the potential of a professional online presence for showcasing their therapeutic pottery classes, expert instruction, and unique offerings.

## Project Overview

Clay7studio is distinguished by:
- **Expert Instruction**: Founded by Rashmi Vaidya, alumna of JJ School of Art with 20 years of experience
- **Therapeutic Approach**: Unique focus on pottery as a stress-relieving and therapeutic activity
- **Proven Track Record**: 4.8/5-star rating on Justdial from 180+ reviews
- **Diverse Offerings**: Classes for all levels, group workshops, and B2B crockery production
- **Multiple Locations**: Studios in Baner and Kothrud, Pune

## Technologies Used

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Backend**: Supabase (Database, API)
- **Deployment**: Vercel-ready
- **Language**: TypeScript

## Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm
- A Supabase account (for backend services)

## Setup Instructions

### 1. Initialize the Project

```bash
npx create-next-app@latest clay7studio-prototype --ts --tailwind --app --src-dir --import-alias "@/*"
cd clay7studio-prototype
```

### 2. Install and Configure Shadcn/ui

Initialize Shadcn/ui in your project:

```bash
npx shadcn-ui@latest init
```

When prompted, choose:
- **Style**: Default
- **Base color**: Slate
- **CSS variables**: Yes

Install required Shadcn/ui components:

```bash
npx shadcn-ui@latest add button input form dialog accordion calendar carousel card textarea select
```

### 3. Supabase Setup

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully set up
3. Go to **Settings → API** to get your project URL and anon key

#### Create Database Tables

Run the following SQL commands in your Supabase SQL editor:

```sql
-- Classes table
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Industrial')),
    duration TEXT,
    price_details TEXT,
    benefits TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Testimonials table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    rating NUMERIC(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    source TEXT DEFAULT 'Website',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inquiries table
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    inquiry_type TEXT CHECK (inquiry_type IN ('General', 'Class Registration', 'Group Booking')),
    message TEXT NOT NULL,
    class_interest TEXT,
    event_type TEXT,
    num_participants INTEGER,
    preferred_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### Enable Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on classes" ON classes FOR SELECT USING (true);
CREATE POLICY "Allow public read access on testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public insert on inquiries" ON inquiries FOR INSERT WITH CHECK (true);
```

#### Sample Data

Insert some sample data to get started:

```sql
-- Sample classes
INSERT INTO classes (name, slug, description, level, duration, price_details, benefits, image_url) VALUES
('Wheel Throwing Basics', 'wheel-throwing-basics', 'Learn the fundamentals of pottery wheel throwing', 'Beginner', '8 weeks', 'Rs 1000 per session (with wheel)', 'Stress relief, Motor skill development, Creative expression', '/images/wheel-throwing.jpg'),
('Hand Building Workshop', 'hand-building-workshop', 'Explore pottery without the wheel using traditional techniques', 'Beginner', '6 weeks', 'Rs 800 per session (without wheel)', 'Therapeutic benefits, Artistic expression, Mindfulness', '/images/hand-building.jpg'),
('Industrial Level Pottery', 'industrial-level-pottery', 'Professional pottery for bulk production and commercial use', 'Advanced', '3 months full-time', 'Contact for pricing', 'Professional skill development, Business opportunities, Advanced techniques', '/images/industrial-pottery.jpg');

-- Sample testimonials
INSERT INTO testimonials (author_name, rating, review_text, source) VALUES
('Priya Sharma', 5.0, 'Amazing experience! Rashmi ma''am is incredibly patient and skilled. The therapeutic benefits are real - I feel so relaxed after each class.', 'Justdial'),
('Rahul Patil', 4.5, 'Great studio with a welcoming atmosphere. The pottery classes are well-structured and reasonably priced. Highly recommend!', 'Google Reviews'),
('Meera Joshi', 5.0, 'Fantastic for beginners! Clear instructions, ample time to practice, and such a positive ambiance. My kids loved the birthday party workshop too!', 'Justdial');
```

### 4. Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Add Placeholder Images

Create the following directories and add placeholder images:

```
public/
├── images/
│   ├── hero-bg.jpg
│   ├── pottery-class-1.jpg
│   ├── pottery-class-2.jpg
│   ├── rashmi-vaidya.jpg
│   ├── studio-baner.jpg
│   ├── studio-kothrud.jpg
│   ├── wheel-throwing.jpg
│   ├── hand-building.jpg
│   └── industrial-pottery.jpg
```

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Build for Production

```bash
npm run build
npm start
```

## Key Features

### 🎨 **Artistic & Therapeutic Design**
- Earthy color palette with natural textures
- Calming, uncluttered layouts
- High-quality imagery showcasing pottery work

### 📱 **Fully Responsive**
- Mobile-first design approach
- Seamless experience across all devices
- Optimized for touch interactions

### 🎯 **Core Functionality**
- **Home Page**: Hero section with key offerings showcase
- **About Us**: Founder's profile and studio philosophy
- **Classes**: Detailed class information with pricing
- **Events**: Group booking system for workshops
- **Gallery**: Portfolio of student and instructor work
- **Testimonials**: Customer reviews and ratings
- **Contact**: Multiple studio locations with maps

### 🔧 **Technical Excellence**
- Next.js App Router for optimal performance
- Supabase integration for dynamic content
- SEO-optimized with proper meta tags
- Accessible design with ARIA attributes
- Form handling with validation

## Project Structure

```
clay7studio-prototype/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── classes/
│   │   ├── contact/
│   │   ├── events/
│   │   ├── faq/
│   │   ├── gallery/
│   │   ├── testimonials/
│   │   └── api/
│   ├── components/
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── layout/       # Navigation, Footer
│   │   └── sections/     # Page sections
│   ├── lib/
│   │   ├── supabase.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── public/
│   └── images/
└── ...
```

## Studio Information

### Baner Studio
- **Address**: Row House No 6 Samruddhi Survy No. 136/2/2 Yogita Park, Balewadi Phata, Pune, Maharashtra, Near Paw Factor, Baner-411045
- **Hours**: 08:30 AM - 18:30 PM
- **Phone**: +91-XXXXXXXXXX

### Kothrud Studio
- **Address**: Shivtirth Nagar Paud Road Kothrud 45 Sr. No. 120, next to Truegrocery, opposite of Karhad Urban Bank
- **Hours**: 10:00 AM - 6:00 PM
- **Phone**: +91-XXXXXXXXXX

## Future Enhancements

- **User Authentication**: Student profiles and class history
- **Payment Integration**: Online payment for classes and workshops
- **Booking System**: Real-time class scheduling and availability
- **Admin Dashboard**: Content management and inquiry handling
- **Blog Section**: Pottery tips, techniques, and studio updates
- **E-commerce**: Selling pottery supplies and finished pieces
- **Mobile App**: Native app for better user experience

## Contributing

This is a prototype project. For production deployment, additional considerations include:

- Security audits and vulnerability testing
- Performance optimization and caching strategies
- Advanced SEO implementation
- Analytics and user tracking
- Error monitoring and logging
- Backup and disaster recovery plans

## License

This project is created as a prototype for Clay7studio Pune. All rights reserved.

---

**Built with ❤️ for Clay7studio Pune**