"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { tr } from "date-fns/locale";

const locations = [
	{
		name: "Erandwane Studio",
		address:
			"Joshi Rd, Plot 4/8, SriKrupa Bungalow, Diagonal opposite Lagu Bandhu Jewellers, Shankarrao Kirloskar Marg, off Karve Road, Erandwane, Pune, Maharashtra 411004",
		hours: "09:00 AM - 07:00 PM",
		mapSrc: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.4767871446684!2d73.8295828!3d18.5073442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf8aff60d68d%3A0x2c324d55713b6d86!2sClay7Studio!5e0!3m2!1sen!2sin`,
	},
];

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isSubmitting) return;

		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// In a real application, you would send the data to your API endpoint here.
		console.log("Contact form submitted:", formData);

		setIsSubmitting(false);
		toast.success("Message Sent!", {
			description: "Thank you for your message. We will get back to you soon.",
			duration: 5000,
		});

		// Reset form
		setFormData({ name: "", email: "", phone: "", message: "" });
	};

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
    transition: { duration: 0.6 },
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="min-h-screen bg-gray-50"
		>
			<Toaster richColors />
			<div className="container mx-auto px-4 py-16 sm:py-24">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="max-w-3xl mx-auto text-center mb-16"
				>
					<h1 className="text-4xl md:text-5xl font-bold text-[#732b1d] mb-4 tracking-tight">
						Get In Touch
					</h1>
					<p className="text-lg text-gray-600 leading-relaxed">
						Having questions, want to register for a class, or plan a private workshop? We'd love to hear from
						you!
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto"
				>
					{/* Contact Form */}
					<motion.div variants={item} className="lg:col-span-3">
						<Card className="shadow-xs border-gray-200/80 h-fit">
							<CardHeader>
								<CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
								<CardDescription>We'll get back to you within 24 hours.</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid sm:grid-cols-2 gap-6">
										<div className="space-y-2">
											<Label htmlFor="name" className="font-semibold">
												Name
											</Label>
											<Input
												id="name"
												placeholder="Your name"
												required
												value={formData.name}
												onChange={handleInputChange}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email" className="font-semibold">
												Email
											</Label>
											<Input
												id="email"
												type="email"
												placeholder="you@example.com"
												required
												value={formData.email}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="phone" className="font-semibold">
											Phone
										</Label>
										<Input
											id="phone"
											placeholder="+91-XXXXXXXXXX"
											value={formData.phone}
											onChange={handleInputChange}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="message" className="font-semibold">
											Message
										</Label>
										<Textarea
											id="message"
											placeholder="How can we help you?"
											rows={5}
											required
											value={formData.message}
											onChange={handleInputChange}
										/>
									</div>
									<Button
										type="submit"
										disabled={isSubmitting}
										className="bg-[#732b1d] hover:bg-[#652619] text-white w-full py-3 text-base"
									>
										{isSubmitting ? "Sending..." : "Send Message"}
									</Button>
								</form>
							</CardContent>
						</Card>
					</motion.div>

					{/* Studio Locations & Contact Info */}
					<motion.div variants={item} className="lg:col-span-2 space-y-8">
						{locations.map((location) => (
							<motion.div key={location.name} variants={item}>
								<Card className="flex flex-col gap-0 py-0 pt-5 shadow-lg border-gray-200/80 overflow-hidden">
									<CardHeader>
										<CardTitle className="text-xl text-[#732b1d]">{location.name}</CardTitle>
									</CardHeader>
									<CardContent className="space-y-3 text-sm">
										<div className="flex items-start gap-3">
											<MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
											<p className="text-gray-600">{location.address}</p>
										</div>
										<div className="flex items-center gap-3">
											<Clock className="w-4 h-4 text-gray-500" />
											<p className="text-gray-600">{location.hours}</p>
										</div>
									</CardContent>
									{location.mapSrc && (
										<div className="w-full h-[40vh] mt-4">
											<iframe
												src={location.mapSrc}
												width="100%"
												height="100%"
												style={{ border: 0 }}
												allowFullScreen={false}
												loading="lazy"
												referrerPolicy="no-referrer-when-downgrade"
											></iframe>
										</div>
									)}
								</Card>
							</motion.div>
						))}

						<motion.div variants={item}>
							<Card className="shadow-xs border-gray-200/80">
								<CardHeader>
									<CardTitle className="text-2xl text-gray-900">Contact Information</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<a
										href="tel:+919822033807"
										className="flex items-center gap-4 text-gray-700 hover:text-[#732b1d]"
									>
										<Phone className="w-5 h-5 text-[#732b1d]" />
										<span>+91-9822033807</span>
									</a>
									<a
										href="mailto:clay7studio@gmail.com"
										className="flex items-center gap-4 text-gray-700 hover:text-[#732b1d]"
									>
										<Mail className="w-5 h-5 text-[#732b1d]" />
										<span>clay7studio@gmail.com</span>
									</a>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</motion.div>
	);
}
