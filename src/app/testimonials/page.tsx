// src/app/testimonials/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { getTestimonials } from "@/lib/supabase";

const fallbackTestimonials = [
	{
		role: "Beginner Potter",
		name: "Priya Sharma",
		rating: 5,
		review:
			"Amazing experience! Rashmi ma'am is incredibly patient and skilled. The therapeutic benefits are real – I feel so relaxed after each class.",
		source: "Justdial",
	},
	{
		role: "Hobbyist",
		name: "Rahul Patil",
		rating: 4.5,
		review:
			"Great studio with a welcoming atmosphere. The pottery classes are well-structured and reasonably priced. Highly recommend!",
		source: "Google Reviews",
	},
	{
		role: "Parent",
		name: "Meera Joshi",
		rating: 5,
		review:
			"Fantastic for beginners! Clear instructions, ample time to practice, and such a positive ambiance. My kids loved the birthday party workshop too!",
		source: "Justdial",
	},
	{
		role: "Regular Student",
		name: "Anita Desai",
		rating: 4.8,
		review:
			"The therapeutic approach really works. I've been attending for 6 months and it's become my weekly stress relief session. The community is wonderful.",
		source: "Website",
	},
	{
		role: "Advanced Student",
		name: "Vikram Singh",
		rating: 5,
		review:
			"Professional setup, excellent guidance, and amazing results. The wheel throwing classes exceeded my expectations. Rashmi ma'am's expertise is evident.",
		source: "Google Reviews",
	},
	{
		role: "Weekend Workshop Attendee",
		name: "Sneha Kulkarni",
		rating: 4.9,
		review:
			"Love the small group setting and personal attention. Rashmi ma'am makes even complex techniques seem easy to learn. A perfect weekend activity!",
		source: "Justdial",
	},
];

const getInitials = (name: string) =>
	name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();

export default function TestimonialsPage() {
	const [testimonials, setTestimonials] = useState(fallbackTestimonials);

	useEffect(() => {
		(async () => {
			try {
				const data = await getTestimonials();
				if (data && data.length > 0) {
					setTestimonials(
						data.map((t: any) => ({
							role: t.role || "",
							name: t.author_name || t.name || "",
							rating: t.rating,
							review: t.review_text || t.review,
							source: t.source,
						}))
					);
				}
			} catch {
				// fallback to static
			}
		})();
	}, []);

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.12,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 24 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="min-h-screen bg-gray-50"
		>
			<div className="container mx-auto px-4 py-16 sm:py-24">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="max-w-3xl mx-auto text-center mb-16"
				>
					<h1 className="text-4xl md:text-5xl font-bold text-[#732b1d] mb-4 tracking-tight">
						What Our Students Say
					</h1>
					<p className="text-lg text-gray-600 leading-relaxed">
						Real stories from our students — about creativity, calm, and community
						at Clay7studio.
					</p>
					<div className="mt-8 inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-lg border">
						<div className="flex items-center gap-1">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className="w-5 h-5 fill-yellow-400 text-yellow-400"
								/>
							))}
						</div>
						<span className="font-semibold text-gray-800">
							4.8/5 Overall Rating
						</span>
					</div>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 md:px-25"
				>
					{testimonials.map((t, i) => (
						<motion.div
							key={i}
							variants={item}
							whileHover={{ scale: 1.02 }}
							className="break-inside-avoid"
						>
							<Card className="bg-white shadow-lg rounded-2xl border border-gray-200/80 transform hover:-translate-y-1.5 transition-all duration-300">
								<CardContent className="p-6 relative">
									<Quote className="absolute top-6 right-6 w-16 h-16 text-gray-100" />
									<div className="flex items-center gap-4 mb-4 relative z-10">
										<Avatar>
											<AvatarFallback className="bg-[#732b1d] text-white font-semibold">
												{getInitials(t.name)}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-semibold text-gray-900">{t.name}</p>
											<p className="text-sm text-gray-500">{t.role}</p>
										</div>
									</div>
									<div className="flex items-center gap-0.5 mb-4">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`h-5 w-5 ${
													i < Math.round(t.rating)
														? "text-yellow-400 fill-yellow-400"
														: "text-gray-300 fill-gray-200"
												}`}
											/>
										))}
									</div>
									<p className="text-gray-700 italic leading-relaxed relative z-10">
										"{t.review}"
									</p>
									<p className="text-right text-sm text-gray-500 mt-4">
										- via {t.source}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.div>
	);
}
