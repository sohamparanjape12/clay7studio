// src/app/faq/page.tsx

"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const faqs = [
	{
		value: "q1",
		question: "Do I need any prior experience to join a class?",
		answer: "Not at all! Our beginner-friendly classes, like Wheel Throwing Basics and the Hand Building Workshop, are designed for absolute beginners. Our founder, Rashmi Vaidya, and her team will guide you at every step.",
	},
	{
		value: "q2",
		question: "What materials do I need to bring?",
		answer: "Just bring yourself and a willingness to get your hands dirty! We provide all the necessary tools, high-quality clay, aprons, and glazes. The cost of materials and firing for your creations is included in the class fee.",
	},
	{
		value: "q3",
		question: "What should I wear to a pottery class?",
		answer: "We recommend wearing comfortable clothes that you don't mind getting a little messy. While we provide aprons, clay can sometimes find its way onto your clothes. It's also a good idea to trim your fingernails for a better experience on the pottery wheel.",
	},
	{
		value: "q4",
		question: "What happens to the pottery I make?",
		answer: "You get to keep your creations! After you've made your piece, it needs to dry and then be fired in our kiln, which can take a couple of weeks. We'll notify you when your masterpiece is ready for pickup.",
	},
	{
		value: "q5",
		question: "Are the classes suitable for kids?",
		answer: "Yes! We love introducing children to the world of pottery. We have special weekend sessions and birthday party workshops designed for children aged 6 and above. It's a fun, creative, and educational experience.",
	},
	{
		value: "q6",
		question: "Can I book a private group session or a corporate event?",
		answer: "Absolutely. We host private workshops for families, friends, and corporate team-building events. These are great for birthdays, anniversaries, or just a fun day out. Please visit our Events page or contact us to make an inquiry.",
	},
	{
		value: "q7",
		question: "What is your cancellation policy?",
		answer: "We understand that plans can change. We request a 48-hour notice for any cancellations or rescheduling. Please contact us directly to discuss your options. For group events, specific cancellation policies will be discussed during booking.",
	},
];

export default function FAQPage() {
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
						Frequently Asked Questions
					</h1>
					<p className="text-lg text-gray-600 leading-relaxed">
						Everything you need to know before you start your pottery journey
						with us.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="max-w-3xl mx-auto"
				>
					<Accordion type="single" collapsible className="w-full space-y-4">
						{faqs.map((faq) => (
							<motion.div key={faq.value} variants={item}>
								<AccordionItem
									value={faq.value}
									className="transition-shadow"
								>
									<AccordionTrigger className="px-2 flex items-center justify-between text-left text-lg font-semibold text-gray-800 hover:no-underline">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="px-6 pb-6 text-gray-600 text-base leading-relaxed">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							</motion.div>
						))}
					</Accordion>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
					className="max-w-3xl mx-auto mt-20 text-center bg-white p-10 rounded-lg border border-gray-200/80 shadow-sm"
				>
					<HelpCircle className="w-12 h-12 mx-auto mb-4 text-[#732b1d]" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Still Have Questions?
					</h2>
					<p className="text-gray-600 mb-6">
						If you can't find the answer you're looking for, please don't
						hesitate to get in touch with us.
					</p>
					<Button
						asChild
						size="lg"
						className="bg-[#732b1d] hover:bg-[#652619] text-white"
					>
						<Link href="/contact">
							<Mail className="mr-2 h-4 w-4" />
							Contact Us
						</Link>
					</Button>
				</motion.div>
			</div>
		</motion.div>
	);
}
