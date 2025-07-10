// src/app/gallery/page.tsx

"use client";

import { useState } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";
import potteryClass1 from "@/images/pottery-class-1.jpg";
import potteryClass2 from "@/images/pottery-class-2.jpg";
import wheelThrowingImage from "@/images/wheel-throwing.jpg";
import handBuildingImage from "@/images/hand-building.jpg";
import industrialImage from "@/images/industrial-pottery.jpg";
import erandwaneStudioImage from "@/images/erandwane-studio.jpg";
import rashmiVaidyaTeachingImage from "@/images/rashmi-vaidya-teaching.jpg";

const images = [
  { src: potteryClass1, alt: "Pottery Class 1" },
  { src: potteryClass2, alt: "Pottery Class 2" },
  { src: wheelThrowingImage, alt: "Wheel Throwing" },
  { src: handBuildingImage, alt: "Hand Building" },
  { src: industrialImage, alt: "Industrial Pottery" },
  { src: erandwaneStudioImage, alt: "Studio - Erandwane" },
  { src: rashmiVaidyaTeachingImage, alt: "Rashmi Vaidya Teaching" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
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
            Our Studio Gallery
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore moments from our classes, workshops, and the beautiful
            creations of our students. Get a glimpse of the creativity, calm, and
            community at Clay7studio.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 md:px-20"
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              variants={item}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(img.src)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="object-cover w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center transform-gpu translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                  <ZoomIn className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-semibold tracking-wide">{img.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] flex items-center justify-center w-full mx-auto my-auto p-0 bg-transparent border-none shadow-none">
          <DialogClose className="absolute top-0 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-md p-2 transition-colors duration-200">
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </DialogClose>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={selectedImage}
                alt="Enlarged"
                width={1200}
                height={800}
                className="w-fit h-full object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
